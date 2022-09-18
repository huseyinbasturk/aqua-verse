import "phaser";
import Level1 from "./Scenes/Level1";
import Preloader from "./Scenes/Preloader";
import MainMenu from "./Scenes/MainMenu";
import SplashScreen from "./Scenes/SplashScreen";
import Utilities from "./Utilities";
import MainGame from "./Scenes/MainGame";
import MainSettings from "./Scenes/MainSettings";
import ResultPage from "./Scenes/ResultPage";

const gameConfig: Phaser.Types.Core.GameConfig = {
  width: 741,
  height: 342,
  type: Phaser.WEBGL,
  backgroundColor: "#4488aa",
  audio: {
    disableWebAudio: false,
    noAudio: false,
  },
  parent: "content",
  title:
    "Starter Project for Phaser 3 with Visual Studio Code, TypeScript, and NodeJS",
  physics: {
    default: "arcade",
  },
};

export default class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    Utilities.LogSceneMethodEntry("Game", "constructor");

    super(config);

    this.scene.add(Level1.Name, Level1);
    this.scene.add(Preloader.Name, Preloader);
    this.scene.add(SplashScreen.Name, SplashScreen);
    this.scene.add(ResultPage.Name, ResultPage);
    this.scene.add(MainMenu.Name, MainMenu);
    this.scene.add(MainGame.Name, MainGame);
    this.scene.add(MainSettings.Name, MainSettings);
    this.scene.start(MainMenu.Name);
    // this.scene.start(ResultPage.Name, { score: 30 });
    // this.scene.start(Level1.Name);
    //this.scene.start(MainMenu.Name);
  }
}

/**
 * Workaround for inability to scale in Phaser 3.
 * From http://www.emanueleferonato.com/2018/02/16/how-to-scale-your-html5-games-if-your-framework-does-not-feature-a-scale-manager-or-if-you-do-not-use-any-framework/
 */
function resize(): void {
  const canvas = document.querySelector("canvas");
  const width = window.innerWidth;
  const height = window.innerHeight;
  const wratio = width / height;
  const ratio = Number(gameConfig.width) / Number(gameConfig.height);
  if (wratio < ratio) {
    canvas.style.width = width + "px";
    canvas.style.height = width / ratio + "px";
  } else {
    canvas.style.width = height * ratio + "px";
    canvas.style.height = height + "px";
  }
}

window.onload = (): void => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const game = new Game(gameConfig);
  // Uncomment the following two lines if you want the game to scale to fill the entire page, but keep the game ratio.
  //resize();
  //window.addEventListener("resize", resize, true);
};
