import { withDesign } from "storybook-addon-designs";
import OptionHistory from "../../components/history/OptionHistory";
import designAR from "../assets/history/Options.png";
import { generateStory } from "../_tools/StoryFactory";

export default {
  title: "History/Components/Option",
  component: OptionHistory,
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
