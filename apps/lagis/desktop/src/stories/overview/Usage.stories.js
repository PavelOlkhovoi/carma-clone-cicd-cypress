import { withDesign } from "storybook-addon-designs";
import Usage from "../../components/overview/Usage";
import designUsage from "../assets/overview/Usage.png";
import { generateStory } from "../_tools/StoryFactory";

export default {
  title: "Overview/Components/Usage",
  component: Usage,
  decorators: [withDesign],
  parameters: {
    design: {
      type: "image",
      url: designUsage,
      scale: 0.5,
    },
  },
};
export const Mockup = {};

export const M = generateStory([232, 192]);
export const L = generateStory([220, 192]);
export const XL = generateStory([420, 322]);
export const S = generateStory([250, 220]);
export const TabletLandscape = generateStory([200, 190]);
export const TabletPortrait = generateStory([200, 190]);
