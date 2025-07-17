import { withDesign } from "storybook-addon-designs";
import Comp from "../../components/commons/Chat";
import design from "../assets/overview/Map.png";
import { generateStory } from "../_tools/StoryFactory";

export default {
  title: "CommonComponents/Chat",
  component: Comp,
  decorators: [withDesign],
};

export const Mockup = {
  args: { width: 300, height: 400 },
};
Mockup.parameters = {
  design: {
    type: "image",
    url: design,
    scale: 0.5,
  },
};

export const M = generateStory([332, 400]);
export const L = generateStory([471, 600]);
export const XL = generateStory([631, 700]);
export const S = generateStory([311, 400]);
export const TabletLandscape = generateStory([400, 300]);
export const TabletPortrait = generateStory([300, 400]);
