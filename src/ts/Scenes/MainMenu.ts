import Utilities from "../Utilities";
import Level1 from "./Level1";

export default class MainMenu extends Phaser.Scene {
  /**
   * Unique name of the scene.
   */
  public static Name = "MainMenu";
  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  enterKey: Phaser.Input.Keyboard.Key;

  public preload(): void {
    this.load.image("play", "../assets/tilemaps/tiles/play.png");
    this.load.image("lock", "../assets/tilemaps/tiles/lock.png");
    this.load.image("child", "../assets/objects/child.png");
  }

  public create(): void {
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.enterKey = this.input.keyboard.addKey("ENTER");

    Utilities.LogSceneMethodEntry("MainMenu", "create");
    const textYPosition = this.cameras.main.height / 3;

    const message = this.add.text(
      this.cameras.main.centerX,
      textYPosition,
      '"Save Water, Save Nature!"'
    );

    message
      .setFontFamily("monospace")
      .setFontSize(30)
      .setFill("#fff")
      .setPosition(480, 60, 0, 0)
      .setOrigin(0.5);

    const child = this.add.image(150, 180, "child");

    const level1 = this.add.text(
      this.cameras.main.centerX,
      textYPosition,
      "Level-1"
    );
    level1
      .setFontFamily("monospace")
      .setFontSize(20)
      .setFill("#000")
      .setBackgroundColor("#fff")
      .setAlign("center")
      .setPadding(10, 10, 10, 60)
      .setPosition(380, 250, 300, 300)
      .setOrigin(0.5);

    const level1Image = this.add.image(380, 265, "play");

    const level2 = this.add.text(
      this.cameras.main.centerX,
      textYPosition,
      "Level-2"
    );
    level2
      .setFontFamily("monospace")
      .setFontSize(20)
      .setFill("#000")
      .setBackgroundColor("#4EB04C")
      .setAlign("center")
      .setPadding(10, 10, 10, 60)
      .setPosition(590, 250, 300, 300)
      .setOrigin(0.5);

    const level2Image = this.add.image(595, 268, "lock");

    const level3 = this.add.text(
      this.cameras.main.centerX,
      textYPosition,
      "Level-3"
    );
    level3
      .setFontFamily("monospace")
      .setFontSize(20)
      .setFill("#000")
      .setBackgroundColor("#4EB04C")
      .setAlign("center")
      .setPadding(10, 10, 10, 60)
      .setPosition(380, 360, 300, 300)
      .setOrigin(0.5);

    const level3Image = this.add.image(385, 380, "lock");

    const level4 = this.add.text(
      this.cameras.main.centerX,
      textYPosition,
      "Level-4"
    );
    level4
      .setFontFamily("monospace")
      .setFontSize(20)
      .setFill("#000")
      .setBackgroundColor("#4EB04C")
      .setAlign("center")
      .setPadding(10, 10, 10, 60)
      .setPosition(590, 360, 300, 300)
      .setOrigin(0.5);

    const level4Image = this.add.image(595, 380, "lock");

    const menuItems = this.add.container(0, -100, [
      level1,
      level1Image,
      level2,
      level2Image,
      level3,
      level3Image,
      level4,
      level4Image,
    ]);

    // const settingsText = this.add.text(
    //   this.cameras.main.centerX,
    //   textYPosition * 2,
    //   "Settings"
    // );
    // settingsText.setOrigin(0.5);
    // settingsText.setFontFamily("monospace").setFontSize(30).setFill("#fff");
    // settingsText.setInteractive();
    // settingsText.on(
    //   "pointerdown",
    //   () => {
    //     this.scene.start(MainSettings.Name);
    //   },
    //   this
    // );
  }

  public update(): void {
    if (this.enterKey.isDown) {
      this.scene.start(Level1.Name);
    }
  }
}
