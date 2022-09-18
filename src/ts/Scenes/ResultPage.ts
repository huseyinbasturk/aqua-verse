import Utilities from "../Utilities";
import Level1 from "./Level1";
import MainMenu from "./MainMenu";

export default class ResultPage extends Phaser.Scene {
  enterKey: Phaser.Input.Keyboard.Key;
  /**
   * Unique name of the scene.
   */
  public static Name = "ResultPage";

  public preload(): void {
    this.load.image("lake_1", "../assets/tilemaps/tiles/lake_1.jpg");
    this.load.image("lake_2", "../assets/tilemaps/tiles/lake_2.jpg");
    this.load.image("lake_3", "../assets/tilemaps/tiles/lake_3.jpg");
    this.load.audio("middleLevel", "../assets/audio/middleLevel.wav");
    this.load.audio("topLevel", "../assets/audio/topLevel.mp3");
    this.load.audio("worstLevel", "../assets/audio/worstLevel.wav");
  }

  public init(data: any) {
    this.data.values = data.score;
  }

  public create(): void {
    Utilities.LogSceneMethodEntry("ResultPage", "create");
    this.enterKey = this.input.keyboard.addKey("ENTER");
    const textYPosition = this.cameras.main.height / 3;

    const centerX = this.cameras.main.centerX;
    const imageY = 250;

    // this.add
    //   .text(centerX, textYPosition, '"Save Water, Save Nature!"')
    //   .setFontFamily("monospace")
    //   .setFontSize(40)
    //   .setFill("#fff")
    //   .setPosition(380, 60, 0, 0)
    //   .setOrigin(0.5);

    if (Number(this.data.values) > 70) {
      const lake3 = this.add.image(centerX, imageY, "lake_3");
      this.sound.play("topLevel");
      this.add
        .text(centerX, textYPosition, '"You did a great job!"')
        .setFontFamily("monospace")
        .setFontSize(30)
        .setFill("#fff")
        .setPosition(380, 60, 0, 0)
        .setOrigin(0.5);
    }

    if (Number(this.data.values) > 40 && Number(this.data.values) <= 70) {
      const lake2 = this.add.image(centerX, imageY, "lake_2");
      this.sound.play("middleLevel");
      this.add
        .text(centerX, textYPosition, '"You can do better!"')
        .setFontFamily("monospace")
        .setFontSize(30)
        .setFill("#fff")
        .setPosition(380, 60, 0, 0)
        .setOrigin(0.5);
    }

    if (Number(this.data.values) >= 0 && Number(this.data.values) <= 40) {
      const lake1 = this.add.image(centerX, imageY, "lake_1");
      this.sound.play("worstLevel");
      this.add
        .text(centerX, textYPosition, '"Oops... The nature needs water!"')
        .setFontFamily("monospace")
        .setFontSize(30)
        .setFill("#fff")
        .setPosition(380, 60, 0, 0)
        .setOrigin(0.5);
    }
    // const level2Image = this.add.image(590, 230, "lock");
  }

  public update(): void {
    if (this.enterKey.isDown) {
      this.scene.start(MainMenu.Name);
    }
  }
}
