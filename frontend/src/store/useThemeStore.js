import {create} from 'zustand';

export const useThemeStore = create((set)=>({
    theme:localStorage.getItem("Chat_theme" ) || "coffee",
   setTheme:(theme)=>{
    localStorage.setItem("Chat_theme", theme);
    set({theme});
    },
}));