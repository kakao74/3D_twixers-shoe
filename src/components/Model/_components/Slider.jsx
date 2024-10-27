"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const Slider = ({ text, value, setValue }) => {
  const [isDown, setIsDown] = useState(false);
  const dotRef = useRef();

  const [pos, setPos] = useState(0);
  const intervalFactor = 4;

  useEffect(() => {
    const rect = dotRef.current.parentElement.getBoundingClientRect();
    setPos((rect.width * (intervalFactor * value + 1)) / 2);
  }, [dotRef]);

  function handleMouseMove(e) {
    if (!isDown) return;
    const rect = dotRef.current.parentElement.getBoundingClientRect();
    const newValue = Math.max(0, Math.min(rect.width, e.clientX - rect.left));

    setValue(((newValue * 2) / rect.width - 1) / intervalFactor);
    setPos(newValue);

    console.log("new val: ", newValue / rect.width);
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
      left: `${pos}px`,
      duration: 0.2,
      ease: "power3.out",
    });
  }, [pos]);

  return (
    <div className="w-full flex justify-between items-center">
      <span className="mr-2 text-base">{text}</span>
      <div className="relative flex-1  h-2 bg-gray-300 rounded-xl flex justify-center items-center">
        <div
          ref={dotRef}
          onMouseDown={() => setIsDown(true)}
          className="dot absolute rounded-full w-5 aspect-square -translate-x-1/2 bg-gray-500 cursor-pointer"
        ></div>
      </div>
    </div>
  );
};

export default Slider;
