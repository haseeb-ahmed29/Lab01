const express = require ("express")

const cors = require ("cors")
const dotenv = require ("dotenv")

const connectDb = require ("./config/db")


dotenv.config();

const app = express();

app.use(cors())
app.use(express.json());

app.use(express.urlencoded({extended:true}))

const authRoutes = require ("./routes/authRoutes")
const itemRoutes = require ("./routes/itemRoutes")

app.use("/api/auth", authRoutes)
app.use("/api/items", itemRoutes)

// Check route:
app.get("/", (req, res) => {
    res.send("API is running...")
});

// Basic error handling for middleware
app.use((err, req, res, next) => {
    console.error("Unhandled error", err.message);
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});