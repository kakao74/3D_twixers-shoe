"use client";

import Model from "@/components/Model";
import { useEffect, useState } from "react";

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
    typeof window !== "undefined" ? window.innerWidth < 650 : false;

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
    scale: 0.15,
    url: "",
  });

  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowHeight(window.innerHeight);
    }
  }, []);

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

  const isSmol =
    typeof window !== undefined
      ? window.innerWidth < 641
        ? true
        : false
      : false;

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
      <div className="relative min-h-screen w-full flex flex-col justify-between items-center bg-gray-200 sm:overflow-y-scroll">
        <h1 className="left-12 top-8 absolute text-5xl font-bold sm:left-5  ">
          Twixers
        </h1>
        <span className="right-12 top-8 absolute text-lg w-72 sm:right-5 sm:w-32">
          This model is the work of 0marvin-schimanski0 from cgtrader.com
        </span>

        <div
          className="z-10 relative w-full transition-all duration-300 ease-in-out "
          style={{
            height: isFull ? windowHeight : (windowHeight * 3) / 5,
          }}
        >
          <Model className=" w-full h-full " />

          <button
            className="rounded-t-lg bg-gray-300 w-24 flex justify-center items-center absolute left-1/2 -translate-x-1/2 -translate-y-full border border-b-0 border-gray-400 hover:bg-gray-400 transition-all duration-400"
            onClick={() => setIsFull(!isFull)}
          >
            {isFull ? "Show" : "Hide"}
          </button>
        </div>

        <div
          onMouseOver={() => setIsHoverSketchPicker(true)}
          onMouseLeave={() => setIsHoverSketchPicker(false)}
          className={`overflow-hidden absolute z-20 -translate-y-[85%] -translate-x-[20%]  ${
            isSmol &&
            (selectedMesh === "mainBody" || selectedMesh === "insideSoles"
              ? "-translate-x-[20%]"
              : selectedMesh === "insideBody" || selectedMesh === "bigFlop"
              ? "-translate-x-[70%]"
              : "-translate-x-[120%]")
          } ${
            isHoverSketchPicker || isHoverColorButton ? "w-56 h-94" : "w-0 h-0"
          }`}
          style={{
            transition: "height 0.3s ease, width 0.3s ease",
            top: pickerPosition.top,
            left: pickerPosition.left,
            touchAction: "none",
          }}
        >
          <SketchPicker
            color={modelInfo[selectedMesh]}
            onChange={onChangeMethod}
          />
        </div>

        <div
          className=" w-full flex justify-between items-center overflow-hidden  transition-all duration-300 ease-in-out sm:flex-col sm:space-y-4  "
          style={
            isFull
              ? { height: 0, padding: 0 }
              : isSmallScreen
              ? { height: windowHeight, padding: 20 }
              : { height: (windowHeight * 2) / 5, padding: 20 }
          }
        >
          <div className="w-2/5 grid grid-cols-3 gap-x-2 gap-y-8  sm:w-full sm:h-1/2">
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
                className=" flex flex-col justify-center items-center"
              >
                <span>{meshName}</span>
                <div className=" w-full flex justify-center items-center ">
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
                    className="w-24 aspect-square py-3 rounded-full border-4 border-transparent  shadow-md shadow-black transition-all duration-200 ease-in-out"
                    style={
                      selectedMesh === meshName
                        ? {
                            backgroundColor: modelInfo[meshName],
                            borderColor: "#4a8fff",
                          }
                        : { backgroundColor: modelInfo[meshName] }
                    }
                  ></button>
                </div>
              </div>
            ))}
          </div>

          <div className="relative z-10 w-2/5 h-full flex justify-between items-center space-x-5 sm:w-full sm:h-1/2 sm:flex-col sm:space-y-4">
            <div className="flex flex-col h-full w-1/2 sm:w-full">
              <h1>Upload Texture</h1>
              <DragDrop onDrop={handleDrop} />
            </div>

            <div className="w-1/2 flex flex-col justify-between items-center space-y-4  sm:w-full">
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
