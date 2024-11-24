import { useEffect } from "react";
import styles from "../styles/FloatingImages.module.css";

// Frog images
const images = [
  "https://efrogs.eth.limo/frogs/1.png",
  "https://efrogs.eth.limo/frogs/2.png",
  "https://efrogs.eth.limo/frogs/3.png",
  "https://efrogs.eth.limo/frogs/4.png",
  "https://efrogs.eth.limo/frogs/5.png",
  "https://efrogs.eth.limo/frogs/6.png",
  "https://efrogs.eth.limo/frogs/7.png",
  "https://efrogs.eth.limo/frogs/8.png",
  "https://efrogs.eth.limo/frogs/9.png",
  "https://efrogs.eth.limo/frogs/10.png",
  "https://efrogs.eth.limo/frogs/11.png",
  "https://efrogs.eth.limo/frogs/12.png",
  "https://efrogs.eth.limo/frogs/13.png",
  "https://efrogs.eth.limo/frogs/14.png",
  "https://efrogs.eth.limo/frogs/15.png",
  "https://efrogs.eth.limo/frogs/16.png",
  "https://efrogs.eth.limo/frogs/17.png",
  "https://efrogs.eth.limo/frogs/18.png",
  "https://efrogs.eth.limo/frogs/19.png",
  "https://efrogs.eth.limo/frogs/20.png" 
];

export default function FloatingImages() {
  useEffect(() => {
    const floatingImages = document.querySelectorAll(`.${styles.floatingImage}`);

    floatingImages.forEach((image) => {
      // Random initial position
      const randomX = Math.floor(Math.random() * window.innerWidth);
      const randomY = Math.floor(Math.random() * window.innerHeight);
      image.style.left = `${randomX}px`;
      image.style.top = `${randomY}px`;

      // Random animation duration and delay
      const randomDuration = Math.floor(Math.random() * 15) + 5; // 5-20 seconds
      const randomDelay = Math.random() * 5; // 0-5 seconds
      image.style.animationDuration = `${randomDuration}s`;
      image.style.animationDelay = `${randomDelay}s`;
    });
  }, []);

  return (
    <div className={styles.backgroundContainer}>
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Floating image ${index + 1}`}
          className={styles.floatingImage}
        />
      ))}
    </div>
  );
}
