import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
  try {
    let token = req.cookies.jwt;

    if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    const clearAuthCookie = () => {
      const isProduction = process.env.NODE_ENV === "production";
      res.cookie("jwt", "", {
        maxAge: 0,
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
      });
    };

    if (!token) {
      clearAuthCookie();
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      clearAuthCookie();
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      clearAuthCookie();
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Auth middleware error -->", error.message);
    return res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};