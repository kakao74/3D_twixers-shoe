"use client";

import gsap from "gsap";
import {
  forwardRef,
  Suspense,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { Environment, PerspectiveCamera, View } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

import ModelContext from "@/libs/ModelContext";
import Loader from "./_components/Loader";
import ShoeMesh from "./_components/ShoeMesh";

const Model = ({ className }) => {
  const { setSelectedMesh } = useContext(ModelContext);

  console.log("re-rendered");

  const [targetRotation, setTargetRotation] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [canvasElement, setCanvasElement] = useState("");

  const cameraRef = useRef();
  const groupRef = useRef();
  const canvasContainerRef = useRef(null);

  const raycaster = useRef(new THREE.Raycaster());
  const mouse = { x: 0, y: 0 };

  let isDragging = false;
  let prevMousePos = { x: 0, y: 0 };

  useEffect(() => {
    if (canvasContainerRef.current) {
      setCanvasElement(document.getElementById("meshContainer"));
    }
  }, []);

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
        case "Laces_Material":
          setSelectedMesh("laces");
          break;
        case "Main_Body_Material":
          setSelectedMesh("mainBody");
          break;
        case "Insole_Right_Material":
          setSelectedMesh("insideSoles");
          break;
        case "Sole_Material":
          setSelectedMesh("soles");
          break;
        case "Main_Shoe_Inside":
          setSelectedMesh("insideBody");
          break;
        case "Big_Shoe_Flap_Material":
          setSelectedMesh("bigFlop");
          break;
        case "Small_Shoe_Flap_Material":
          setSelectedMesh("smallFlop");
          break;
        default:
          break;
      }
    }
  };

  let startMousPos = { x: 0, y: 0 };
  const targetRotationRef = useRef({ x: 0, y: 0, z: 0 });
  function handleMouseDown(e) {
    isDragging = true;

    startMousPos = { x: e.offsetX, y: e.offsetY };
  }

  function handleMouseMove(e) {
    if (!isDragging || !groupRef.current) return;

    const deltaMove = {
      x: prevMousePos.x + startMousPos.x - e.offsetX,
      y: prevMousePos.y + startMousPos.y - e.offsetY,
    };

    setTargetRotation({ x: deltaMove.y, y: deltaMove.x, z: 0 });
    targetRotationRef.current = { x: deltaMove.x, y: deltaMove.y };
  }

  function handleMouseUp(e) {
    isDragging = false;

    console.log("targetRotationRef: ", targetRotationRef.current);
    prevMousePos = {
      x: targetRotationRef.current.x,
      y: targetRotationRef.current.y,
    };
  }

  useEffect(() => {
    const canvasContainer = canvasContainerRef.current;
    canvasContainer.addEventListener("click", handleClick);

    canvasContainer.addEventListener("mousedown", handleMouseDown);

    canvasContainer.addEventListener("mousemove", handleMouseMove);

    canvasContainer.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvasContainer.removeEventListener("click", handleClick);
      canvasContainer.removeEventListener("mousedown", handleMouseDown);
      canvasContainer.removeEventListener("mousemove", handleMouseMove);
      canvasContainer.removeEventListener("mouseup", handleMouseUp);
    };
  }, [canvasContainerRef]);

  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.rotation, {
        x: targetRotation.x * 0.005,
        y: targetRotation.y * 0.005,
        z: targetRotation.z,
        duration: 0.8,
        ease: "power3.out",
      });
    }
  }, [targetRotation]);

  return (
    <div ref={canvasContainerRef} id="meshContainer" className={className}>
      <div className="h-full w-full flex flex-col items-center">
        <div className="h-full w-full overflow-hidden relative">
          <ModelView groupRef={groupRef} cameraRef={cameraRef} />

          <Canvas shadows className="w-full h-full" eventSource={canvasElement}>
            <View.Port />
          </Canvas>
        </div>
      </div>
    </div>
  );
};

const ModelView = forwardRef(({ groupRef, cameraRef }, ref) => {
  return (
    <View className={`w-full h-full absolute `}>
      <ambientLight intensity={0.3} />
      <Environment preset="city" />
      <PerspectiveCamera makeDefault position={[0, 0, 0.8]} ref={cameraRef} />
      {/* <Lights /> */}

      {/* <AccumulativeShadows
        temporal
        frames={60}
        alphaTest={0.85}
        scale={10}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, -0.3]}
      >
        <RandomizedLight
          amount={4}
          radius={9}
          intensity={2}
          ambient={0.25}
          position={[-5, 5, -5]}
        />

        <RandomizedLight
          amount={4}
          radius={5}
          intensity={0.25}
          ambient={0.55}
          position={[-5, 5, 2]}
        />
      </AccumulativeShadows> */}

      <group ref={groupRef} position={[0, 0, 0]}>
        <Suspense fallback={<Loader />}>
          <ShoeMesh />
        </Suspense>
      </group>
      {/* <OrbitControls
        makeDefault
        enableZoom={true}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
      /> */}
    </View>
  );
});

export default Model;
