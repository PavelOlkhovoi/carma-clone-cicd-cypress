import { withDesign } from "storybook-addon-designs";
import Comp from "../../components/info/InfoTable";
import design from "../assets/overview/Map.png";
import { generateStory } from "../_tools/StoryFactory";

export default {
  title: "Info/Components/Landparcels",
  component: Comp,
  decorators: [withDesign],
  args: {
    title: "Alkis Flurstücke",
    dataIn: [
      {
        title: "217362-28332/0(PRl)",
        status: "online",
      },
      {
        title: "317362-28332/0(PRl)",
        status: "online",
      },
      {
        title: "517362-28332/0(PRl)",
        status: "pending",
      },
      {
        title: "617362-28332/0(PRl)",
        status: "pending",
      },
      {
        title: "717362-28332/0(PRl)",
        status: "offline",
      },
    ],
  },
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
