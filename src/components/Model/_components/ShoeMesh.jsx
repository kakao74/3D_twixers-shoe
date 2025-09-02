"use client";

import ModelContext from "@/libs/ModelContext";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import { useContext, useEffect, useRef } from "react";
import * as THREE from "three";

const ShoeMesh = () => {
  const { modelInfo, textureSettings } = useContext(ModelContext);
  const { scene, materials } = useGLTF("/models/shoe.glb");

  const decalTexture = useTexture(
    textureSettings.url ? textureSettings.url : "/vecteezy_modern-travel-agency-logo-with-an-airplane-icon-vibrant_60422200.png"
  );

  // Apply material colors based on modelInfo
  useEffect(() => {
    if (modelInfo) {
      materials.Main_Body.color = new THREE.Color(modelInfo.mainBody);
      materials.Insole.color = new THREE.Color(modelInfo.insideSoles);
      materials.Sole.color = new THREE.Color(modelInfo.soles);
      materials.Main_Shoe_Inside.color = new THREE.Color(modelInfo.insideBody);
      materials.Flap.color = new THREE.Color(modelInfo.bigFlop);
      materials.Laces.color = new THREE.Color(modelInfo.laces);
      materials.Tag.color = new THREE.Color(modelInfo.smallFlop);

      Object.values(materials).forEach((material) => {
        material.needsUpdate = true;
      });
    }

    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [modelInfo, materials, scene]);

  const mainBodyNode = useRef(scene.getObjectByName("Plane040_2"));

  const isSmall =
    typeof window !== undefined && window.innerWidth < 640 ? true : false;

  return (
    <group dispose={null} scale={isSmall ? 0.6 : 1}>
      <primitive object={scene} />

      {mainBodyNode && decalTexture && (
        <Decal
          mesh={mainBodyNode}
          map={decalTexture}
          position={[textureSettings.xPos, textureSettings.yPos, 0.1]}
          rotation={[textureSettings.xRotation, textureSettings.yRotation, 0]}
          scale={textureSettings.scale}
          depthTest={true}
          depthWrite={true}
        />
      )}
    </group>
  );
};

export default ShoeMesh;

useGLTF.preload("/models/shoe.glb");
