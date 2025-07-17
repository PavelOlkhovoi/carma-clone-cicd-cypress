import { withDesign } from "storybook-addon-designs";
import LoginPage from "../../components/login/LoginPage";
import design from "../assets/LoginPage.png";
import { RESOLUTIONS, generatePageStory } from "../_tools/StoryFactory";

export default {
  title: "Login/Page",
  component: LoginPage,
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
