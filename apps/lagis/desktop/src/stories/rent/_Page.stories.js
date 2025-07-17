import { withDesign } from "storybook-addon-designs";
import Rent from "../../pages/RentAndLease";
import design from "../assets/rentandlease/_Page.png";
import { RESOLUTIONS, generatePageStory } from "../_tools/StoryFactory";

export default {
  title: "Rent&Lease/Page",
  component: Rent,
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

export const M = generatePageStory(RESOLUTIONS.MediumDesktop);
export const L = generatePageStory(RESOLUTIONS.LargeDesktop);
export const XL = generatePageStory(RESOLUTIONS.ExtraLargeDesktop);
export const S = generatePageStory(RESOLUTIONS.SmallDesktop);
export const TabletLandscape = generatePageStory(RESOLUTIONS.TabletLandscape);
export const TabletPortrait = generatePageStory(RESOLUTIONS.TabletPortrait);
