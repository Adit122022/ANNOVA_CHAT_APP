import {create} from 'zustand'
import {axiosInstance} from '../lib/axios.js'
import toast from 'react-hot-toast';
import {io} from 'socket.io-client'

const BASE_URL_SOCKET ="http://localhost:5000"
export const useAuthStore = create((set ,get)=>({
authUser:null,
isSigningUp:false,
isLoggingIn:false,
isUpdatingProfile:false,
isCheckingAuth:true,
onlineUsers:[],
socket :null,

checkAuth:async()=>{
    try {
        const response = await axiosInstance.get("/auth/check");
        set({authUser:response.data})
        get().connectSocket();
    } catch (error) {
        console.log("useAuthStore (checkAuth)  ---> ", error.response.data.message)
        set({ authUser: null }); 
    }finally{
        set({ isCheckingAuth:false});

    }
},

signup:async(data)=>{
set({isSigningUp:true});

    try {
     const res=   await  axiosInstance.post("/auth/signup" , data)
     set({ authUser: res.data });
     get().connectSocket();
     toast.success("Account created successfully")
        
      } catch (error) {
        //  console.log("useAuthStore (signup)  ---> ", error.response.data.message)
         toast.error(error.response.data.message)
        }finally{
        set({isSigningUp: false})
      }
},

logout :async()=>{
try {
   const res = await axiosInstance.post('/auth/logout')
   set({authUser :null});
   toast.success("Logged out successfully");
   get().DisconnectSocket();
} catch (error) {
    // console.log("useAuthStore (logout)  ---> ", error.response.data.message)
    toast.error(error.response.data.message); 
}
},

login:async(data)=>{
    set({isLoggingIn:true});

    try {
     const res= await  axiosInstance.post("/auth/login" , data)
     set({ authUser: res.data });
     toast.success("Login successfully")
    get().connectSocket();
        
      } catch (error) {
        //  console.log("useAuthStore (signup)  ---> ", error.response.data.message)
         toast.error(error.response.data.message)

        }finally{
        set({isLoggingIn: false})
      }
},
updateProfile: async(data)=>{
    set({isUpdatingProfile :true})
    try {
        const res= await axiosInstance.put("/auth/update-profile" , data)
        set({authUser : res.data})
         toast.success("Profile updated successfully !")
    } catch (error) {
         //  console.log("useAuthStore (Update - profile)  ---> ", error.response.data.message)
         toast.error(error.response.data.message)  
    }finally{
        set({isUpdatingProfile: false})
    }
},

connectSocket :async()=>{
    const {authUser ,socket } = get()
    if(!authUser || (socket && socket.connected) ) return;
    const Newsocket = io(BASE_URL_SOCKET ,{
        query:{
            userId :authUser._id,
        },
    })
    set({ socket: Newsocket });
    Newsocket.on("getOnlineUsers", (id) =>{
        // console.log("📡 Online Users:", id);
        set({onlineUsers :id})
    })
   
},
DisconnectSocket :async()=>{
if(get().socket?.connected) get().socket.disconnect();
}

}))