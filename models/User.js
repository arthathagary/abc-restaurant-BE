const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name!"],
    trim: true,
    maxlength: [100, "Name cannot exceed 100 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email!"],
    unique: true,
    trim: true,
    maxlength: [100, "Email cannot exceed 100 characters"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password!"],
    trim: true,
  },
  role: {
    type: String,
    enum: ["admin", "staff", "customer"],
    default: "customer",
    required: [true, "Please specify the role!"],
  },
  phone: {
    type: String,
    required: [true, "Please enter your phone number!"],
    trim: true,
  },
  address: {
    type: String,
    trim: true,
    maxlength: [200, "Address cannot exceed 200 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Add a pre-save hook to update the 'updatedAt' field before saving
userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
