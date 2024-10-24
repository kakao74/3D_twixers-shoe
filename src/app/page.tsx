"use client";

import Model from "@/components/Model/Model";
import { useState } from "react";
import { SketchPicker } from "react-color";

import ModelContext, { MeshType, ModelInfo } from "@/libs/ModelContext";

export default function Home() {
  const [selectedMesh, setSelectedMesh] = useState<MeshType>("mainBody");

  const meshNamesArr = [
    "mainBody",
    "insideBody",
    "soles",
    "insideSoles",
    "smallFlop",
    "bigFlop",
    "laces",
  ];
  const [modelInfo, setModelInfo] = useState<ModelInfo>({
    mainBody: "#000000",
    insideBody: "#757575",
    soles: "#FFFFFF",
    insideSoles: "#606060",
    smallFlop: "#000000",
    bigFlop: "#C4C4C4",
    laces: "#000000",
    texture: null,
  });

  const color = modelInfo[selectedMesh];

  const onChangeMethod = (color: any) => {
    setModelInfo((prev) => ({
      ...prev,
      [selectedMesh]: color.hex,
    }));
  };

  return (
    <ModelContext.Provider
      value={{ modelInfo, setModelInfo, selectedMesh, setSelectedMesh }}
    >
      <div className="w-full flex justify-center items-stretch">
        <div className="w-[90%] flex justify-between items-stretch">
          <div className="flex  justify-center items-center">
            <SketchPicker
              color={color}
              onChange={(color) => onChangeMethod(color)}
            />
          </div>

          <div className="w-1/2">
            <Model className="border-2 rounded-lg w-full h-full py-14 sm:py-10 sm:px-10 px-5" />
          </div>

          <div className="self-center flex-col justify-between items-center space-y-5">
            {meshNamesArr.map((meshName, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedMesh(meshName as MeshType);
                }}
                className={`w-full py-3 rounded-lg border shadow-md transition-all duration-200 ease-in-out ${
                  selectedMesh === meshName
                    ? "bg-sky-500 text-white"
                    : "bg-white text-black"
                }`}
              >
                {meshName}
              </button>
            ))}
          </div>
        </div>
      </div>
    </ModelContext.Provider>
  );
}
