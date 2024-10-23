"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  forwardRef,
  Suspense,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

import ModelContext from "@/libs/ModelContext";
import Lights from "./_components/Lights";
import Loader from "./_components/Loader";
import ShoeMesh from "./_components/ShoeMesh";

gsap.registerPlugin(ScrollTrigger);

const Model = ({ className }) => {
  const { setSelectedMesh } = useContext(ModelContext);

  const cameraRef = useRef();
  const groupRef = useRef(new THREE.Group());
  const raycaster = new THREE.Raycaster();
  const mouse = { x: 0, y: 0 };

  const canvasContainerRef = useRef(null);
  const [canvasElement, setCanvasElement] = useState("");

  useEffect(() => {
    if (canvasContainerRef.current) {
      setCanvasElement(document.getElementById("meshContainer"));
    }
  }, []);

  const handleClick = (event) => {
    const rect = canvasContainerRef.current.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, cameraRef.current);

    const intersects = raycaster.intersectObjects(groupRef.current.children);

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
          setSelectedMesh("insideBody");
          break;
        case "Sole_Material":
          setSelectedMesh("soles");
          break;
        case "Main_Shoe_Inside":
          setSelectedMesh("insideSoles");
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

  useEffect(() => {
    const canvasContainer = canvasContainerRef.current;
    canvasContainer.addEventListener("click", handleClick);

    return () => {
      canvasContainer.removeEventListener("click", handleClick);
    };
  }, [canvasContainerRef]);

  return (
    <div ref={canvasContainerRef} id="meshContainer" className={className}>
      <div className="h-full w-full flex flex-col items-center">
        <div className="h-full w-full overflow-hidden relative">
          <ModelView groupRef={groupRef} cameraRef={cameraRef} />
          <Canvas className="w-full h-full" eventSource={canvasElement}>
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
      <PerspectiveCamera makeDefault position={[0, 0, 0.8]} ref={cameraRef} />
      <Lights />
      <group ref={groupRef} position={[0, 0, 0]}>
        <Suspense fallback={<Loader />}>
          <ShoeMesh />
        </Suspense>
      </group>
      <OrbitControls
        makeDefault
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
      />
    </View>
  );
});

export default Model;
