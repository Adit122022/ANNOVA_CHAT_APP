import cloudinary from "../lib/Cloudinary.js";
import { getReceiverSocketsId, io } from "../lib/Socket.js";
import Messages from "../models/messagesModel.js";
import User from "../models/userModel.js";

 export const getUsersForSideBar = async(req, res) => {
    try {
        const loggedInUser = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password ");   //$ne means not equal to
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Get users for sidebar error  -->", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
 }

 export const getmessage = async(req,res) =>{
     
    try {
        const { id:userToChatID } = req.params;
      const myId = req.user._id;  //loggedInUser
      const message = await Messages.find({
        $or:[
            {senderId:myId , receiverId:userToChatID},
            {senderId:userToChatID , receiverId:myId}
        ]
      })
res.status(200).json(message)
        
    } catch (error) {
        console.log("Get message error  -->", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
 }

 export const sendMessage = async(req,res)=>{
     try {
        const { text , image } = req.body;
        const { id:receiverId } = req.params;  // userToChatID
        const senderId = req.user._id;  //loggedInUser
  let imageUrl ;
if(image){
    const uploadResponse = await cloudinary.uploader.upload(image)
    imageUrl = uploadResponse.secure_url;
}
     const newMessage = await Messages.create({
        senderId,
        receiverId,
        text,
        image:imageUrl
     })
      const receiverSocketId = getReceiverSocketsId(receiverId)

     if(receiverSocketId){
        io.to(receiverSocketId).emit("newMessage" , newMessage);
     }
// todo : send notification to the receiver of the message
res.status(200).json(newMessage)
    } catch (error) {
        console.log("Send message error  -->", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
 }