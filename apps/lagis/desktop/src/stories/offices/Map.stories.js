import { withDesign } from "storybook-addon-designs";
import Map from "../../components/commons/Map";
import design from "../assets/overview/Map.png";

export default {
  title: "Offices/Components/Map",
  component: Map,
  decorators: [withDesign],
};

export const Mockup = {
  args: { width: 600, height: 400 },
};
Mockup.parameters = {
  design: {
    type: "image",
    url: design,
    scale: 0.5,
  },
};
