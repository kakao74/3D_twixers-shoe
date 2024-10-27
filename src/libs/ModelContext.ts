import { createContext } from "react";

export type MeshType =
| "mainBody"
| "insideBody"
| "soles"
| "insideSoles"
| "smallFlop"
| "bigFlop"
| "laces";

export interface ModelInfo {
  mainBody: string;
  insideBody: string;
  soles: string;
  insideSoles: string;
  smallFlop: string;
  bigFlop: string;
  laces: string;
  texture: string | null;
}

interface ModelContextType {
  modelInfo: ModelInfo;
  setModelInfo: (modelInfo: ModelInfo) => void;

  selectedMesh: MeshType;
  setSelectedMesh: (mesh: MeshType) => void; 

  textureUrl: string | null;
  setTextureUrl: (textureUrl: string) => void
}

const ModelContext = createContext<ModelContextType | undefined>(undefined);

export default ModelContext;
