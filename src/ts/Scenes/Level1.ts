import Utilities from "../Utilities";
import ResultPage from "./ResultPage";

const markWhite = (gameObject: Phaser.GameObjects.GameObject) => {
  gameObject.body.gameObject.setTint(0xffffff);
};

let lastOption: Phaser.GameObjects.GameObject;
const markOption = (gameObject: Phaser.GameObjects.GameObject) => {
  if (lastOption) {
    markWhite(lastOption);
  }
  gameObject.body.gameObject.setTint(0xb5ff00);
  lastOption = gameObject;
};

const markGreen = (gameObject: Phaser.GameObjects.GameObject) => {
  gameObject.body.gameObject.setTint(0x00ff75);
};

const markRed = (gameObject: Phaser.GameObjects.GameObject) => {
  gameObject.body.gameObject.setTint(0xff1212);
};

export default class Level1 extends Phaser.Scene {
  /**
   * Unique name of the scene.
   */
  score = 0;
  public static Name = "Level1";
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  objects: Phaser.GameObjects.Group;
  dishes: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  collisionObject: Phaser.GameObjects.GameObject;
  optionsDisplayed = false;
  currentContainer: Phaser.GameObjects.Container;
  bed: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  closet: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  dinner: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  door: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  sink: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  sofa: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  tv: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  washing_machine: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  tap: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  bathroom: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  person: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  points: number[];
  // step 1
  dishesContainer: Phaser.GameObjects.Container;
  washingMachineContainer: Phaser.GameObjects.Container;
  bathContainer: Phaser.GameObjects.Container;
  doneContainers: Phaser.GameObjects.Container[] = [];
  currentStopped: Phaser.GameObjects.GameObject;
  showerContainer: Phaser.GameObjects.Container;
  teethBrushContainer: Phaser.GameObjects.Container;
  tapContainer: Phaser.GameObjects.Container;

  public preload(): void {
    this.load.svg({
      key: "home",
      url: "../assets/scenes/home.svg",
      svgConfig: {
        scale: 1,
      },
    });
    this.load.spritesheet("player", "../assets/sprites/player2.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.image("dishes", "../assets/objects/dishes.png");
    this.load.image("bed", "../assets/objects/bed.png");
    this.load.image("closet", "../assets/objects/closet.png");
    this.load.image("dinner", "../assets/objects/dinner.png");
    this.load.image("door", "../assets/objects/door.png");
    this.load.image("sink", "../assets/objects/sink.png");
    this.load.image("sofa", "../assets/objects/sofa.png");
    this.load.image("tv", "../assets/objects/tv.png");
    this.load.image("washing_machine", "../assets/objects/washing_machine.png");
    this.load.image("tap", "../assets/objects/tap.png");
    this.load.image("bathroom", "../assets/objects/bathroom.png");
    this.load.image("person", "../assets/objects/person.png");
    this.load.image("wash-hand", "../assets/objects/wash-hand.png");
    this.load.image("dishwasher", "../assets/objects/dishwasher.png");
    // Step 2
    this.load.image("tap_close", "../assets/objects/tap_close.png");
    this.load.image("tap_open", "../assets/objects/tap_open.png");

    this.load.image("box-full", "../assets/objects/box-full.png");
    this.load.image("box-empty", "../assets/objects/box-empty.png");

    this.load.image("shower-head", "../assets/objects/shower_head.png");
    this.load.image("bathtub", "../assets/objects/bathtub.png");

    this.load.image("open-faucet", "../assets/objects/open_faucet.png");
    this.load.image("close-faucet", "../assets/objects/close_faucet.png");

    this.load.image("repair", "../assets/objects/repair.png");

    this.load.audio("afterRightChoice", "../assets/audio/afterRightChoice.mp3");
    this.load.audio("afterWrongChoice", "../assets/audio/afterWrongChoice.mp3");
  }

  public create(): void {
    Utilities.LogSceneMethodEntry("Level1", "create");

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("player", { start: 3, end: 5 }),
      repeat: -1,
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("player", { start: 6, end: 8 }),
      repeat: -1,
    });
    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("player", { start: 9, end: 11 }),
      repeat: -1,
    });
    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 2 }),
      repeat: -1,
    });

    const cameraMainWidth = this.cameras.main.width + 80;

    const home = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      "home"
    );

    const dishes = this.physics.add
      .sprite(cameraMainWidth - 140, this.cameras.main.centerY + 120, "dishes")
      .setPushable(false)
      .setBounce(0.2)
      .setCollideWorldBounds(true);

    const bed = this.physics.add
      .sprite(cameraMainWidth - 140, this.cameras.main.centerY - 90, "bed")
      .setPushable(false)
      .setBounce(0.2)
      .setCollideWorldBounds(true);

    const closet = this.physics.add
      .sprite(cameraMainWidth - 700, this.cameras.main.centerY - 120, "closet")
      .setPushable(false)
      .setBounce(0.2)
      .setCollideWorldBounds(true);

    const dinner = this.physics.add
      .sprite(cameraMainWidth - 300, this.cameras.main.centerY + 80, "dinner")
      .setPushable(false)
      .setBounce(0.2)
      .setCollideWorldBounds(true);

    const door = this.physics.add
      .sprite(0, this.cameras.main.centerY + 90, "door")
      .setPushable(false)
      .setBounce(0.2)
      .setCollideWorldBounds(true);

    const sink = this.physics.add
      .sprite(cameraMainWidth - 440, this.cameras.main.centerY + 35, "sink")
      .setPushable(false)
      .setBounce(0.2)
      .setCollideWorldBounds(true);

    const sofa = this.physics.add
      .sprite(cameraMainWidth - 520, this.cameras.main.centerY + 25, "sofa")
      .setScale(0.8)
      .setPushable(false)
      .setBounce(0.2)
      .setCollideWorldBounds(true);

    const tv = this.physics.add
      .sprite(cameraMainWidth - 520, this.cameras.main.centerY + 145, "tv")
      .setScale(0.6)
      .setPushable(false)
      .setBounce(0.2)
      .setCollideWorldBounds(true);

    const washing_machine = this.physics.add
      .sprite(
        cameraMainWidth - 500,
        this.cameras.main.centerY - 40,
        "washing_machine"
      )
      .setPushable(false)
      .setBounce(0.2)
      .setCollideWorldBounds(true);

    const tap = this.physics.add
      .sprite(cameraMainWidth - 770, this.cameras.main.centerY - 35, "tap")
      .setPushable(false)
      .setBounce(0.2)
      .setCollideWorldBounds(true);

    const bathroom = this.physics.add
      .sprite(
        cameraMainWidth - 620,
        this.cameras.main.centerY - 135,
        "bathroom"
      )
      .setPushable(false)
      .setBounce(0.2)
      .setCollideWorldBounds(true);

    const person = this.physics.add
      .sprite(cameraMainWidth - 380, this.cameras.main.centerY - 125, "person")
      .setPushable(false)
      .setBounce(0.2)
      .setCollideWorldBounds(true);

    // dish washer

    const washHands = this.physics.add.sprite(0, 0, "wash-hand");
    const dishwasher = this.physics.add.sprite(60, -2, "dishwasher");

    this.dishesContainer = this.add.container(dishes.x - 40, dishes.y - 60, [
      washHands,
      dishwasher,
    ]);
    this.dishesContainer.setVisible(false);

    const onDishesCollision = (
      moving: Phaser.GameObjects.GameObject,
      stopped: Phaser.GameObjects.GameObject
    ) => {
      this.showOptions(0, 17, this.dishesContainer, stopped);

      this.collisionObject = stopped;
    };

    //omer
    const showerHead = this.physics.add.sprite(0, 0, "shower-head");
    const bathtub = this.physics.add.sprite(60, 0, "bathtub");

    this.showerContainer = this.add.container(
      bathroom.x - 10,
      bathroom.y + 60,
      [showerHead, bathtub]
    );
    this.showerContainer.setVisible(false);

    const onShowerCollision = (
      moving: Phaser.GameObjects.GameObject,
      stopped: Phaser.GameObjects.GameObject
    ) => {
      this.showOptions(17, 0, this.showerContainer, stopped);

      this.collisionObject = stopped;
    };


    //

    const closeWater= this.physics.add.sprite(0, 0, "tap_close");
    const repair = this.physics.add.sprite(60, 0, "repair");

    this.tapContainer = this.add.container(
      bathroom.x - 165,
      bathroom.y + 50,
      [closeWater, repair]
    );
    this.tapContainer.setVisible(false);

    const onBrokenTap = (
      moving: Phaser.GameObjects.GameObject,
      stopped: Phaser.GameObjects.GameObject
    ) => {
      this.showOptions(0, 17, this.tapContainer, stopped);

      this.collisionObject = stopped;
    };

    //
    const openFaucet = this.physics.add.sprite(0, 0, "open-faucet");
    const closeFaucet = this.physics.add.sprite(60, 0, "close-faucet");

    this.teethBrushContainer = this.add.container(
      bathroom.x + 210,
      bathroom.y + 80,
      [openFaucet, closeFaucet]
    );
    this.teethBrushContainer.setVisible(false);

    const onBrushCollision = (
      moving: Phaser.GameObjects.GameObject,
      stopped: Phaser.GameObjects.GameObject
    ) => {
      this.showOptions(0, 17, this.teethBrushContainer, stopped);

      this.collisionObject = stopped;
    };

    const player = this.physics.add
      .sprite(
        this.cameras.main.centerX - 300,
        this.cameras.main.centerY + 130,
        "player",
        5
      )
      .setBounce(0.2)
      .setCollideWorldBounds(true);
    player.anims.play("right", true);

    // Step 3 end

    // tap start
    const tapOpen = this.physics.add.sprite(-200, 80, "tap_open");
    const tapClose = this.physics.add.sprite(-150, 80, "tap_close");

    this.bathContainer = this.add.container(sink.x + 180, sink.y - 150, [
      tapOpen,
      tapClose,
    ]);
    this.bathContainer.setVisible(false);

    const onBathCollision = (
      moving: Phaser.GameObjects.GameObject,
      stopped: Phaser.GameObjects.GameObject
    ) => {
      this.showOptions(17, 0, this.bathContainer, stopped);

      this.collisionObject = stopped;
    };
    // tap end

    // washing machine start
    const boxFull = this.physics.add.sprite(10, 0, "box-full");
    const boxEmpty = this.physics.add.sprite(70, 0, "box-empty");

    this.washingMachineContainer = this.add.container(
      washing_machine.x - 40,
      washing_machine.y - 70,
      [boxFull, boxEmpty]
    );
    this.washingMachineContainer.setVisible(false);

    const onWashineMachineCollision = (
      moving: Phaser.GameObjects.GameObject,
      stopped: Phaser.GameObjects.GameObject
    ) => {
      this.showOptions(17, 0, this.washingMachineContainer, stopped);

      this.collisionObject = stopped;
    };
    // washing machine end

    // Set up the player to collide with the tilemap layer. Alternatively, you can manually run
    // collisions in update via: this.physics.world.collide(player, layer).
    // this.physics.add.collider(player, layer);

    this.cameras.main.setBounds(0, 0, home.width, home.height);
    this.cameras.main.startFollow(player);
    const cursors = this.input.keyboard.createCursorKeys();

    // collisions
    this.physics.add.collider(player, dishes, onDishesCollision);
    this.physics.add.collider(player, bathroom, onShowerCollision);
    this.physics.add.collider(player, person, onBrushCollision);
    this.physics.add.collider(player, tap, onBrokenTap);
    this.physics.add.collider(player, bed);
    this.physics.add.collider(player, closet);
    this.physics.add.collider(player, dinner);
    // this.physics.add.collider(player, door);
    this.physics.add.collider(player, sink, onBathCollision);
    this.physics.add.collider(player, sofa);
    this.physics.add.collider(player, tv);
    this.physics.add.collider(
      player,
      washing_machine,
      onWashineMachineCollision
    );
    this.physics.add.collider(player, tap);
    this.physics.add.collider(player, bathroom);
    this.physics.add.collider(player, person);

    this.player = player;
    this.cursors = cursors;
  }

  // hide the options and add the score of the selected option
  hideContainer() {
    this.currentContainer.setVisible(false);
    this.currentContainer = null;
    if (this.doneContainers.length === 6) {
      this.scene.start(ResultPage.Name, { score: this.score });
    }
  }

  showOptions(
    point1: number,
    point2: number,
    currentContainer: Phaser.GameObjects.Container,
    stopped: Phaser.GameObjects.GameObject
  ) {
    if (this.doneContainers.includes(currentContainer)) return;
    this.doneContainers.push(currentContainer);
    this.points = [point1, point2];
    currentContainer.setVisible(true);
    this.currentContainer = currentContainer;
    this.currentStopped = stopped;
  }

  update(time: number, delta: number): void {
    this.player.body.setVelocity(0);

    if (this.currentContainer) {
      this.player.anims.stop();

      if (this.cursors.left.isDown) {
        markOption(this.currentContainer.first);
      } else if (this.cursors.right.isDown) {
        markOption(this.currentContainer.last);
      } else if (this.cursors.space.isDown) {
        if (!this.points) return;
        const [point1, point2] = this.points;
        let point = 0;
        if (lastOption === this.currentContainer.first) {
          point = point1;
          this.sound.play(
            point1 > point2 ? "afterRightChoice" : "afterWrongChoice"
          );
        } else if (lastOption === this.currentContainer.last) {
          point = point2;
          this.sound.play(
            point1 < point2 ? "afterRightChoice" : "afterWrongChoice"
          );
        }
        if (point > 0) {
          this.score += point;
          markGreen(this.currentStopped);
        } else {
          markRed(this.currentStopped);
        }
        this.points = undefined;
        this.hideContainer();
      }
      return;
    }
    // Horizontal movement
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-100);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(100);
    }

    // Vertical movement
    if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-100);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(100);
    }

    // Update the animation last and give left/right animations precedence over up/down animations
    if (this.cursors.left.isDown) {
      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player.anims.play("right", true);
    } else if (this.cursors.up.isDown) {
      this.player.anims.play("up", true);
    } else if (this.cursors.down.isDown) {
      this.player.anims.play("down", true);
    } else {
      this.player.anims.stop();
    }
  }
}
