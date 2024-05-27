// controllers/UserController.js
const User = require("../models/User");
const Post = require("../models/Post");

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 }); // Exclude password field

        // Get post counts for each user
        const usersWithPostCounts = await Promise.all(
            users.map(async (user) => {
                const postCount = await Post.countDocuments({ author: user._id });
                return { ...user._doc, postCount };
            })
        );

        res.json(usersWithPostCounts);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
