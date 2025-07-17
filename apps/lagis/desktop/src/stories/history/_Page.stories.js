import { withDesign } from "storybook-addon-designs";
import HistoryPage from "../../pages/HistoryPage";
import design from "../assets/history/_Page.png";
import { RESOLUTIONS, generatePageStory } from "../_tools/StoryFactory";
export default {
  title: "History/Page",
  component: HistoryPage,
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
