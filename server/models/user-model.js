const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Each user must have a name"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is a required field"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      trim: true,
      minLength: [3, "Password must be at least 3 characters long"],
      required: [true, "Password is a required field"],
      // select: false,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

// Create a document middleware to encrypt the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();

    // Return early
    return;
  }

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return callback(err);
      callback(null, isMatch);
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;


