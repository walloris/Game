var BASEPATH = 'Content/';
var DIV = '<div />';
var CLS_FIGURE = 'figure';
var CLS_MATTER = 'matter';

var directions = {
    none: 0,
    left: 1,
    up: 2,
    right: 3,
};
var Player_states = {
    normal: 0
};
var size_states = {
    normal: 1,
    big: 2,
};
var ground_blocking = {
    none: 0,
    left: 1,
    top: 2,
    right: 4,
    bottom: 8,
    all: 15,
};
var collision_type = {
    none: 0,
    horizontal: 1,
    vertical: 2,
};
var death_modes = {
    normal: 0
};
var images = {
    enemies: BASEPATH + 'final-enemies-sprites.png',
    sprites: BASEPATH + 'spritesWithAr.png',
    objects: BASEPATH + 'playerSprites.png'
};
var arrowTilesX = {
    oneArrow: 160,
    twoArrows: 0,
    threeArrows: 0,
    fourArrows: 175,
};

var arrowTilesY = {
    oneArrow: 320,
    twoArrows: 341,
    threeArrows: 420,
    fourArrows: 417,
};

var missleTypes = {
    oneArrow: 1,
    twoArrows: 2,
    threeArrows: 3,
    fourArrows: 4,
    magicShard: 5
};
var constants = {
    heroPosition: 0,
    heroX: 0,
    interval: 20,
    bounce: 15,
    goblinHealth: 100,
    ogrHealth: 250,
    trollHealth: 350,
    cooldown: 20,
    gravity: 2,
    start_lives: 100,
    start_mana: 100,
    max_width: 400,
    max_height: 15,
    jumping_v: 27,
    walking_v: 5,
    monster_v: 2,
    bullet_v: 12
};

var c2u = function (s) {
    return 'url(' + s + ')';
};
var q2q = function (figure, opponent) {
    if (figure.x > opponent.x + 16)
        return false;
    else if (figure.x + 16 < opponent.x)
        return false;
    else if (figure.y + figure.state * 64 - 8 < opponent.y)
        return false;
    else if (figure.y + 16 > opponent.y + opponent.state * 64)
        return false;

    return true;
};
Math.sign = function (x) {
    if (x > 0)
        return 1;
    else if (x < 0)
        return -1;

    return 0;
};