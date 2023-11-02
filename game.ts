class Room {
    name: string;
    description: string;
    exits: { [key: string]: Room };
  
    constructor(name: string, description: string) {
      this.name = name;
      this.description = description;
      this.exits = {};
    }
  
    addExit(direction: string, room: Room): void {
      this.exits[direction] = room;
    }
  }
  
  class Player {
    currentRoom: Room;
  
    constructor(startingRoom: Room) {
      this.currentRoom = startingRoom;
    }
  
    move(direction: string): void {
      const nextRoom = this.currentRoom.exits[direction];
      if (nextRoom) {
        this.currentRoom = nextRoom;
        console.log(`You are in the ${this.currentRoom.name}. ${this.currentRoom.description}`);
      } else {
        console.log("You can't go that way.");
      }
    }
  }
  
  // Create rooms
  const kitchen = new Room("Kitchen", "It's a messy kitchen with an exit to the north.");
  const livingRoom = new Room("Living Room", "A cozy living room with an exit to the south.");
  const bedroom = new Room("Bedroom", "You're in the bedroom. An exit is to the west.");
  const garden = new Room("Garden", "A beautiful garden with an exit to the east.");
  
  // Connect rooms
  kitchen.addExit("north", livingRoom);
  livingRoom.addExit("south", kitchen);
  livingRoom.addExit("west", bedroom);
  bedroom.addExit("east", livingRoom);
  livingRoom.addExit("east", garden);
  garden.addExit("west", livingRoom);
  
  // Create a player
  const startingRoom = livingRoom;
  const player = new Player(startingRoom);
  
  console.log("Welcome to the Adventure Game!");
  console.log(`You are in the ${player.currentRoom.name}. ${player.currentRoom.description}`);
  
  // Game loop
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  rl.setPrompt(">> ");
  rl.prompt();
  
  rl.on("line", (input: string) => {
    const direction = input.trim().toLowerCase();
    if (direction === "quit" || direction === "exit") {
      console.log("Thanks for playing! Goodbye.");
      rl.close();
    } else if (direction === "look") {
      console.log(player.currentRoom.description);
    } else if (player.currentRoom.exits[direction]) {
      player.move(direction);
    } else {
      console.log("You can't go that way.");
    }
    rl.prompt();
  });
  
  rl.on("close", () => {
    process.exit(0);
  });