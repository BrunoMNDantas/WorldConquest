export const ATTACKS_UPDATE_INTERVAL = 100;
export const UNITS_UPDATE_INTERVAL = 1000;
export const BOTS_UPDATE_INTERVAL = 5000;

export const MIN_INITIAL_UNITS = 10;
export const MAX_INITIAL_UNITS = 100;
export const MAX_UNITS = 200;

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
