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

  const getSliderLabel = (text) => {
    const labels = {
      xPos: "X Position",
      yPos: "Y Position", 
      xRot: "X Rotation",
      yRot: "Y Rotation",
      scal: "Scale"
    };
    return labels[text] || text;
  };

  return (
    <div className="w-full space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-xs font-medium text-white/80">{getSliderLabel(text)}</span>
        <span className="text-xs text-white/50 font-mono bg-white/5 px-1.5 py-0.5 rounded">
          {value.toFixed(3)}
        </span>
      </div>
      
      <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden">
        {/* Background track */}
        <div className="absolute inset-0 bg-white/5 rounded-full" />
        
        {/* Active track */}
        <div 
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-200"
          style={{ 
            width: `${((value + 1/intervalFactor) / (2/intervalFactor)) * 100}%`,
            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)'
          }}
        />
        
        {/* Slider handle */}
        <div
          ref={dotRef}
          onMouseDown={() => setIsDown(true)}
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-lg cursor-pointer border-2 border-white/20 hover:scale-110 transition-transform duration-200"
          style={{ 
            transform: `translate(-50%, -50%)`,
            left: `${pos}px`
          }}
        >
          {/* Inner glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white to-white/80" />
        </div>
      </div>
    </div>
  );
};

export default Slider;
