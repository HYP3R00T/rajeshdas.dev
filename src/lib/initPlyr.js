import Plyr from "plyr";

export default () => {
  const player = new Plyr("#player", {});
  window.player = player;
};
