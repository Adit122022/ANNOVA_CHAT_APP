import cloudinary from "../lib/Cloudinary.js";
import { generate_Token } from "../lib/utils.js";
import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';



const generate_HashPassword = async(password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const signup = async (req, res) => {
  const { fullname, email, password } = req.body;
//   console.log(req.body);

  try {
    if (!fullname || !email || !password)
      return res.status(400).json({ message: "All fields are required" });
    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    // user exist or not
    const userExist =await User.findOne({ email });
    if (userExist)
      return res.status(400).json({ message: "User already exist" });
    //  if user not exist create user
    const hashedPassword = await generate_HashPassword(password);
    const user = new User({
      fullname,
      email,
      password: hashedPassword,
    });
   
    if(user) {
        await user.save();
        generate_Token(user._id ,res);  //this funtion is in utils.js
           res.status(200).json({_id:user._id,
               fullname:user.fullname,
               email:user.email,
               profilePic:user.profilePic,
           });
    }else{
           res.status(400).json({message:"User not created"})
    }
  } catch (error) {
    console.log("Signup error  -->"  , error.message )
  }
};

export const login =async (req, res) => {
     const { email , password} = req.body;
    try {
        if (!email || !password)
            return res.status(400).json({ message: "All fields are required" });
          if (password.length < 6)
            return res
              .status(400)
              .json({ message: "Password must be at least 6 characters" });

               const user = await User.findOne({ email });
               if (!user) {
                return res.status(400).json({ message: "Invalid credentials" });
               }
             const isPasswordCorrect =  await bcrypt.compare(password, user.password)

                if (!isPasswordCorrect) {
                    return res.status(400).json({ message: "Invalid credentials" });
                }
                generate_Token(user._id ,res);  //this funtion is in utils.js
                res.status(200).json({
                    _id:user._id,
                    fullname:user.fullname,
                    email:user.email,
                    profilePic:user.profilePic,
                });

      
    } catch (error) {
        console.log("Login error  -->"  , error.message )
        res.status(500).json({ message: "Internal server error" });
        
    }
};
export const logout = (req, res) => {
try{
    res.cookie("jwt", "", {
        maxAge: 0,
      });
      res.status(200).json({ message: "Logout successful" });
}catch (error) {
    console.log("Logout error  -->"  , error.message )
    res.status(500).json({ message: "Internal server error" });
}
};


 export const updateProfile = async (req, res) => {
     const{profilePic} = req.body;
    //  console.log(req.body)
    try { 
          
         const userID = req.user._id ;
         if(!profilePic){
            return res.status(400).json({message:"Please provide a profile picture"})
         }
        const uploadResponse =  await cloudinary.uploader.upload(profilePic)
        const UpdatedUser = await User.findByIdAndUpdate(userID, {
          profilePic: uploadResponse.secure_url,
        }, { new: true });
        //  console.log(UpdatedUser.profilePic)
         res.status(200).json({
            _id: UpdatedUser._id,
            fullname: UpdatedUser.fullname,
            email: UpdatedUser.email,
            profilePic: UpdatedUser.profilePic,})
    } catch (error) {
        console.log("Update profile error  -->"  , error.message )
        res.status(500).json({ message: "Internal server error" });
        
    }

 }

 export const checkAuth = async(req,res) =>{
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("Check auth error  -->"  , error.message )
        res.status(500).json({ message: "Internal server error" });
        
    }
 }