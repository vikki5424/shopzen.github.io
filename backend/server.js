// server.js

import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import jwt from 'jsonwebtoken';

// --- 2. INITIALIZATION ---
const app = express();
const PORT = process.env.PORT || 5000;

// --- 3. MIDDLEWARE ---
app.use(cors()); 
app.use(express.json()); 


const MONGO_URI = "mongodb+srv://vishal001:vishal001@vishal001.wpxk5dv.mongodb.net/ecommerce"; 

const JWT_SECRET = 'vis-0007-jams-ra'; 
console.log('Using JWT Secret:', JWT_SECRET);

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Successfully connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// --- 5. MONGOOSE SCHEMAS & MODELS ---

// Defines the structure for items within the user's cart
const cartItemSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  cart: [cartItemSchema] // Embed the cart directly in the user document
});

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [cartItemSchema],
    total: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Order = mongoose.model('Order', orderSchema);
const CartItem = mongoose.model('CartItem', cartItemSchema);

// --- 6. AUTHENTICATION MIDDLEWARE ---

// This function verifies the JWT token sent by the client.
const authMiddleware = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied.' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user; // Add the user payload (e.g., { id: '...' }) to the request object
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid.' });
    }
};

// --- 7. API ROUTES ---

// --- AUTH ROUTES ---
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Please provide all required fields.' });

    let user = await User.findOne({ email });
    if (user) return res.status(409).json({ message: 'An account with this email already exists.' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashedPassword });
    await user.save();
    
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '3h' });

    res.status(201).json({ token, user: { uid: user.id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: 'Please provide email and password.' });

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials.' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials.' });

        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '3h' });

        res.json({ token, user: { uid: user.id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
});


// --- CART ROUTES (Protected by authMiddleware) ---
app.get('/api/cart', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user.cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
});

app.post('/api/cart/add', authMiddleware, async (req, res) => {
    try {
        const productToAdd = req.body.product;
        const user = await User.findById(req.user.id);
        
        const itemIndex = user.cart.findIndex(item => item.id === productToAdd.id);

        if (itemIndex > -1) {
            // Item exists, update quantity
            user.cart[itemIndex].quantity += 1;
        } else {
            // Item does not exist, add to cart
            user.cart.push({ ...productToAdd, quantity: 1 });
        }
        await user.save();
        res.json(user.cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
});

app.post('/api/cart/update', authMiddleware, async (req, res) => {
    try {
        const { productId, newQuantity } = req.body;
        const user = await User.findById(req.user.id);
        const itemIndex = user.cart.findIndex(item => item.id === productId);

        if (itemIndex > -1) {
            user.cart[itemIndex].quantity = newQuantity;
            await user.save();
            res.json(user.cart);
        } else {
            res.status(404).json({ message: 'Item not found in cart.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
});

app.post('/api/cart/remove', authMiddleware, async (req, res) => {
    try {
        const { productId } = req.body;
        const user = await User.findById(req.user.id);
        user.cart = user.cart.filter(item => item.id !== productId);
        await user.save();
        res.json(user.cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
});

// --- ORDER ROUTES (Protected by authMiddleware) ---
app.post('/api/orders', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (user.cart.length === 0) {
            return res.status(400).json({ message: 'Cart is empty.' });
        }

        const total = user.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

        const order = new Order({
            userId: user.id,
            items: user.cart,
            total: total
        });
        await order.save();

        // Clear the user's cart
        user.cart = [];
        await user.save();

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
});

app.get('/api/orders', authMiddleware, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id }).sort({ orderDate: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
