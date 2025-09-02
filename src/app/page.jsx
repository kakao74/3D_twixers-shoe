"use client";

import Model from "@/components/Model";
import { useState } from "react";
import DragDrop from "@/components/DragDrop";
import Slider from "@/components/Model/_components/Slider";
import ModelContext from "@/libs/ModelContext";
import { SketchPicker } from "react-color";

export default function Home() {
  const [isHoverColorButton, setIsHoverColorButton] = useState(false);
  const [isHoverSketchPicker, setIsHoverSketchPicker] = useState(false);
  const [selectedMesh, setSelectedMesh] = useState("mainBody");
  const [isFull, setIsFull] = useState(false);
  const isSmallScreen =
    typeof window !== "undefined" ? window.innerWidth < 768 : false;

  const [pickerPosition, setPickerPosition] = useState({ top: 0, left: 0 });

  const [modelInfo, setModelInfo] = useState({
    mainBody: "#000000",
    insideBody: "#757575",
    soles: "#FFFFFF",
    insideSoles: "#606060",
    smallFlop: "#000000",
    bigFlop: "#C4C4C4",
    laces: "#000000",
    texture: null,
  });

  const [textureSettings, setTextureSettings] = useState({
    xPos: 0.1,
    yPos: 0.05,
    xRotation: 0,
    yRotation: 0,
    zRotation: 0,
    scale: 0.15,
    url: "",
  });

  const onChangeMethod = (color) => {
    setModelInfo((prev) => ({
      ...prev,
      [selectedMesh]: color.hex,
    }));
  };

  const handleDrop = (files) => {
    if (files.length > 0) {
      const selectedFile = files[0];
      const url = URL.createObjectURL(selectedFile);
      setTextureSettings((prev) => ({ ...prev, url: url }));
    }
  };

  function handleMouseOverButton(e) {
    const buttonRect = e.target.getBoundingClientRect();
    setPickerPosition({
      top: buttonRect.top,
      left: buttonRect.right,
    });
    setIsHoverColorButton(!isHoverColorButton);
  }

  const meshLabels = {
    mainBody: "Main Body",
    insideBody: "Inside Body",
    soles: "Soles",
    insideSoles: "Inside Soles",
    bigFlop: "Big Flop",
    laces: "Laces",
  };

  return (
    <ModelContext.Provider
      value={{
        modelInfo,
        setModelInfo,
        selectedMesh,
        setSelectedMesh,
        textureSettings,
        setTextureSettings,
      }}
    >
      <div className="h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col overflow-hidden">
        {/* Header */}
        <header className="w-full p-3 border-b border-white/10 fade-in flex-shrink-0">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              3D Shoe Customizer
            </h1>
            <button
              className="glass-button flex items-center gap-2 hover:scale-105 transition-transform duration-200 text-xs px-2 py-1"
              onClick={() => setIsFull(!isFull)}
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              {isFull ? "Show Controls" : "Hide Controls"}
            </button>
          </div>
        </header>

        {/* Main Content - Full Height */}
        <div className="flex-1 flex flex-col lg:flex-row gap-3 p-3 min-h-0">
          {/* 3D Model Section - Full Height */}
          <div
            className={`relative transition-all duration-500 ease-in-out slide-up flex-1 ${
              isFull ? "lg:w-full" : "lg:w-2/3"
            }`}
          >
            <div className="w-full h-full rounded-xl overflow-hidden glass-card hover:shadow-2xl transition-shadow duration-300">
              <Model className="w-full h-full" />
            </div>
          </div>

          {/* Controls Section - Full Height with Proper Distribution */}
          {!isFull && (
            <div className="lg:w-1/3 h-full flex flex-col slide-up gap-3" style={{ animationDelay: "0.1s" }}>
              {/* Color Picker - Ultra Compact with 3 in a line */}
              <div className="glass-card p-3 hover:shadow-2xl transition-all duration-300 flex-shrink-0">
                <h2 className="text-sm font-semibold mb-2 text-blue-400 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  Color Customization
                </h2>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(meshLabels).slice(0, 3).map(([meshName, label]) => (
                    <div key={meshName} className="flex flex-col items-center space-y-1">
                      <span className="text-xs text-white/70 font-medium text-center leading-tight">{label}</span>
                      <button
                        onMouseOver={(e) =>
                          selectedMesh === meshName && handleMouseOverButton(e)
                        }
                        onMouseLeave={() =>
                          !isHoverSketchPicker &&
                          selectedMesh === meshName &&
                          setIsHoverColorButton(false)
                        }
                        onClick={(e) => {
                          setSelectedMesh(meshName);
                          handleMouseOverButton(e);
                        }}
                        className={`color-picker-button w-10 h-10 ${
                          selectedMesh === meshName ? "selected" : ""
                        }`}
                        style={{ backgroundColor: modelInfo[meshName] }}
                      >
                        {selectedMesh === meshName && (
                          <div className="absolute inset-0 bg-white/20 rounded-xl" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {Object.entries(meshLabels).slice(3, 6).map(([meshName, label]) => (
                    <div key={meshName} className="flex flex-col items-center space-y-1">
                      <span className="text-xs text-white/70 font-medium text-center leading-tight">{label}</span>
                      <button
                        onMouseOver={(e) =>
                          selectedMesh === meshName && handleMouseOverButton(e)
                        }
                        onMouseLeave={() =>
                          !isHoverSketchPicker &&
                          selectedMesh === meshName &&
                          setIsHoverColorButton(false)
                        }
                        onClick={(e) => {
                          setSelectedMesh(meshName);
                          handleMouseOverButton(e);
                        }}
                        className={`color-picker-button w-10 h-10 ${
                          selectedMesh === meshName ? "selected" : ""
                        }`}
                        style={{ backgroundColor: modelInfo[meshName] }}
                      >
                        {selectedMesh === meshName && (
                          <div className="absolute inset-0 bg-white/20 rounded-xl" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Texture Upload - Reduced Height */}
              <div className="glass-card p-3 hover:shadow-2xl transition-all duration-300 flex-shrink-0">
                <h2 className="text-sm font-semibold mb-2 text-purple-400 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                  Texture Upload
                </h2>
                <div className="h-24">
                  <DragDrop onDrop={handleDrop} />
                </div>
              </div>

              {/* Texture Controls - Ultra Compact with Z Rotation */}
              <div className="glass-card p-3 hover:shadow-2xl transition-all duration-300 flex-1 flex flex-col">
                <h2 className="text-sm font-semibold mb-2 text-green-400 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                  Texture Controls
                </h2>
                <div className="flex-1 space-y-2 flex flex-col justify-center">
                  {["xPos", "yPos", "xRotation", "yRotation", "zRotation", "scale"].map(
                    (slider, index) => (
                      <Slider
                        key={index}
                        text={slider.slice(0, 4)}
                        value={textureSettings[slider]}
                        setValue={(value) =>
                          setTextureSettings((prev) => ({
                            ...prev,
                            [slider]: value,
                          }))
                        }
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Color Picker Popup */}
        <div
          onMouseOver={() => setIsHoverSketchPicker(true)}
          onMouseLeave={() => setIsHoverSketchPicker(false)}
          className={`fixed z-50 transition-all duration-300 ease-in-out ${
            isHoverSketchPicker || isHoverColorButton ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
          }`}
          style={{
            top: pickerPosition.top,
            left: pickerPosition.left,
            transform: `translate(${isSmallScreen ? "-50%" : "0%"}, -50%)`,
          }}
        >
          <div className="glass-card p-2">
            <SketchPicker
              color={modelInfo[selectedMesh]}
              onChange={onChangeMethod}
            />
          </div>
        </div>
      </div>
    </ModelContext.Provider>
  );
}
