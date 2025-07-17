import { withDesign } from "storybook-addon-designs";
import RightsLayout from "../../pages/layout/RightsLayout";
import design from "../assets/App.png";
import { RESOLUTIONS, generateStory } from "../_tools/StoryFactory";

export default {
  title: "App/Rights",
  component: RightsLayout,
  decorators: [withDesign],
  args: { inStory: true },
  parameters: {
    design: {
      type: "image",
      url: design,
      scale: 0.5,
    },
  },
};

export const M = generateStory(RESOLUTIONS.MediumDesktop);
export const L = generateStory(RESOLUTIONS.LargeDesktop);
export const XL = generateStory(RESOLUTIONS.ExtraLargeDesktop);
export const S = generateStory(RESOLUTIONS.SmallDesktop);
export const TabletLandscape = generateStory(RESOLUTIONS.TabletLandscape);
export const TabletPortrait = generateStory(RESOLUTIONS.TabletPortrait);
