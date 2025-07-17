import { withDesign } from "storybook-addon-designs";
import Comp from "../../components/sealedSurfaces/Sums";
import design from "../assets/overview/Map.png";
import { generateStory } from "../_tools/StoryFactory";

export default {
  title: "SealedSurfaces/Components/Sums",
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

export const M = generateStory([332, 184]);
export const L = generateStory([471, 278]);
export const XL = generateStory([631, 386]);
export const S = generateStory([311, 170]);
export const TabletLandscape = generateStory([247, 184]);
export const TabletPortrait = generateStory([183, 261]);
