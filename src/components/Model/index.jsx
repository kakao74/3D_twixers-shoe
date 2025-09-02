"use client";

import { Suspense, useContext, useEffect, useRef, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei";
import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";
import * as THREE from "three";

import ShoeMesh from "./_components/ShoeMesh";
import Lights from "./_components/Lights";
import Loader from "./_components/Loader";
import ModelContext from "@/libs/ModelContext";

const Shadows = () => (
  <AccumulativeShadows
    temporal
    frames={60}
    alphaTest={0.85}
    opacity={0.8}
    scale={10}
    color="white"
    position={[0, -0.14, 0]}
  >
    <RandomizedLight
      radius={2}
      ambient={0.5}
      position={[10, 5, -15]}
      bias={0.001}
    />
  </AccumulativeShadows>
);

Shadows.displayName = "shadows";

const Model = () => {
  const { setSelectedMesh } = useContext(ModelContext);

  const cameraRef = useRef();
  const groupRef = useRef();
  const canvasContainerRef = useRef(null);

  const raycaster = useRef(new THREE.Raycaster());

  const handleClick = useCallback((event) => {
    const rect = canvasContainerRef.current.getBoundingClientRect();
    const mouse = {
      x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
      y: -((event.clientY - rect.top) / rect.height) * 2 + 1
    };

    raycaster.current.setFromCamera(mouse, cameraRef.current);

    const intersects = raycaster.current.intersectObjects(
      groupRef.current.children
    );

    if (intersects.length > 0) {
      const mesh = intersects[0];
      const meshName = mesh.object.material.name;

      const selectedMesh = {
        Laces: "laces",
        Main_Body: "mainBody",
        Insole: "insideSoles",
        Sole: "soles",
        Main_Shoe_Inside: "insideBody",
        Flap: "bigFlop",
        Tag: "smallFlop",
      }[meshName];

      if (selectedMesh) setSelectedMesh(selectedMesh);
    }
  }, [setSelectedMesh]);

  useEffect(() => {
    const canvasContainer = canvasContainerRef.current;
    canvasContainer.addEventListener("click", handleClick);

    return () => {
      canvasContainer.removeEventListener("click", handleClick);
    };
  }, [handleClick]);

  return (
    <div
      ref={canvasContainerRef}
      id="meshContainer"
      className="w-full h-full flex justify-center items-center"
    >
      <Suspense fallback={<Loader />}>
        <Canvas shadows className="w-full h-full">
          <ambientLight intensity={0.5} />
          <Environment preset="city" />

          <PerspectiveCamera
            position={[0, 0, 0.5]}
            makeDefault
            ref={cameraRef}
          />

          <Shadows />

          <group ref={groupRef} position={[0, -0.1, 0]}>
            <Lights />
            <ShoeMesh />
          </group>

          <OrbitControls
            autoRotate
            enableZoom={false}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default Model;
