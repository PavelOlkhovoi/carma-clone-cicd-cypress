import { withDesign } from "storybook-addon-designs";
import UserBar from "../../components/header/UserBar";
import designAR from "../assets/usage/UsageData.png";
import { generateStory } from "../_tools/StoryFactory";

export default {
  title: "User/UserBar",
  component: UserBar,
  decorators: [withDesign],
  parameters: {
    design: {
      type: "image",
      url: designAR,
      scale: 0.5,
    },
  },
};
export const Mockup = {};

export const M = generateStory([267, 155]);
export const L = generateStory([406, 233]);
export const XL = generateStory([566, 323]);
export const S = generateStory([246, 143]);
export const TabletLandscape = generateStory([182, 155]);
export const TabletPortrait = generateStory([118, 219]);
