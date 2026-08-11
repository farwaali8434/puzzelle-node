const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("./model");

module.exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // check if email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // hash the password — never store it plain
    const password = await bcrypt.hash(password, 10);

    // save the user
    const newUser = await UserModel.create({
      firstName,
      lastName,
      email,
      password,
      authProvider: "email",
    });

    // generate JWT so the frontend gets an "auto-login" token immediately
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(201).json({
      id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModal.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.status(200).json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModal.findOne({ email });
    if (user) {
      let token = jwt.sign(
        { id: user?._id },
        process.env.FORGOT_PASSWORD_SECRET_KEY,
        { expiresIn: "20m" },
      );
      await sendEmail({
        to: email,
        templateId: 1,
        params: {
          name: user?.firstName,
          link: `http://localhost:3000/reset-password/${token}`,
        },
      });
    }
    return res.status(200).json({
      message: "If that email exists, a reset link has been sent",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const decoded = jwt.verify(token, process.env.FORGOT_PASSWORD_SECRET_KEY);
    const user = await UserModal.findById(decoded?.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      let password = await bcrypt.hash(newPassword, 10);
      user.password = password;
      await user.save();
      return res.status(200).json({ message: "Password reset successfully" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports.getUser = async (req, res) => {
  try {
    const userid = req.userId;
    const user = await UserModel.findById(userid).select(
      "email firstName lastName",
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      return res.status(200).json({ user });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
module.exports.updateUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(req.userId, req.body, {
      new: true, timestamps: true
    }).select("email firstName lastName");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      return res.status(200).json({ user });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports.changePassword = async (req, res) =>{
    try{
        const {oldPassword, newPassword} = req.body;
        const user = await UserModel.findById(req.userId);

        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        let verifyOldPassword = await bcrypt.compare(oldPassword, user.password)
        if(!verifyOldPassword){
            return res.status(400).json({message: "Old password is incorrect"});
        }
        let newPasswordHash = await bcrypt.hash(newPassword, 10);
        user.password = newPasswordHash;
        await user.save();
        return res.status(200).json({message: "Password changed successfully"});


    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({message: "Something went wrong"})
    }
}
