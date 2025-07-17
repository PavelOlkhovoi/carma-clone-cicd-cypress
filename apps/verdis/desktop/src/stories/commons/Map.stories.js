import { withDesign } from "storybook-addon-designs";
import Map from "../../components/commons/Map";
import design from "../assets/commons/Map.png";

export default {
  title: "CommonComponents/Map",
  component: Map,
  decorators: [withDesign],
};

export const Mockup = {
  args: {},
};
export const LargeMap = {
  args: { width: 1366, height: 768 },
  parameters: {
    design: {
      type: "image",
      url: design,
      scale: 0.5,
    },
  },
};
export const MiniMap = {
  args: { width: 300, height: 300 },
  parameters: {
    design: {
      type: "image",
      url: design,
      scale: 0.5,
    },
  },
};

Mockup.parameters = {
  design: {
    type: "image",
    url: design,
    scale: 0.5,
  },
};
