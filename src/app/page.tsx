"use client";

import Model from "@/components/Model/Model";
import { useState } from "react";
import { SketchPicker } from "react-color";

import DragDrop from "@/components/DragDrop";
import Slider from "@/components/Model/_components/Slider";
import ModelContext, { MeshType, ModelInfo } from "@/libs/ModelContext";

export default function Home() {
  const [selectedMesh, setSelectedMesh] = useState<MeshType>("mainBody");

  const [textureUrl, setTextureUrl] = useState<string | null>(null); // State to store the file Blob

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

  const handleDrop = (files: File[]) => {
    if (files.length > 0) {
      const selectedFile = files[0];

      const url = URL.createObjectURL(selectedFile);
      setTextureUrl(url);
    }
  };

  const [xPos, setXPos] = useState(0);

  return (
    <ModelContext.Provider
      value={{
        modelInfo,
        setModelInfo,
        selectedMesh,
        setSelectedMesh,
        textureUrl,
        setTextureUrl,
      }}
    >
      <div className="w-full flex justify-center items-stretch">
        <div className="w-[90%] flex justify-between items-stretch">
          <div className="w-1/3 flex flex-col  justify-center items-center border space-y-5">
            <SketchPicker
              color={color}
              onChange={(color) => onChangeMethod(color)}
            />

            <div className="w-full">
              <h1>Upload Texture</h1>
              <DragDrop onDrop={handleDrop} />
            </div>

            <Slider value={xPos} setValue={setXPos} />
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
