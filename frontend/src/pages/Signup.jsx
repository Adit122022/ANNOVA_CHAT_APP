import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import { axiosInstance } from "../lib/axios";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();


  const validateForm = () => {
    if (!formData.fullname.trim()) return toast.error("Full name is required");
  
    if (!formData.email.trim()) return toast.error("Email is required");
  
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
  
    if (!formData.password) return toast.error("Password is required");
  
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");
  
    return true; // ✅ All checks passed
  };
  
  const handleSubmit = async(e) => {
    e.preventDefault();
  const success=  validateForm()
  if(success === true) signup(formData);

 
  };
  return <div className="min-h-screen grid lg:grid-cols-2">
  {/* left side */}
  <div className="flex flex-col justify-center items-center p-6 sm:p-12">
    <div className="w-full max-w-md space-y-8">
      {/* LOGO */}
      <div className="text-center mb-8">
        <div className="flex flex-col items-center gap-2 group">
          <div
            className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
          group-hover:bg-primary/20 transition-colors"
          >    
            <MessageSquare className="size-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mt-2">Create Account</h1>
          <p className="text-base-content/60">Get started with your free account</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Full Name</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="size-5 text-base-content/40" />
            </div>
            <input
              type="text"
              className={`input input-bordered w-full sm:w-full pl-10 pr-4 border border-gray-300 rounded-lg
             px-3 py-2 text-sm sm:text-base
             focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent`}
              placeholder="John Doe"
              value={formData.fullname}
              onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Email</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="size-5 text-base-content/40" />
            </div>
            <input
              type="email"
              className={`input input-bordered w-full sm:w-full pl-10 pr-4 border border-gray-300 rounded-lg
             px-3 py-2 text-sm sm:text-base
             focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent`}
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Password</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="size-5 text-base-content/40" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              className={`input input-bordered w-full sm:w-full pl-10 pr-4 border border-gray-300 rounded-lg
             px-3 py-2 text-sm sm:text-base
             focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent`}
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="size-5 text-base-content/40" />
              ) : (
                <Eye className="size-5 text-base-content/40" />
              )}
            </button>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
         
         
          {isSigningUp ? (
            <>
              <Loader2 className="size-5 animate-spin" />
              Loading...
            </>
          ) : (
            "Login Account"
          )}
        </button>
      </form>
      <div className="flex flex-col sm:flex-row gap-4 justify-between px-4 sm:px-12 my-2">
      <button className="btn  bg-white text-black border-[#e5e5e5]">
  <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Login with Google
</button>
<button className="btn  bg-black text-white border-black">
  <svg aria-label="GitHub logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="white" d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"></path></svg>
  Login with GitHub
</button>
      </div>
{/*  Already have an account? */}
      <div className="text-center">
        <p className="text-base-content/60">
          Already have an account?{" "}
          <Link to="/login" className="link link-primary">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  </div>

  {/* right side */}

  <AuthImagePattern
     title="WELCOME TO ANNOVA"
    subtitle="A vibrant chat app for seamless real-time messaging, connecting friends and groups with an intuitive, user-friendly interface. "
  />
</div>
};

export default Signup;
