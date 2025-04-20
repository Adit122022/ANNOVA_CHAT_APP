import jwt from "jsonwebtoken";

export const generate_Token = (id ,res) => {
  const token= jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
  res.cookie("jwt",token ,{
maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,  //prevents XSS attacks cross-site scripting 
    sameSite: "strict", //CSRF attacks cross-site request forgery
    secure: process.env.NODE_ENV !== "Development", //only send cookie over HTTPS  
  })
   return token;
};