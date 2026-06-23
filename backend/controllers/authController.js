const signup = async (req, res) => {
  res.send("Signup Route");
};

const login = async (req, res) => {
  res.send("Login Route");
};

module.exports = {
  signup,
  login,
};