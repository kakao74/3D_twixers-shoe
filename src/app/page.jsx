"use client";

import Model from "@/components/Model";
import { useRef, useState } from "react";

import DragDrop from "@/components/DragDrop";
import Slider from "@/components/Model/_components/Slider";
import ModelContext from "@/libs/ModelContext";
import { SketchPicker } from "react-color";

export default function Home() {
  const sketchPickerRef = useRef();

  const [isHoverColorButton, setIsHoverColorButton] = useState(null);
  const [isHoverSketchPicker, setIsHoverSketchPicker] = useState(null);
  const [selectedMesh, setSelectedMesh] = useState("mainBody");

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
    setIsHoverColorButton(null);
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
      <div className="h-screen w-full flex flex-col justify-between items-center bg-gray-200">
        <div className="w-full h-3/5 ">
          <Model className=" w-full h-full " />
        </div>

        <div className=" w-full h-2/5 flex justify-between items-center p-5">
          <div className="w-2/5 grid grid-cols-3 gap-x-2 gap-y-8">
            {[
              "mainBody",
              "insideBody",
              "soles",
              "insideSoles",
              "bigFlop",
              "laces",
            ].map((meshName, index) => (
              <div className=" flex flex-col justify-between items-center">
                <span>{meshName}</span>
                <div className=" w-full flex justify-center items-center ">
                  <div className="relative w-24 aspect-square">
                    <button
                      key={index}
                      onMouseOver={() => handleMouseOverColorButton(meshName)}
                      onMouseLeave={handleMouseLeaveColorButton}
                      onClick={() => setSelectedMesh(meshName)}
                      className="w-full h-full py-3 rounded-full border-2 border-transparent  shadow-md shadow-black transition-all duration-200 ease-in-out"
                      style={
                        selectedMesh === meshName
                          ? {
                              backgroundColor: modelInfo[meshName],
                              borderColor: "skyblue",
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
            <div className="flex flex-col h-full">
              <h1>Upload Texture</h1>
              <DragDrop onDrop={handleDrop} />
            </div>

            <div className="w-1/2 flex flex-col justify-between items-center space-y-4 ">
              <Slider
                text="xPos"
                value={textureSettings.xPos}
                setValue={(value) =>
                  setTextureSettings((prev) => ({ ...prev, xPos: value }))
                }
              />
              <Slider
                text="yPos"
                value={textureSettings.yPos}
                setValue={(value) =>
                  setTextureSettings((prev) => ({ ...prev, yPos: value }))
                }
              />
              <Slider
                text="x rot"
                value={textureSettings.xRotation}
                setValue={(value) =>
                  setTextureSettings((prev) => ({
                    ...prev,
                    xRotation: value,
                  }))
                }
              />
              <Slider
                text="y rot"
                value={textureSettings.yRotation}
                setValue={(value) =>
                  setTextureSettings((prev) => ({
                    ...prev,
                    yRotation: value,
                  }))
                }
              />
              <Slider
                text="scale"
                value={textureSettings.scale}
                setValue={(value) =>
                  setTextureSettings((prev) => ({ ...prev, scale: value }))
                }
              />
            </div>
          </div>
        </div>
      </div>
    </ModelContext.Provider>
  );
}
