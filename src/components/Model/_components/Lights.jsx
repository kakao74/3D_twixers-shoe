import { SpotLight } from "@react-three/drei";

const Lights = () => {
  return (
    <SpotLight
      castShadow
      intensity={1.2}
      angle={0.45}
      penumbra={0.3}
      position={[0, 8, 4]}
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
      shadow-bias={-0.0001} // Reduces shadow artifacts
    />
  );
};

export default Lights;
