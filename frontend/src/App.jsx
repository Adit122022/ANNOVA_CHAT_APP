import React, { useEffect } from "react";
import AppRoutes from "./Routes/AppRoutes";
import Navbar from "./components/Navbar";
import ClickSpark from "./assets/REACT BITE/ClickSpark";
import { useThemeStore } from "./store/useThemeStore";

const App = () => {
  const { theme } = useThemeStore();

  return (
    <div data-theme={theme} className="w-screen h-screen">
      <ClickSpark
        sparkColor="#fff"
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <Navbar />
        <AppRoutes />
      </ClickSpark>
    </div>
  );
};

export default App;
