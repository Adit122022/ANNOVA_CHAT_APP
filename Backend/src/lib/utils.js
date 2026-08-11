import jwt from "jsonwebtoken";

export const generate_Token = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("jwt", token, {
    httpOnly: true,                              // always true — prevents XSS
    secure: isProduction,                        // true in prod (HTTPS), false in dev (HTTP)
    sameSite: isProduction ? "none" : "lax",    // none required for cross-origin in prod
    maxAge: 7 * 24 * 60 * 60 * 1000,            // 7 days
  });

  return token;
};
