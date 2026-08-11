import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL_SOCKET = import.meta.env.VITE_SOCKET_URL;

// Safe error message extractor — won't crash when error.response is undefined (CORS / network errors)
const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || "Something went wrong";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check");
      set({ authUser: response.data });
      get().connectSocket();
    } catch (error) {
      // checkAuth failing is normal (user not logged in) — don't toast
      console.log("useAuthStore (checkAuth) -->", getErrorMessage(error));
      localStorage.removeItem("token");
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      set({ authUser: res.data });
      get().connectSocket();
      toast.success("Account created successfully");
    } catch (error) {
      console.log("useAuthStore (signup) -->", getErrorMessage(error));
      toast.error(getErrorMessage(error));
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      localStorage.removeItem("token");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().DisconnectSocket();
    } catch (error) {
      console.log("useAuthStore (logout) -->", getErrorMessage(error));
      toast.error(getErrorMessage(error));
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      set({ authUser: res.data });
      toast.success("Login successfully");
      get().connectSocket();
    } catch (error) {
      console.log("useAuthStore (login) -->", getErrorMessage(error));
      toast.error(getErrorMessage(error));
    } finally {
      set({ isLoggingIn: false });
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.log("useAuthStore (updateProfile) -->", getErrorMessage(error));
      toast.error(getErrorMessage(error));
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: async () => {
    const { authUser, socket } = get();
    if (!authUser || (socket && socket.connected)) return;
    const newSocket = io(BASE_URL_SOCKET, {
      query: { userId: authUser._id },
    });
    set({ socket: newSocket });
    newSocket.on("getOnlineUsers", (ids) => {
      set({ onlineUsers: ids });
    });
  },

  DisconnectSocket: async () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
