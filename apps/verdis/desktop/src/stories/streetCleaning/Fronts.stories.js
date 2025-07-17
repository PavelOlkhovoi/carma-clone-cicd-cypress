import { withDesign } from "storybook-addon-designs";
import Comp from "../../components/streetCleaning/Fronts";
import design from "../assets/overview/Map.png";
import { generateStory } from "../_tools/StoryFactory";

export default {
  title: "StreetCleaning/Components/Fronts",
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

export const M = generateStory([332, 316]);
export const L = generateStory([471, 472]);
export const XL = generateStory([631, 652]);
export const S = generateStory([309, 292]);
export const TabletLandscape = generateStory([247, 316]);
export const TabletPortrait = generateStory([183, 444]);
