import { useEffect } from "react";

export default function TelegramWidget({ post, color = "29B127", dark = "1", darkColor = "72E350" }) {
  useEffect(() => {
    // Create the script element
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.async = true;
    script.setAttribute("data-telegram-post", post);
    script.setAttribute("data-width", "100%");
    script.setAttribute("data-color", color);
    script.setAttribute("data-dark", dark);
    script.setAttribute("data-dark-color", darkColor);
    script.setAttribute("data-userpic", true);


    // Create a unique container for this widget
    const container = document.getElementById(`telegram-container-${post}`);
    if (container) {
      container.appendChild(script);
    }

    // Cleanup script on unmount
    return () => {
      if (container) {
        container.innerHTML = ""; // Clear container content
      }
    };
  }, [post, color, dark, darkColor]); // Re-run the effect if props change

  return <div id={`telegram-container-${post}`}></div>;
}
