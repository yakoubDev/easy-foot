import pkg from "mongoose";
const { model, models, Schema } = pkg;
import bcrypt from "bcryptjs";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide your full name."],
  },
  email: {
    type: String,
    required: [true, "Please provide your email."],
    unique: true,
  },
  phone:{
    type: String,
    required: [true, "Please provide your phone number."],
  },
  password: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    enum: ["user", "admin", "owner"],
    default: "user",
  },

});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword: any) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = models.User || model("User", userSchema);

export default User;
