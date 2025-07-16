export const generate_Token = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,               // ✅ must be true for cross-origin cookies
    sameSite: "None",           // ✅ allows cookie to be sent cross-origin
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });

  return token;
};
