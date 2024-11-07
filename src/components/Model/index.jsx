"use client";

import {
  AccumulativeShadows,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  RandomizedLight,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { memo, Suspense, useContext, useEffect, useRef } from "react";
import * as THREE from "three";

import ModelContext from "@/libs/ModelContext";
import Lights from "./_components/Lights";
import Loader from "./_components/Loader";
import ShoeMesh from "./_components/ShoeMesh";

const Shadows = memo(() => (
  <AccumulativeShadows
    temporal
    frames={60}
    alphaTest={0.85}
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
));

Shadows.displayName = "shadows";

const Model = () => {
  const { setSelectedMesh } = useContext(ModelContext);

  const cameraRef = useRef();
  const groupRef = useRef();
  const canvasContainerRef = useRef(null);

  const raycaster = useRef(new THREE.Raycaster());
  const mouse = { x: 0, y: 0 };

  const handleClick = (event) => {
    const rect = canvasContainerRef.current.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

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
  };

  useEffect(() => {
    const canvasContainer = canvasContainerRef.current;
    canvasContainer.addEventListener("click", handleClick);

    return () => {
      canvasContainer.removeEventListener("click", handleClick);
    };
  }, []);

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
