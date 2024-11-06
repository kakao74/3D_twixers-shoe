"use client";

import gsap from "gsap";
import { Suspense, useContext, useEffect, useRef } from "react";

import {
  AccumulativeShadows,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  RandomizedLight,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

import ModelContext from "@/libs/ModelContext";
import Lights from "./_components/Lights";
import Loader from "./_components/Loader";
import ShoeMesh from "./_components/ShoeMesh";

const Model = ({ className }) => {
  const { setSelectedMesh } = useContext(ModelContext);

  const cameraRef = useRef();
  const groupRef = useRef();
  const canvasContainerRef = useRef(null);

  const raycaster = useRef(new THREE.Raycaster());
  const mouse = { x: 0, y: 0 };

  let isDragging = false;

  useEffect(() => {
    if (groupRef.current && !isDragging) {
      gsap.to(groupRef.current.rotation, {
        x: 0,
        y: 2 * Math.PI,
        z: 0,
        duration: 10,
        repeat: -1,
        ease: "none",
      });
    }
  }, [groupRef, isDragging]);

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

      switch (mesh.object.material.name) {
        case "Laces":
          setSelectedMesh("laces");
          break;
        case "Main_Body":
          setSelectedMesh("mainBody");
          break;
        case "Insole":
          setSelectedMesh("insideSoles");
          break;
        case "Sole":
          setSelectedMesh("soles");
          break;
        case "Main_Shoe_Inside":
          setSelectedMesh("insideBody");
          break;
        case "Flap":
          setSelectedMesh("bigFlop");
          break;
        case "Tag":
          setSelectedMesh("smallFlop");
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    const canvasContainer = canvasContainerRef.current;
    canvasContainer.addEventListener("click", handleClick);

    return () => {
      canvasContainer.removeEventListener("click", handleClick);
    };
  }, [canvasContainerRef]);

  return (
    <div
      ref={canvasContainerRef}
      id="meshContainer"
      className="w-full h-full flex justify-center items-center"
    >
      <Suspense fallback={<Loader />}>
        <Canvas shadows className="w-full h-full ">
          <ambientLight intensity={0.5} />
          <Environment preset="city" />

          <PerspectiveCamera
            position={[0, 0, 0.5]}
            makeDefault
            ref={cameraRef}
          />

          <AccumulativeShadows
            temporal
            frames={60}
            alphaTest={0.85}
            scae={10}
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

          <group ref={groupRef} position={[0, -0.1, 0]}>
            <Lights />

            <ShoeMesh />
          </group>

          <OrbitControls
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
