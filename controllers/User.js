const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Create a new user
const createUser = async (req, res, next) => {
  try {
    const { name, email, password, phone, address,role } = req.body;

    // Check if all required fields are provided
    if (!(name && email && password && phone)) {
      return res.status(400).json({ error: "All fields are mandatory" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({ error: "User already exists" });
    }

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      role
    });

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.Salt,
      {
        expiresIn: "2h",
      }
    );

    // Assign token to user and hide password field'
    console.log("token---> ", token)
    user.token = token;
    user.password = undefined;

    // Return the created user with the token
    res.status(201).json({user:user,token:token});
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: "Email already in use" });
    } else {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

// User login
const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if all required fields are provided
    if (!(email && password)) {
      return res.status(400).json({ error: "All fields are mandatory" });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    // If user doesn't exist
    if (!user) {
      return res.status(400).json({ error: "Invalid Email or Password" });
    }

    // Check if password matches
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid Email or Password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.Salt,
      {
        expiresIn: "2h",
      }
    );

    // Send the token in a cookie
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
      httpOnly: true,
    };
    res.cookie("token", token, options);
    // Assign token to user and hide password field
    user.token = token;
    user.password = undefined;
    res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get all users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//delete user by id
const deleteUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createUser,
  userLogin,
  getAllUsers,
  deleteUserById
};
