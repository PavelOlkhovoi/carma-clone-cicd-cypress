import { withDesign } from "storybook-addon-designs";
import Comp from "../../components/seepagePermits/Exemption";
import design from "../assets/overview/Map.png";
import { generateStory } from "../_tools/StoryFactory";

export default {
  title: "SeepagePermits/Components/Exemption",
  component: Comp,
  decorators: [withDesign],
};

export const Mockup = {
  args: { width: 900, height: 400 },
};
Mockup.parameters = {
  design: {
    type: "image",
    url: design,
    scale: 0.5,
  },
};

export const M = generateStory([1366, 768 * 0.3]);
export const L = generateStory([1920, 1080 * 0.3]);
export const XL = generateStory([2560, 1440 * 0.3]);
export const S = generateStory([1280, 720 * 0.3]);
export const TabletLandscape = generateStory([1024, 768 * 0.3]);
export const TabletPortrait = generateStory([768, 1024 * 0.3]);
