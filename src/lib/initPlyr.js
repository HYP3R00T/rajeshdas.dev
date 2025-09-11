import { settings } from "astro/runtime/client/dev-toolbar/settings.js";
import Plyr from "plyr";

export default () => {
  document.addEventListener("astro:page-load", () => {
    const players = Plyr.setup("#player", {
      controls: [
        "play",
        "progress",
        "current-time",
        "mute",
        "volume",
        "settings",
        "fullscreen",
      ],
      settings: ["captions", "quality", "speed", "loop"],
      keyboard: { focused: true },
      autoplay: false,
      ratio: "16:9",
      clickToPlay: true,
      invertTime: false,
      tooltips: { controls: true, seek: true },
    });

    return players;
  });
};
