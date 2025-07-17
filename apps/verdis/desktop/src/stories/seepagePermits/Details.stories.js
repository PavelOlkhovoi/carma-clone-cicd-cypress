import { withDesign } from "storybook-addon-designs";
import Comp from "../../components/seepagePermits/Details";
import design from "../assets/overview/Map.png";
import { generateStory } from "../_tools/StoryFactory";

export default {
  title: "SeepagePermits/Components/Details",
  component: Comp,
  decorators: [withDesign],
};

export const Mockup = {
  args: { width: 400, height: 600 },
};
Mockup.parameters = {
  design: {
    type: "image",
    url: design,
    scale: 0.5,
  },
};

export const M = generateStory([1366 * 0.5, 768 * 0.6]);
export const L = generateStory([1920 * 0.5, 1080 * 0.6]);
export const XL = generateStory([2560 * 0.5, 1440 * 0.6]);
export const S = generateStory([1280 * 0.5, 720 * 0.6]);
export const TabletLandscape = generateStory([1024 * 0.5, 768 * 0.6]);
export const TabletPortrait = generateStory([768 * 0.5, 1024 * 0.6]);
