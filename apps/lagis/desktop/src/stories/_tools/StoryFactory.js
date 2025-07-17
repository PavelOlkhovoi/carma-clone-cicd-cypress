export const RESOLUTIONS = {
  MediumDesktop: [1366, 768],
  ExtraLargeDesktop: [2560, 1440],
  LargeDesktop: [1920, 1080],
  SmallDesktop: [1280, 720],
  TabletLandscape: [1024, 768],
  TabletPortrait: [768, 1024],
};

const menuWidth = 260;
const footerHeight = 42;
const toolbarHeight = 70;
export const UI_SIZES = {
  menuWidth,
  footerHeight,
  toolbarHeight,
};

export const generatePageStory = (size, moreArgs, moreParams) => {
  const width = size[0];
  const height = size[1];
  return {
    args: {
      width: width - UI_SIZES.menuWidth,
      height: height - UI_SIZES.footerHeight - UI_SIZES.toolbarHeight,
      ...moreArgs,
    },

    parameters: {
      ...moreParams,
    },
  };
};

export const generateStory = (size, moreArgs, moreParams) => {
  const width = size[0];
  const height = size[1];
  return {
    args: {
      width: width,
      height: height,
      ...moreArgs,
    },

    parameters: {
      ...moreParams,
    },
  };
};
