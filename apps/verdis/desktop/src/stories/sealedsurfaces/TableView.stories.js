import { withDesign } from "storybook-addon-designs";
import Comp from "../../components/sealedSurfaces/TableView";
import design from "../assets/overview/Map.png";
import { generateStory } from "../_tools/StoryFactory";

export default {
  title: "SealedSurfaces/Components/TableView",
  component: Comp,
  decorators: [withDesign],
};

export const Mockup = {
  args: { width: 1024, height: 550 },
};
Mockup.parameters = {
  design: {
    type: "image",
    url: design,
    scale: 0.5,
  },
};

export const M = generateStory([720, 400]);
export const L = generateStory([800, 450]);
export const XL = generateStory([960, 500]);
export const S = generateStory([512, 400]);
export const TabletLandscape = generateStory([200, 184]);
export const TabletPortrait = generateStory([150, 261]);
