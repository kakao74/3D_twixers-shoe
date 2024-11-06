"use client";

import Model from "@/components/Model";
import { useEffect, useState } from "react";

import DragDrop from "@/components/DragDrop";
import Slider from "@/components/Model/_components/Slider";
import ModelContext from "@/libs/ModelContext";
import { SketchPicker } from "react-color";

export default function Home() {
  const [isHoverColorButton, setIsHoverColorButton] = useState(null);
  const [isHoverSketchPicker, setIsHoverSketchPicker] = useState(null);
  const [selectedMesh, setSelectedMesh] = useState("mainBody");
  const [isFull, setIsFull] = useState(false);

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
    scale: 0.15,
    url: "",
  });

  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowHeight(window.innerHeight);
    }
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

  function handleMouseOverColorButton(meshName) {
    setIsHoverColorButton(meshName);
  }

  function handleMouseLeaveColorButton() {
    if (isHoverSketchPicker === null) {
      setIsHoverColorButton(null);
    }
  }

  function handleMouseOverSketchPicker(meshName) {
    setIsHoverColorButton(meshName);
  }

  function handleMouseLeaveSketchPicker() {
    setIsHoverSketchPicker(null);
  }

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
      <div className="relative h-screen w-full flex flex-col justify-between items-center bg-gray-200">
        <h1 className="left-12 top-8 absolute text-5xl font-bold  ">Twixers</h1>
        <span className="right-12 top-8 absolute text-lg w-72">
          This model is the work of 0marvin-schimanski0 from cgtrader.com
        </span>

        <div
          className="relative w-full transition-all duration-300 ease-in-out "
          style={{
            height: isFull ? windowHeight : (windowHeight * 3) / 5,
          }}
        >
          <Model className=" w-full h-full " />

          <button
            className="rounded-t-lg bg-gray-300 w-24 flex justify-center items-center absolute left-1/2 -translate-y-full border border-b-0 border-black hover:bg-gray-400 transition-all duration-400"
            onClick={() => setIsFull(!isFull)}
          >
            {isFull ? "Show" : "Hide"}
          </button>
        </div>

        <div
          className=" w-full flex justify-between items-center  transition-all duration-300 ease-in-out overflow-hidden"
          style={
            isFull
              ? { height: 0, padding: 0 }
              : { height: (windowHeight * 2) / 5, padding: 20 }
          }
        >
          <div className="w-2/5 grid grid-cols-3 gap-x-2 gap-y-8">
            {[
              "mainBody",
              "insideBody",
              "soles",
              "insideSoles",
              "bigFlop",
              "laces",
            ].map((meshName, index) => (
              <div
                key={index}
                className=" flex flex-col justify-between items-center"
              >
                <span>{meshName}</span>
                <div className=" w-full flex justify-center items-center ">
                  <div className="relative w-24 aspect-square">
                    <button
                      key={index}
                      onMouseOver={() => handleMouseOverColorButton(meshName)}
                      onMouseLeave={handleMouseLeaveColorButton}
                      onClick={() => setSelectedMesh(meshName)}
                      className="w-full h-full py-3 rounded-full border-4 border-transparent  shadow-md shadow-black transition-all duration-200 ease-in-out"
                      style={
                        selectedMesh === meshName
                          ? {
                              backgroundColor: modelInfo[meshName],
                              borderColor: "#4a8fff",
                            }
                          : { backgroundColor: modelInfo[meshName] }
                      }
                    ></button>

                    <div
                      onMouseOver={() => handleMouseOverSketchPicker(meshName)}
                      onMouseLeave={handleMouseLeaveSketchPicker}
                      className={` absolute z-10 right-0 top-0 translate-x-[90%] -translate-y-[90%] overflow-hidden ease-in-out duration-300 transition-all ${
                        selectedMesh === meshName &&
                        isHoverColorButton === meshName
                          ? "w-56 h-94"
                          : "w-0 h-0"
                      }`}
                    >
                      <SketchPicker
                        color={modelInfo[selectedMesh]}
                        onChange={onChangeMethod}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-2/5 h-full flex justify-between items-center space-x-5">
            <div className="flex flex-col h-full w-1/2">
              <h1>Upload Texture</h1>
              <DragDrop onDrop={handleDrop} />
            </div>

            <div className="w-1/2 flex flex-col justify-between items-center space-y-4 ">
              {["xPos", "yPos", "xRotation", "yRotation", "scale"].map(
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
      </div>
    </ModelContext.Provider>
  );
}
