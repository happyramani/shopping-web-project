const port = 4000; // Define the port number for the server
const express = require('express'); // Import Express.js
const app = express(); // Initialize the Express application
const mongoose = require('mongoose'); // Import Mongoose for MongoDB interactions
const jwt = require('jsonwebtoken'); // Import JSON Web Token for authentication
const multer = require('multer'); // Import Multer for file uploads
const path = require('path'); // Import Path module for handling file paths
const cors = require('cors'); // Import CORS for handling cross-origin requests
require('dotenv').config(); // Load environment variables from a .env file

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cors()); // Enable CORS

// Connect to MongoDB using Mongoose
mongoose.connect("mongodb://kinghapppy1:123Abcxy@ac-uyysoel-shard-00-00.ueo8uxk.mongodb.net:27017,ac-uyysoel-shard-00-01.ueo8uxk.mongodb.net:27017,ac-uyysoel-shard-00-02.ueo8uxk.mongodb.net:27017/inLancer?ssl=true&replicaSet=atlas-knjx2n-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0");

// Root route to confirm server is running
app.get("/", (req, res) => {
    res.send("Express app is running");
});

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: "./upload/images", // Destination directory for uploaded files
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`); // Rename the file to include the field name and current timestamp
    }
});

const upload = multer({ storage: storage }); // Initialize Multer with the specified storage configuration

app.use('/images', express.static('upload/images')); // Serve static files from the 'upload/images' directory

// Endpoint to handle file uploads
app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://192.168.0.57:${port}/images/${req.file.filename}`
    });
});

// Define the Product schema and model using Mongoose
const Product = mongoose.model('Product', {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    new_price: { type: Number, required: true },
    old_price: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    available: { type: Boolean, default: true },
});

// Define the User schema and model using Mongoose
const User = mongoose.model('User', {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    cartData: { type: Object },
    date: { type: Date, default: Date.now },
});

// Endpoint to handle user sign-up
app.post('/signup', async (req, res) => {
    let check = await User.findOne({ email: req.body.email }); // Check if a user with the same email already exists
    if (check) {
        return res.status(400).json({
            success: false,
            error: "Existing user found with same email"
        });
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        cartData: req.body.cart
    });

    await user.save(); // Save the new user to the database
    const data = { user: { id: user.id } };
    const token = jwt.sign(data, "secret_ecom"); // Generate a JWT token
    res.json({ success: true, token });
});

// Endpoint to handle user login
app.post('/login', async (req, res) => {
    let user = await User.findOne({ email: req.body.email }); // Find the user by email
    if (user) {
        const passMatch = req.body.password === user.password; // Check if the password matches
        if (passMatch) {
            const data = { user: { id: user.id } };
            const token = jwt.sign(data, "secret_ecom"); // Generate a JWT token
            res.json({ success: true, token });
        } else {
            res.json({ success: false, error: "Wrong Password" });
        }
    } else {
        res.json({ success: false, error: "Wrong Email Address" });
    }
});

// Endpoint to add a new product
app.post('/addproduct', async (req, res) => {
    let products = await Product.find({}); // Get all products
    let id;
    if (products.length > 0) {
        let last_product = products[products.length - 1]; // Get the last product
        id = last_product.id + 1; // Increment the ID
    } else {
        id = 1; // If no products, start with ID 1
    }

    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });

    console.log(product);
    await product.save(); // Save the new product to the database
    console.log("Save");
    res.json({
        success: true,
        name: req.body.name,
    });
});

// Endpoint to remove a product
app.post('/removeproduct', async (req, res) => {
    const { id } = req.body;
    await Product.findOneAndDelete({ id: id }); // Find and delete the product by ID
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name
    });
});

// Endpoint to get all products with pagination
app.get("/allproducts", async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the page number from the query string, default to 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Get the limit from the query string, default to 10 if not provided
    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    try {
        const products = await Product.find().skip(skip).limit(limit); // Fetch products with pagination
        const total = await Product.countDocuments(); // Get the total number of products
        console.log("All Products Fetched");
        res.json({
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            products
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Endpoint to get the new collection (latest 8 products)
app.get('/newcollection', async (req, res) => {
    let products = await Product.find({});
    let newcollection = products.slice(-8); // Get the last 8 products
    console.log("Newcollection Fetched");
    res.send(newcollection);
});

// Endpoint to get popular products (first 4 products in the 'clothing' category)
app.get('/popularproducts', async (req, res) => {
    let products = await Product.find({ category: 'clothing' });
    let popularproducts = products.slice(0, 4); // Get the first 4 products
    console.log("Popular product Fetched");
    res.send(popularproducts);
});

// Function to get data with pagination (this is a placeholder and can be replaced with actual logic)
const getData = async (skip, limit) => {
    // Replace with your actual data fetching logic
    const data = await Product.find().skip(skip).limit(limit); // Fetch data from the database with skip and limit
    return data;
};

// Start the server and listen on the specified port and IP address
app.listen(port, "192.168.0.57", (error) => {
    if (!error) {
        console.log("Server listening on port " + port);
    } else {
        console.log("Error: " + error);
    }
});
