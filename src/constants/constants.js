import { ai, fileIcon, logoShoe, stylishShoe, swatch } from "../assets";

export const EditorTabs = [
  {
    name: "colorpicker",
    icon: swatch,
  },
  {
    name: "filepicker",
    icon: fileIcon,
  },
  {
    name: "aipicker",
    icon: ai,
  },
];

export const FilterTabs = [
  {
    name: "logoShoe",
    icon: logoShoe,
  },
  {
    name: "stylishShoe",
    icon: stylishShoe,
  },
];

export const DecalTypes = {
  logo: {
    stateProperty: "logoDecal",
    filterTab: "logoShoe",
  },
  full: {
    stateProperty: "fullDecal",
    filterTab: "stylishShoe",
  },
};
