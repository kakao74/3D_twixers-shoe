import { Decal, useGLTF, useTexture } from "@react-three/drei";
import { useContext, useEffect } from "react";
import * as THREE from "three";

import ModelContext from "@/libs/ModelContext";

const ShoeMesh = () => {
  const { modelInfo } = useContext(ModelContext);

  const { nodes, materials } = useGLTF("/models/shoe.glb");

  const texture = useTexture("/cactus.png");

  useEffect(() => {
    if (modelInfo) {
      materials.Main_Body_Material.color = new THREE.Color(modelInfo.mainBody);
      materials.Insole_Right_Material.color = new THREE.Color(
        modelInfo.insideSoles
      );
      materials.Sole_Material.color = new THREE.Color(modelInfo.soles);
      materials.Main_Shoe_Inside.color = new THREE.Color(modelInfo.insideBody);
      materials.Big_Shoe_Flap_Material.color = new THREE.Color(
        modelInfo.bigFlop
      );
      materials.Laces_Material.color = new THREE.Color(modelInfo.laces);
      materials.Small_Shoe_Flap_Material.color = new THREE.Color(
        modelInfo.smallFlop
      );

      Object.values(materials).forEach((material) => {
        material.needsUpdate = true;
      });
    }
  }, [modelInfo, materials]);

  return (
    <>
      <mesh
        castShadow
        geometry={nodes.Nike_Air_Force_Right.children[0].geometry}
        material={materials.Sole_Material}
      />
      <mesh
        castShadow
        geometry={nodes.Nike_Air_Force_Right.children[1].geometry}
        material={materials.Insole_Right_Material}
      />
      <mesh
        castShadow
        geometry={nodes.Nike_Air_Force_Right.children[2].geometry}
        material={materials.Main_Body_Material}
      >
        {texture && (
          <Decal
            position={[-0.05, 0.05, 0]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={texture}
            depthTest={true}
          />
        )}
      </mesh>
      <mesh
        castShadow
        geometry={nodes.Nike_Air_Force_Right.children[3].geometry}
        material={materials.Main_Shoe_Inside}
      />

      <mesh
        castShadow
        geometry={nodes.Big_Shoe_Flap.geometry}
        material={materials.Big_Shoe_Flap_Material}
      />

      <mesh
        castShadow
        geometry={nodes.Laces.geometry}
        material={materials.Laces_Material}
      />
      <mesh
        castShadow
        geometry={nodes.Small_Shoe_Flap.geometry}
        material={materials.Small_Shoe_Flap_Material}
      />
    </>
  );
};

export default ShoeMesh;

useTexture.preload("/cactus.png");
useGLTF.preload("/models/shoe.glb");
