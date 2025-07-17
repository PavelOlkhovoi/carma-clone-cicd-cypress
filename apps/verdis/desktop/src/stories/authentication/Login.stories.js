import { withDesign } from "storybook-addon-designs";
import Comp from "../../components/authentication/Login";
import design from "../assets/overview/Map.png";
import { generateStory } from "../_tools/StoryFactory";

export default {
  title: "Authentication/Components/Login",
  component: Comp,
  decorators: [withDesign],
};

export const Mockup = {
  args: { width: 300, height: 200 },
};
Mockup.parameters = {
  design: {
    type: "image",
    url: design,
    scale: 0.5,
  },
};

export const M = generateStory([332, 131]);
export const L = generateStory([471, 193]);
export const XL = generateStory([631, 265]);
export const S = generateStory([311, 121]);
export const TabletLandscape = generateStory([247, 131]);
export const TabletPortrait = generateStory([183, 182]);
