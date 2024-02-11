export const MOVES_UPDATE_INTERVAL = 50;
export const UNITS_UPDATE_INTERVAL = 1000;
export const BOTS_UPDATE_INTERVAL = 5000;
export const MONEY_UPDATE_INTERVAL = 1000;

export const NO_PLAYER_COLOR = "#000000";

export const COLORS = [
    "#f44336", 
    "#9c27b0", 
    "#03a9f4", 
    "#4caf50", 
    "#ffeb3b", 
    "#ff9800", 
    "#607d8b"
]

export const AVATARS = [
    process.env.PUBLIC_URL + "/Avatar1.png",
    process.env.PUBLIC_URL + "/Avatar2.png",
    process.env.PUBLIC_URL + "/Avatar3.png",
    process.env.PUBLIC_URL + "/Avatar4.png",
    process.env.PUBLIC_URL + "/Avatar5.png",
    process.env.PUBLIC_URL + "/Avatar6.png"
]

export const DEFAULT_PLAYER_NAME = "Player";
export const DEFAULT_PLAYER_COLOR = COLORS[0];
export const DEFAULT_PLAYER_INITIAL_COUNTRY = "Spain";
export const DEFAULT_PLAYER_AVATAR = AVATARS[0];

export const NUMBER_OF_BOTS = 3;

export const DIFFICULTY_LEVELS = [
    { level: 1, name:"Easy" },
    { level: 2, name:"Normal" },
    { level: 3, name:"Hard" },
];

export const HOUSE_LEVELS = [
    {
        level: 0,
        description: "Increases the max number of units that a region can have.",
        maxUnits: 200,
        price: 0
    },
    {
        level: 1,
        description: "Increases the max number of units that a region can have.",
        maxUnits: 300,
        price: 10
    },
    {
        level: 2,
        description: "Increases the max number of units that a region can have.",
        maxUnits: 400,
        price: 20
    },
    {
        level: 3,
        description: "Increases the max number of units that a region can have.",
        maxUnits: 500,
        price: 30
    },
    {
        level: 4,
        description: "Increases the max number of units that a region can have.",
        maxUnits: 500,
        price: 40
    }
]

export const BANK_LEVELS = [
    {
        level: 0,
        description: "Increases the ammount of money a region geretates.",
        moneyPerUpdate: 1,
        price: 0
    },
    {
        level: 1,
        description: "Increases the ammount of money a region geretates.",
        moneyPerUpdate: 2,
        price: 10
    },
    {
        level: 2,
        description: "Increases the ammount of money a region geretates.",
        moneyPerUpdate: 3,
        price: 20
    },
    {
        level: 3,
        description: "Increases the ammount of money a region geretates.",
        moneyPerUpdate: 4,
        price: 30
    },
    {
        level: 4,
        description: "Increases the ammount of money a region geretates.",
        moneyPerUpdate: 5,
        price: 40
    }
]

export const MOVE_LEVELS = [
    {
        level: 0,
        description: "Increases the velocity of moves.",
        kmPerUpdate: 1,
        price: 0
    },
    {
        level: 1,
        description: "Increases the velocity of moves.",
        kmPerUpdate: 10,
        price: 10
    },
    {
        level: 2,
        description: "Increases the velocity of moves.",
        kmPerUpdate: 20,
        price: 20
    },
    {
        level: 3,
        description: "Increases the velocity of moves.",
        kmPerUpdate: 30,
        price: 30
    },
    {
        level: 4,
        description: "Increases the velocity of moves.",
        kmPerUpdate: 40,
        price: 40
    }
]
