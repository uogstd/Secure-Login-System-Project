export const test = (req, res) => {
  res.json({ message: "Hello from Test API" });
};

export const signOut = (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("User have been signed out");
  } catch (error) {
    next(error);
  }
};
