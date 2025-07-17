import { useState, useEffect } from "react";


const TitleAnimation = () => {
    const texts = [
      "We prepare students for successful careers in data science, analytics, and software.",
      "#1 STEM Organization at UCSB.",
    ];
    const [currentText, setCurrentText] = useState("");
    const [textIndex, setTextIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(100);
  
    useEffect(() => {
      const handleTyping = () => {
        const fullText = texts[textIndex];
        if (isDeleting) {
          setCurrentText((prev) => prev.slice(0, prev.length - 1));
          setTypingSpeed(50); // Faster speed for deleting
        } else {
          setCurrentText((prev) => fullText.slice(0, prev.length + 1));
          setTypingSpeed(100); // Slower speed for typing
        }
  
        if (!isDeleting && currentText === fullText) {
          setTimeout(() => setIsDeleting(true), 1000); // Pause before deleting
        } else if (isDeleting && currentText === "") {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length); // Move to next text
        }
      };
  
      const timer = setTimeout(handleTyping, typingSpeed);
      return () => clearTimeout(timer);
    }, [currentText, isDeleting, textIndex, typingSpeed]);
  
    return (
      <span>
        {currentText}
        <span className="blinking-cursor">|</span>
      </span>
    );
  };

export default TitleAnimation;