"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const Slider = ({ value, setValue }) => {
  const [isDown, setIsDown] = useState(false);
  const dotRef = useRef();

  function handleMouseMove(e) {
    if (!isDown) return;
    const rect = dotRef.current.parentElement.getBoundingClientRect();
    const newValue = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    setValue(newValue);
  }

  useEffect(() => {
    function handleMouseUp() {
      setIsDown(false);
    }

    if (isDown) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDown, handleMouseMove]);

  useEffect(() => {
    gsap.to(dotRef.current, {
      left: `${value}px`,
      duration: 0.2,
      ease: "power3.out",
    });
  }, [value]);

  return (
    <div className="relative w-full h-2 bg-gray-300 rounded-xl flex justify-center items-center">
      <div
        ref={dotRef}
        onMouseDown={() => setIsDown(true)}
        className="dot absolute rounded-full w-5 aspect-square -translate-x-1/2 bg-gray-500 cursor-pointer"
      ></div>
    </div>
  );
};

export default Slider;
