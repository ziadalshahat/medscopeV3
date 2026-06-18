import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Chatbot() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  // اسمع لحدث الـ logout
  useEffect(() => {
    const handleLogout = () => {
      setIsLoggedIn(false);
      removeChatbot();
    };

    window.addEventListener("logout", handleLogout);
    return () => window.removeEventListener("logout", handleLogout);
  }, []);

  useEffect(() => {
    if (!isLoggedIn || location.pathname.includes("smart-assistant")) {
      removeChatbot();
      return;
    }

    if (window.chatbase) return;

    const script = document.createElement("script");
    script.innerHTML = `
      (function(){
        if(!window.chatbase||window.chatbase("getState")!=="initialized"){
          window.chatbase=(...arguments)=>{
            if(!window.chatbase.q){window.chatbase.q=[]}
            window.chatbase.q.push(arguments)
          };
          window.chatbase=new Proxy(window.chatbase,{
            get(target,prop){
              if(prop==="q"){return target.q}
              return(...args)=>target(prop,...args)
            }
          })
        }
        const onLoad=function(){
          const script=document.createElement("script");
          script.src="https://www.chatbase.co/embed.min.js";
          script.id="R6TLm3ER5j0XAJ46ll2wO";
          script.domain="www.chatbase.co";
          document.body.appendChild(script);
        };
        onLoad();
      })();
    `;
    document.body.appendChild(script);

  }, [location.pathname, isLoggedIn]);

  return null;
}

function removeChatbot() {
  const elements = document.querySelectorAll(
    "iframe, [id*='chatbase'], [class*='chatbase']"
  );
  elements.forEach(el => el.remove());
  delete window.chatbase;
}

export default Chatbot;