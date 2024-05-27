// server.js
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const adminRoutes = require("./routes/admin");
const { authorizeRoles, authenticateToken } = require("./middleware/auth");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);

app.use("/api/auth", authRoutes);
app.use("/api/post", authenticateToken, authorizeRoles(["user"]), postRoutes);
app.use("/api/users", authenticateToken, authorizeRoles(["admin"]), adminRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
