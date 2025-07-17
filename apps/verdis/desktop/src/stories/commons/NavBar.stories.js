import { withDesign } from "storybook-addon-designs";
import NavBar from "../../components/commons/NavBar";
import design from "../assets/commons/Map.png";
import { generateStory } from "../_tools/StoryFactory";

export default {
  title: "CommonComponents/NavBar",
  component: NavBar,
  decorators: [withDesign],
  args: { inStory: true },
  parameters: {
    design: {
      type: "image",
      url: design,
      scale: 0.5,
    },
  },
};

export const M = generateStory([1440, 73]);
export const L = generateStory([1600, 73]);
export const XL = generateStory([1920, 73]);
export const S = generateStory([1024, 73]);
export const TabletLandscape = generateStory([400, 73]);
export const TabletPortrait = generateStory([300, 73]);

export const Mockup = {
  args: { width: 1920, height: 73 },
};
Mockup.parameters = {
  design: {
    type: "image",
    url: design,
    scale: 0.5,
  },
};
