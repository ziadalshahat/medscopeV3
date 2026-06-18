import React, { useState, useEffect } from "react";

const ThemeToggle = ({ style, className }) => {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"));

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <button 
      onClick={toggleTheme} 
      className={`theme-toggle-btn ${className || ""}`}
      aria-label="Toggle Theme" 
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1.2rem',
        color: 'inherit',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px',
        marginRight: '10px',
        ...style
      }}
    >
      <i className={`fas ${isDark ? "fa-sun" : "fa-moon"}`}></i>
    </button>
  );
};

export default ThemeToggle;
