import { withDesign } from "storybook-addon-designs";
import Notes from "../../components/offices/Notes";
import designNotes from "../assets/offices/OfficesNotes.png";
import { generateStory } from "../_tools/StoryFactory";

export default {
  title: "Offices/Components/Notes",
  component: Notes,
  decorators: [withDesign],
  parameters: {
    design: {
      type: "image",
      url: designNotes,
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
