const { validationResult } = require("express-validator");
const UserService = require("../services/services"); // adjust path as needed
const usermodel = require("../models/user.models"); // adjust path as needed

module.exports.registerUser = async (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
console.log(req.body)
  const { fullname, email, password } = req.body;

  try {
    // Hash the password before saving
    const hashedPassword = await usermodel.prototype.hashPass(password);

    // Create the user using service
    const user = await UserService.createuser({
      firstname: fullname.firstname,
      lastname : fullname.lastname,
      email : email,
      password: hashedPassword,
    });
    console.log(user)

    const token = user.generateAuthToken();

    res.status(200).json({ token, user });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Server Error" });
  }
};
