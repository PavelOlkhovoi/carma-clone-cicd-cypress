import { withDesign } from "storybook-addon-designs";
import Map from "../../components/commons/Map";
import design from "../assets/overview/Map.png";

export default {
  title: "Overview/Components/Map",
  component: Map,
  decorators: [withDesign],
};

export const Mockup = {
  args: { width: 500, height: 900 },
};
Mockup.parameters = {
  design: {
    type: "image",
    url: design,
    scale: 0.5,
  },
};
