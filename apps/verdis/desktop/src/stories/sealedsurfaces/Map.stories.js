import { withDesign } from "storybook-addon-designs";
import Map from "../../components/commons/Map";
import design from "../assets/overview/Map.png";

export default {
  title: "SealedSurfaces/Components/Map",
  component: Map,
  decorators: [withDesign],
};

export const Mockup = {
  args: { width: 820, height: 650 },
};
Mockup.parameters = {
  design: {
    type: "image",
    url: design,
    scale: 0.5,
  },
};
