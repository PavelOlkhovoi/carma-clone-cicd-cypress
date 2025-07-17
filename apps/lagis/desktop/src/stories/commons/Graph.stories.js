import { withDesign } from "storybook-addon-designs";
import Graph from "../../components/commons/Graph";
import design from "../assets/commons/Graph.png";

export default {
  title: "CommonComponents/Graph",
  component: Graph,

  decorators: [withDesign],
};

export const Mockup = {
  args: {},
};
Mockup.parameters = {
  design: {
    type: "image",
    url: design,
    scale: 0.5,
  },
};
