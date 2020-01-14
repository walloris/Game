
var Base = Class.extend({
    init: function (x, y) {
        this.setPosition(x || 0, y || 0);
        this.clearFrames();
        this.frameCount = 0;
    },
    setPosition: function (x, y) {
        this.x = x;
        this.y = y;
    },
    getPosition: function () {
        return {x: this.x, y: this.y};
    },
    setImage: function (img, x, y) {
        this.image = {
            path: img,
            x: x,
            y: y
        };
    },
    setSize: function (width, height) {
        this.width = width;
        this.height = height;
    },
    getSize: function () {
        return {width: this.width, height: this.height};
    },
    setupFrames: function (fps, frames, rewind, id) {
        if (id) {
            if (this.frameID === id)
                return true;

            this.frameID = id;
        }

        this.currentFrame = 0;
        this.frameTick = frames ? (1000 / fps / constants.interval) : 0;
        this.frames = frames;
        this.rewindFrames = rewind;
        return false;
    },
    clearFrames: function () {
        this.frameID = undefined;
        this.frames = 0;
        this.currentFrame = 0;
        this.frameTick = 0;
    },
    playFrame: function () {
        if (this.frameTick && this.view) {
            this.frameCount++;

            if (this.frameCount >= this.frameTick) {
                this.frameCount = 0;

                if (this.currentFrame === this.frames)
                    this.currentFrame = 0;

                var $el = this.view;
                $el.css('background-position', '-' + (this.image.x + this.width * ((this.rewindFrames ? this.frames - 1 : 0) - this.currentFrame)) + 'px -' + this.image.y + 'px');
                this.currentFrame++;
            }
        }
    },
});


var Gauge = Base.extend({
    init: function (id, startImgX, startImgY, fps, frames, rewind) {
        this._super(0, 0);
        this.view = $('#' + id);
        this.setSize(this.view.width(), this.view.height());
        this.setImage(this.view.css('background-image'), startImgX, startImgY);
        this.setupFrames(fps, frames, rewind);
    },
});


var Level = Base.extend({
    init: function (id) {
        this.world = $('#' + id);
        this.nextCycles = 0;
        this._super(0, 0);
        this.active = false;
        this.figures = [];
        this.obstacles = [];
        this.decorations = [];
        this.items = [];
        this.manaGauge = new Gauge('mana', 0, 0, 10, 4, true);
        this.liveGauge = new Gauge('live', 0, 430, 6, 6, true);

    },
    reload: function () {
        var settings = {};
        this.pause();

        for (var i = this.figures.length; i--;) {
            if (this.figures[i] instanceof Player) {
                settings.lifes = this.figures[i].lifes - 1;
                settings.manas = this.figures[i].manas;
                break;
            }
        }

        this.reset();

        if (settings.lifes < 0) {
            this.load(definedLevels[0]);
        } else {
            this.load(this.raw);

            for (var i = this.figures.length; i--;) {
                if (this.figures[i] instanceof Player) {
                    this.figures[i].setLifes(settings.lifes || 0);
                    this.figures[i].setmanas(settings.manas || 0);
                    break;
                }
            }
        }

        this.start();
    },
    load: function (level) {
        if (this.active) {
            if (this.loop)
                this.pause();

            this.reset();
        }

        this.setPosition(0, 0);
        this.setSize(level.width * 32, level.height * 32);
        this.setImage(level.background);
        this.raw = level;
        this.id = level.id;
        this.active = true;
        var data = level.data;

        for (var i = 0; i < level.width; i++) {
            var t = [];

            for (var j = 0; j < level.height; j++) {
                t.push('');
            }

            this.obstacles.push(t);
        }

        for (var i = 0, width = data.length; i < width; i++) {
            var col = data[i];

            for (var j = 0, height = col.length; j < height; j++) {
                if (reflection[col[j]])
                    new (reflection[col[j]])(i * 32, (height - j - 1) * 32, this);
            }
        }
    },
    next: function () {
        this.nextCycles = Math.floor(7000 / constants.interval);
    },
    nextLoad: function () {
        if (this.nextCycles)
            return;

        var settings = {};
        this.pause();

        for (var i = this.figures.length; i--;) {
            if (this.figures[i] instanceof Player) {
                settings.lifes = this.figures[i].lifes;
                settings.manas = this.figures[i].manas;
                settings.state = this.figures[i].state;
                settings.PlayerState = this.figures[i].PlayerState;
                break;
            }
        }

        this.reset();
        this.load(definedLevels[this.id + 1]);

        for (var i = this.figures.length; i--;) {
            if (this.figures[i] instanceof Player) {
                this.figures[i].setLifes(settings.lifes || 0);
                this.figures[i].setmanas(settings.manas || 0);
                this.figures[i].setState(settings.state || size_states.normal);
                this.figures[i].setPlayerState(settings.PlayerState || Player_states.normal);
                break;
            }
        }

        this.start();
    },
    getGridWidth: function () {
        return this.raw.width;
    },
    getGridHeight: function () {
        return this.raw.height;
    },
    reset: function () {
        this.active = false;
        this.world.empty();
        this.figures = [];
        this.obstacles = [];
        this.items = [];
        this.decorations = [];
    },
    tick: function () {
        if (this.nextCycles) {
            this.nextCycles--;
            this.nextLoad();
            return;
        }

        var i = 0, j = 0, figure, opponent;

        for (i = this.figures.length; i--;) {
            figure = this.figures[i];

            if (figure.dead) {
                if (!figure.death()) {
                    if (figure instanceof Player)
                        return this.reload();

                    figure.view.remove();
                    this.figures.splice(i, 1);
                } else
                    figure.playFrame();
            } else {
                if (i) {
                    for (j = i; j--;) {
                        if (figure.dead)
                            break;

                        opponent = this.figures[j];

                        if (!opponent.dead && q2q(figure, opponent)) {
                            figure.hit(opponent);
                            opponent.hit(figure);
                        }
                    }
                }
            }

            if (!figure.dead) {
                figure.move();
                figure.playFrame();
            }
        }

        for (i = this.items.length; i--;)
            this.items[i].playFrame();

        this.manaGauge.playFrame();
        this.liveGauge.playFrame();
        this.timerGauge.playFrame();
    },
    start: function () {
        var me = this;
        me.loop = setInterval(function () {
            me.tick.apply(me);
        }, constants.interval);
    },
    pause: function () {
        clearInterval(this.loop);
        this.loop = undefined;
    },
    setPosition: function (x, y) {
        this._super(x, y);
        this.world.css('left', -x);
    },
    setImage: function (index) {
        var img = BASEPATH + 'backgrounds/' + ((index < 10 ? '0' : '') + index) + '.png';
        this.world.parent().css({
            backgroundImage: c2u(img),
            backgroundPosition: '0 -380px'
        });
        this._super(img, 0, 0);
    },
    setSize: function (width, height) {
        this._super(width, height);
    },
    setParallax: function (x) {
        this.setPosition(x, this.y);
        this.world.parent().css('background-position', '-' + Math.floor(x / 3) + 'px -380px');
    },
});


var Figure = Base.extend({
    init: function (x, y, level) {
        this.view = $(DIV).addClass(CLS_FIGURE).appendTo(level.world);
        this.dx = 0;
        this.dy = 0;
        this.dead = false;
        this.onground = true;
        this.setState(size_states.normal);
        this.setVelocity(0, 0);
        this.direction = directions.none;
        this.level = level;
        this._super(x, y);
        level.figures.push(this);
    },
    setState: function (state) {
        this.state = state;
    },
    setImage: function (img, x, y) {
        this.view.css({
            backgroundImage: img ? c2u(img) : 'none',
            backgroundPosition: '-' + (x || 0) + 'px -' + (y || 0) + 'px',
        });
        this._super(img, x, y);
    },
    setOffset: function (dx, dy) {
        this.dx = dx;
        this.dy = dy;
        this.setPosition(this.x, this.y);
    },
    setPosition: function (x, y) {
        this.view.css({
            left: x,
            bottom: y,
            marginLeft: this.dx,
            marginBottom: this.dy,
        });
        this._super(x, y);
        this.setGridPosition(x, y);
    },
    setSize: function (width, height) {
        this.view.css({
            width: width,
            height: height
        });
        this._super(width, height);
    },
    setGridPosition: function (x, y) {
        this.i = Math.floor((x + 16) / 32);
        this.j = Math.ceil(this.level.getGridHeight() - 1 - y / 32);

        if (this.j > this.level.getGridHeight())
            this.die();
    },
    getGridPosition: function (x, y) {
        return {i: this.i, j: this.j};
    },
    setVelocity: function (vx, vy) {
        this.vx = vx;
        this.vy = vy;

        if (vx > 0)
            this.direction = directions.right;
        else if (vx < 0)
            this.direction = directions.left;
    },
    getVelocity: function () {
        return {vx: this.vx, vy: this.vy};
    },
    hit: function (opponent) {

    },
    collides: function (is, ie, js, je, blocking) {
        var isHero = this instanceof Hero;

        if (is < 0 || ie >= this.level.obstacles.length)
            return true;

        if (js < 0 || je >= this.level.getGridHeight())
            return false;

        for (var i = is; i <= ie; i++) {
            for (var j = je; j >= js; j--) {
                var obj = this.level.obstacles[i][j];

                if (obj) {
                    if (obj instanceof Item && isHero && (blocking === ground_blocking.bottom || obj.blocking === ground_blocking.none))
                        obj.activate(this);

                    if ((obj.blocking & blocking) === blocking) {
                        return true;
                    }
                }
            }
        }

        return false;
    },
    move: function () {
        var vx = this.vx;
        var vy = this.vy - constants.gravity;

        var s = this.state;

        var x = this.x;
        var y = this.y;

        var dx = Math.sign(vx);
        var dy = Math.sign(vy);

        var is = this.i;
        var ie = is;

        var js = Math.ceil(this.level.getGridHeight() - s - (y + 31) / 32);
        var je = this.j;

        var d = 0, b = ground_blocking.none;
        var onground = false;
        var t = Math.floor((x + 16 + vx) / 32);

        if (dx > 0) {
            d = t - ie;
            t = ie;
            b = ground_blocking.left;
        } else if (dx < 0) {
            d = is - t;
            t = is;
            b = ground_blocking.right;
        }

        x += vx;

        for (var i = 0; i < d; i++) {
            if (this.collides(t + dx, t + dx, js, je, b)) {
                vx = 0;
                x = t * 32 + 15 * dx;
                break;
            }

            t += dx;
            is += dx;
            ie += dx;
        }

        if (dy > 0) {
            t = Math.ceil(this.level.getGridHeight() - s - (y + 31 + vy) / 32);
            d = js - t;
            t = js;
            b = ground_blocking.bottom;
        } else if (dy < 0) {
            t = Math.ceil(this.level.getGridHeight() - 1 - (y + vy) / 32);
            d = t - je;
            t = je;
            b = ground_blocking.top;
        } else
            d = 0;

        y += vy;

        for (var i = 0; i < d; i++) {
            if (this.collides(is, ie, t - dy, t - dy, b)) {
                onground = dy < 0;
                vy = 0;
                y = this.level.height - (t + 1) * 32 - (dy > 0 ? (s - 1) * 32 : 0);
                break;
            }

            t -= dy;
        }

        this.onground = onground;
        this.setVelocity(vx, vy);
        this.setPosition(x, y);
    },
    death: function () {
        return false;
    },
    die: function () {
        this.dead = true;
    },
});

var Matter = Base.extend({
    init: function (x, y, blocking, level) {
        this.blocking = blocking;
        this.view = $(DIV).addClass(CLS_MATTER).appendTo(level.world);
        this.level = level;
        this._super(x, y);
        this.setSize(32, 32);
        this.addToGrid(level);
    },
    addToGrid: function (level) {
        level.obstacles[this.x / 32][this.level.getGridHeight() - 1 - this.y / 32] = this;
    },
    setImage: function (img, x, y) {
        this.view.css({
            backgroundImage: img ? c2u(img) : 'none',
            backgroundPosition: '-' + (x || 0) + 'px -' + (y || 0) + 'px',
        });
        this._super(img, x, y);
    },
    setPosition: function (x, y) {
        this.view.css({
            left: x,
            bottom: y
        });
        this._super(x, y);
    },
});



var Ground = Matter.extend({
    init: function (x, y, blocking, level) {
        this._super(x, y, blocking, level);
    },
});

/*
 * -------------------------------------------
 * GRASS CLASSES
 * -------------------------------------------
 */
var TopGrass = Ground.extend({
    init: function (x, y, level) {
        var blocking = ground_blocking.top + ground_blocking.right;
        this._super(x, y, blocking, level);
        this.setImage(images.objects, 1147, 250);
    },
}, 'grass_top');
var invBlock = Ground.extend({
    init: function (x, y, level) {
        var blocking = ground_blocking.top + ground_blocking.right;
        this._super(x, y, blocking, level);
    },
}, 'invisible_block');
var TopLeftGrass = Ground.extend({
    init: function (x, y, level) {
        var blocking = ground_blocking.all;
        this._super(x, y, blocking, level);
        this.setImage(images.objects, 1100, 250);
    },
}, 'grass_top_left');
var TopRightGrass = Ground.extend({
    init: function (x, y, level) {
        var blocking = ground_blocking.all;
        this._super(x, y, blocking, level);
        this.setImage(images.objects, 1172, 250);
    },
}, 'grass_top_right');

/*
 * -------------------------------------------
 * DECORATION CLASS
 * -------------------------------------------
 */
var Decoration = Matter.extend({
    init: function (x, y, level) {
        this._super(x, y, ground_blocking.none, level);
        level.decorations.push(this);
    },
    setImage: function (img, x, y) {
        this.view.css({
            backgroundImage: img ? c2u(img) : 'none',
            backgroundPosition: '-' + (x || 0) + 'px -' + (y || 0) + 'px',
        });
        this._super(img, x, y);
    },
    setPosition: function (x, y) {
        this.view.css({
            left: x,
            bottom: y
        });
        this._super(x, y);
    },
});

/*
 * -------------------------------------------
 * DECORATION GRASS CLASSES
 * -------------------------------------------
 */
var TopRightCornerGrass = Decoration.extend({
    init: function (x, y, level) {
        this._super(x, y, level);
        this.setImage(images.objects, 612, 868);
    },
}, 'grass_top_right_corner');
var TopLeftCornerGrass = Decoration.extend({
    init: function (x, y, level) {
        this._super(x, y, level);
        this.setImage(images.objects, 648, 868);
    },
}, 'grass_top_left_corner');

/*
 * -------------------------------------------
 * SOIL CLASSES
 * -------------------------------------------
 */
var Soil = Decoration.extend({
    init: function (x, y, level) {
        this._super(x, y, level);
        this.setImage(images.objects, 840, 388);
    },
}, 'soil');

/*
 * -------------------------------------------
 * ITEM CLASS
 * -------------------------------------------
 */
var Item = Matter.extend({
    init: function (x, y, isBlocking, level) {

        this.isBlocking = isBlocking;
        this._super(x, y, isBlocking ? ground_blocking.all : ground_blocking.none, level);
        this.activated = false;
        this.addToLevel(level);
    },
    addToLevel: function (level) {
        level.items.push(this);
    },
    activate: function (from) {
        this.activated = true;
    },

    playFrame: function () {
        this._super();
    },
});

/*
 * -------------------------------------------
 * mana CLASSES
 * -------------------------------------------
 */
var mana = Item.extend({
    init: function (x, y, level) {
        this._super(x, y, false, level);
        this.setImage(images.objects, 0, 5);
    },
    activate: function (from) {
        if (!this.activated) {
            from.addmana();
            this.remove();
        }
        this._super(from);
    },
    remove: function () {
        this.view.remove();
    },
}, 'mana');

var Timer = Item.extend({
    init: function (x, y, level) {
        this._super(x, y, false, level);
        this.setupFrames(10, 10, true);
    },
}, 'timer');


/*
 * -------------------------------------------
 * ITEMFIGURE CLASS
 * -------------------------------------------
 */
var ItemFigure = Figure.extend({
    init: function (x, y, level) {
        this._super(x, y, level);
    },
});


/*
 * -------------------------------------------
 * BULLET CLASS
 * -------------------------------------------
 */
var EnemyBullet = Figure.extend({
        init: function (parent, bulletType, arrowImgX, arrowImgY, damage) {
            this.arrImgX = arrowImgX;
            this.arrImgY = arrowImgY;
            this.damage = damage;

            if (this.arrImgX === arrowTilesX.twoArrows) {
                this.damage = damage;
                console.log(this.damage);
                this._super(parent.x + 31, parent.y+10, parent.level);
            }

            else {
                this.damage = damage;
                console.log(this.damage);
                this._super(parent.x + 32, parent.y + 31, parent.level);
            }
            this.parent = parent;

            this.setImage(images.sprites, this.arrImgX, this.arrImgY);
            this.setSize(160, 70);
            this.direction = parent.direction;
            this.vy = 0;
            this.life = Math.ceil(800 / constants.interval);
            this.speed = constants.bullet_v;
            this.vx = this.direction === directions.right ? this.speed : -this.speed;

        },
        setVelocity: function (vx, vy) {
            this._super(vx, vy);

            if (this.vx === 0) {
                var s = this.speed * Math.sign(this.speed);
                this.vx = this.direction === directions.right ? -s : s;
            }

            if (this.onground - 2)
                this.vy = 2;

        },
        move: function () {
            if (--this.life)
                this._super();
            else
                this.die();
        },
        hit: function (opponent) {
            if ((opponent instanceof Player)) {
                this.die();
                if (this.arrImgX === arrowTilesX.oneArrow) {
                    opponent.setLifes(opponent.lifes -= 25);
                    if (opponent.lifes <= 0) {
                        opponent.die();
                    }
                }
                if (this.arrImgX === arrowTilesX.twoArrows) {
                    opponent.setLifes(opponent.lifes -= 50);
                    if (opponent.lifes <= 0) {
                        opponent.setLifes(0);
                        opponent.die();
                    }
                }
                if (this.arrImgX === arrowTilesX.threeArrows) {
                    opponent.setLifes(opponent.lifes -= 100);
                    if (opponent.lifes <= 0) {
                        opponent.setLifes(0);
                        opponent.die();
                    }
                }
            }
        },
    })
;

var Bullet = Figure.extend({
    init: function (parent, bulletType, arrowImgX, arrowImgY, damage) {
        this.arrImgX = arrowImgX;
        this.arrImgY = arrowImgY;
        this.damage = damage;
        if (4 === bulletType) {
            console.log(this.damage);
            this._super(parent.x + 31, parent.y, parent.level);
            this.damage = damage;
        }
        if (3 === bulletType) {
            this.damage = damage;
            console.log(this.damage);
            this._super(parent.x + 31, parent.y, parent.level);
        }
        if (2 === bulletType) {
            this.damage = damage;
            console.log(this.damage);
            this._super(parent.x + 31, parent.y, parent.level);
        }

        else {
            this.damage = damage;
            console.log(this.damage);
            this._super(parent.x + 32, parent.y + 31, parent.level);
        }
        this.parent = parent;

        this.setImage(images.sprites, this.arrImgX, this.arrImgY);
        this.setSize(160, 70);
        this.direction = parent.direction;
        this.vy = 0;
        this.life = Math.ceil(800 / constants.interval);
        this.speed = constants.bullet_v;
        this.vx = this.direction === directions.right ? this.speed : -this.speed;


    },
    setVelocity: function (vx, vy) {
        this._super(vx, vy);

        if (this.vx === 0) {
            var s = this.speed * Math.sign(this.speed);
            this.vx = this.direction === directions.right ? -s : s;
        }

        if (this.onground - 2)
            this.vy = 2;

    },
    move: function () {
        if (--this.life)
            this._super();
        else
            this.die();
    },
    hit: function (opponent) {
        if (!(opponent instanceof Player)) {
            this.die();
            if (this.damage > 75) {
                opponent.die();
            }
            opponent.hp -= this.damage;
            if (opponent.hp <= 0) {
                opponent.die();
            }
        }
    },
});

/*
 * -------------------------------------------
 * HERO CLASS
 * -------------------------------------------
 */
var Hero = Figure.extend({
    init: function (x, y, level) {
        this._super(x, y, level);
    },
});

/*
 * -------------------------------------------
 * Player CLASS
 * -------------------------------------------
 */
var Player = Hero.extend({
    init: function (x, y, level) {
        this.standSprites = [
            [[{x: 0, y: 80}, {x: 481, y: 83}], [{x: 81, y: 0}, {x: 561, y: 83}]],
            [[{x: 0, y: 178}, {x: 481, y: 247}], [{x: 81, y: 243}, {x: 561, y: 247}]]
        ];
        this.crouchSprites = [
            [{x: 241, y: 0}, {x: 561, y: 83}],
            [{x: 241, y: 162}, {x: 241, y: 243}]
        ];
        this.deadly = 0;
        this.dead = false;
        this.invulnerable = 0;
        this.width = 80;
        this._super(x, y, level);
        this.blinking = 0;
        this.setOffset(-24, 0);
        this.setSize(84, 84);
        this.cooldown = 0;
        this.setPlayerState(Player_states.normal);
        this.setLifes(constants.start_lives);
        this.setMana(constants.start_mana);
        this.setmanas(0);
        this.deathBeginWait = Math.floor(700 / constants.interval);
        this.deathEndWait = 0;
        this.deathFrames = Math.floor(600 / constants.interval);
        this.deathStepUp = Math.ceil(200 / this.deathFrames);
        this.deathDir = 1;
        this.deathCount = 0;
        this.direction = directions.right;
        this.setImage(images.sprites, 81, 0);
    },
    setPlayerState: function (state) {
        this.PlayerState = state;
    },
    setState: function (state) {
        if (state !== this.state) {
            this.setPlayerState(Player_states.normal);
            this._super(state);
        }
    },
    setPosition: function (x, y) {
        this._super(x, y);
        var r = this.level.width - 640;
        var w = (this.x <= 210) ? 0 : ((this.x >= this.level.width - 230) ? r : r / (this.level.width - 440) * (this.x - 210));
        this.level.setParallax(w);

        if (this.onground && this.x >= this.level.width - 128)
            this.victory();
    },
    input: function (keys) {
        this.fast = keys.accelerate;
        this.crouching = keys.down;
        constants.heroX = this.x;
        if (!this.crouching) {
            if (this.onground && keys.up)
                this.jump();

            if (keys.one) {
                this.shoot(30, arrowTilesX.oneArrow, arrowTilesY.oneArrow, 25);
            }
            if (keys.two) {
                this.shoot(70, arrowTilesX.twoArrows, arrowTilesY.twoArrows, 50);
            }
            if (keys.three) {
                this.shoot(150, arrowTilesX.threeArrows, arrowTilesY.threeArrows, 75);
            }
            if (keys.four) {
                this.shoot(350, arrowTilesX.fourArrows, arrowTilesY.fourArrows, 999);
            }
            else {
                this.vx = 0;
            }

            if (keys.right || keys.left)
                this.walk(keys.left, keys.accelerate);
            else
                this.vx = 0;
        }
    },
    shoot: function (cooldown, arrowImgX, arrowImgY, damage) {
        if (!this.cooldown && !this.mana <= 0) {
            if (this.mana <= 14) {

            }
            else {

                if (cooldown === 30) {
                    this.cooldown = cooldown;
                    new Bullet(this, 2, arrowImgX, arrowImgY, damage);
                    this.setMana(this.mana - 25);
                }
                if (cooldown === 70) {
                    this.cooldown = cooldown;
                    new Bullet(this, 2, arrowImgX, arrowImgY, damage);
                    this.setMana(this.mana - 50);
                }
                if (cooldown === 150) {
                    this.cooldown = cooldown;
                    new Bullet(this, 2, arrowImgX, arrowImgY, damage);
                    this.setMana(this.mana - 100);
                }
                if (this.mana - 250 <= 0) {

                } else {
                    this.cooldown = cooldown;
                    new Bullet(this, 2, arrowImgX, arrowImgY, damage);
                    this.setMana(this.mana - 250);
                }

            }
        }
    },
    setVelocity: function (vx, vy) {
        if (this.crouching) {
            vx = 0;
            this.crouch();
        } else {
            if (this.onground && vx > 0)
                this.walkRight();
            else if (this.onground && vx < 0)
                this.walkLeft();
            else
                this.stand();
        }

        this._super(vx, vy);
    },

    walk: function (reverse, fast) {
        this.vx = constants.walking_v * (fast ? 2 : 1) * (reverse ? -1 : 1);
    },
    walkRight: function () {
        if (this.state === size_states.normal) {
            if (!this.setupFrames(8, 2, true, 'WalkRightnormal'))
                this.setImage(images.sprites, 0, 0);
        }
    },
    walkLeft: function () {
        if (this.state === size_states.normal) {
            if (!this.setupFrames(8, 2, false, 'WalkLeftnormal'))
                this.setImage(images.sprites, 78, 86);
        }
    },
    stand: function () {
        var coords = this.standSprites[this.state - 1][this.direction === directions.left ? 0 : 1][this.onground ? 0 : 1];
        this.setImage(images.sprites, coords.x, coords.y);
        this.clearFrames();
    },
    jump: function () {
        this.vy = constants.jumping_v;
    },
    move: function () {
        this.input(keys);
        this._super();
    },
    addmana: function () {
        this.setMana(this.mana + 25);
    },
    playFrame: function () {
        if (this.mana !== 250) {
            this.setMana(this.mana + 0.02);
        }

        if (this.blinking) {
            if (this.blinking % constants.blinkfactor === 0)
                this.view.toggle();

            this.blinking--;
        }

        if (this.cooldown)
            this.cooldown--;
        ;

        if (this.deadly)
            this.deadly--;

        if (this.invulnerable)
            this.invulnerable--;

        this._super();
    },
    setmanas: function (manas) {
        this.manas = manas;

        this.level.world.parent().children('#manaNumber').text(this.manas);
    },
    addLife: function () {
        this.level.playSound('liveupgrade');
        this.setLifes(this.lifes + 1);
    },
    setLifes: function (lifes) {
        this.lifes = lifes;
        this.level.world.parent().children('#hp').text("HP " + this.lifes);
    },
    setMana: function (mana) {
        this.mana = mana;
        if (this.mana <= 0) {
            this.mana = 0;
        }
        this.level.world.parent().children('#mp').text("MP " + this.mana.toString().substring(0, 3));
    },

    death: function () {
        if (this.deathBeginWait) {
            this.deathBeginWait--;
            return true;
        }

        if (this.deathEndWait)
            return --this.deathEndWait;

        this.view.css({'bottom': (this.deathDir > 0 ? '+' : '-') + '=' + (this.deathDir > 0 ? this.deathStepUp : this.deathStepDown) + 'px'});
        this.deathCount += this.deathDir;

        if (this.deathCount === this.deathFrames)
            this.deathDir = -1;
        else if (this.deathCount === 0)
            this.deathEndWait = Math.floor(1800 / constants.interval);

        return true;
    },
    die: function () {
        this.setPlayerState(Player_states.normal);
        this.deathStepDown = Math.ceil(240 / this.deathFrames);
        this.setupFrames(9, 2, false);
        this.setImage(images.sprites, 81, 324);
        this.dead = true;
        this._super();
    },
    hurt: function (from) {
        if (this.deadly)
            from.die();
        else if (this.invulnerable)
            return;
        else if (this.state) {
            this.die();
        }
    },
}, 'Player');

/*
 * -------------------------------------------
 * ENEMY CLASS
 * -------------------------------------------
 */
var Enemy = Figure.extend({
    init: function (x, y, level) {
        this._super(x, y, level);
        this.speed = 0;
    },
    hide: function () {
        this.invisible = true;
        this.view.hide();
    },
    show: function () {
        this.invisible = false;
        this.view.show();
    },
    move: function () {
        if (!this.invisible) {
            this._super();
            var s = this.speed * Math.sign(this.speed);
        }
    },

    collides: function (is, ie, js, je, blocking) {
        if (this.j + 1 < this.level.getGridHeight()) {
            for (var i = is; i <= ie; i++) {
                if (i < 0 || i >= this.level.getGridWidth())
                    return true;

                var obj = this.level.obstacles[i][this.j + 1];

                if (!obj || (obj.blocking & ground_blocking.top) !== ground_blocking.top)
                    return true;
            }
        }

        return this._super(is, ie, js, je, blocking);
    },
    setSpeed: function (v) {
        this.speed = v;
        this.setVelocity(-v, 0);
    },
    hurt: function (from) {

        this.die();
    },
    hit: function (opponent) {
        if (this.invisible)
            return;

        if (opponent instanceof Player) {
            if (opponent.vy < 0 && opponent.y - opponent.vy >= this.y + this.state * 32) {
                this.hurt(opponent);
            } else {
                if (opponent.lifes !== 0) {
                    opponent.setLifes(opponent.lifes - 10);
                    if (opponent.lifes === 0) {
                        opponent.hurt(this);
                    }
                }
                else {
                    opponent.hurt(this);
                }
            }
        }
    },
});

/*
 * -------------------------------------------
 * Goblin CLASS
 * -------------------------------------------
 */
var Goblin = Enemy.extend({
    init: function (x, y, level) {
        this._super(x, y, level);
        this.setSize(53, 60);
        this.setSpeed(constants.monster_v);
        this.death_mode = death_modes.normal;
        this.deathCount = 0;
        this.hp = constants.goblinHealth;
        this.cooldown = 0;
        this.step = 0;
    },
    setVelocity: function (vx, vy) {
        this._super(vx, vy);

        if (this.direction === directions.left) {
            if (!this.setupFrames(8, 2, true, 'LeftWalk'))
                this.setImage(images.enemies, 0, 162);
        } else {
            if (!this.setupFrames(8, 2, true, 'RightWalk'))
                this.setImage(images.enemies, 0, 228);
        }
    },
    shoot: function () {
        if (!this.cooldown) {
            this.cooldown = (Math.random() * 200 | 50) + 1;
            new EnemyBullet(this, 2, arrowTilesX.oneArrow, arrowTilesY.oneArrow, 75);
        }
    },
    move: function () {
        this._super();
        //condition to move towards hero
        if (this.findDirection(this.level.figures[0]) === directions.left) {
            this.direction = directions.right;
            this.setVelocity(1, 1);

        }
        else {
            this.direction = directions.left;
            this.setVelocity(-1, 1);
        }
        if (this.direction === directions.right) {
            this.shoot();
        }
        else {
            this.shoot();
        }
        this.cooldown--;
    },
    findDirection: function (hero) {
        var position = this.x - hero.x;
        if (position < 0) {
            return directions.left;
        }
        else {
            return directions.right;
        }
    },
    death: function () {
        if (this.death_mode === death_modes.normal)
            return --this.deathCount;

        this.view.css({'bottom': (this.deathDir > 0 ? '+' : '-') + '=' + this.deathStep + 'px'});
        this.deathCount += this.deathDir;

        if (this.deathCount === this.deathFrames)
            this.deathDir = -1;
        else if (this.deathCount === 0)
            return false;

        return true;
    },
    die: function () {
        this.clearFrames();

        if (this.death_mode === death_modes.normal) {
            this.setImage(images.enemies, 50, 143);
            this.level.figures[0].setMana(this.level.figures[0].mana + 10);
            this.level.figures[0].setLifes(this.level.figures[0].lifes + 10);
            this.deathCount = Math.ceil(600 / constants.interval);
        }

        this._super();
    },

}, 'goblin');
var Dummy = Enemy.extend({
    init: function (x, y, level) {
        this._super(x, y, level);
        this.setSize(53, 60);
        this.setSpeed(constants.monster_v);
        this.death_mode = death_modes.normal;
        this.deathCount = 0;
        this.hp = constants.goblinHealth;
        this.cooldown = 0;
        this.step = 0;
    },
    setVelocity: function (vx, vy) {
        this._super(vx, vy);

        if (this.direction === directions.left) {
            if (!this.setupFrames(8, 2, true, 'LeftWalk'))
                this.setImage(images.enemies, 0, 162);
        } else {
            if (!this.setupFrames(8, 2, true, 'RightWalk'))
                this.setImage(images.enemies, 0, 228);
        }
    },
    move: function () {
        this._super();
        //condition to move towards hero
        if (this.findDirection(this.level.figures[0]) === directions.left) {
            this.direction = directions.right;
            this.setVelocity(1, 1);

        }
        else {
            this.direction = directions.left;
            this.setVelocity(-1, 1);
        }
        this.cooldown--;
    },
    findDirection: function (hero) {
        var position = this.x - hero.x;
        if (position < 0) {
            return directions.left;
        }
        else {
            return directions.right;
        }
    },
    death: function () {
        if (this.death_mode === death_modes.normal)
            return --this.deathCount;

        this.view.css({'bottom': (this.deathDir > 0 ? '+' : '-') + '=' + this.deathStep + 'px'});
        this.deathCount += this.deathDir;

        if (this.deathCount === this.deathFrames)
            this.deathDir = -1;
        else if (this.deathCount === 0)
            return false;

        return true;
    },
    die: function () {
        this.level.reload();

        if (this.death_mode === death_modes.normal) {
            this.setImage(images.enemies, 50, 143);
            this.level.figures[0].setMana(this.level.figures[0].mana + 10);
            this.level.figures[0].setLifes(this.level.figures[0].lifes + 10);
            this.deathCount = Math.ceil(600 / constants.interval);
        }

        this._super();
    },

}, 'dummy');

var Ogr = Enemy.extend({
    init: function (x, y, level) {
        this._super(x, y, level);
        this.setSize(60, 60);
        this.setSpeed(constants.monster_v);
        this.death_mode = death_modes.normal;
        this.deathCount = 0;
        this.hp = constants.ogrHealth;
        this.cooldown = 0;
        this.step = 0;
    },
    setVelocity: function (vx, vy) {
        this._super(vx, vy);

        if (this.direction === directions.left) {
            if (!this.setupFrames(8, 2, true, 'LeftWalk'))
                this.setImage(images.enemies, 0, 0);
        } else {
            if (!this.setupFrames(8, 2, true, 'RightWalk'))
                this.setImage(images.enemies, 0, 71);
        }
    },
    shoot: function (xParam) {
        if (!this.cooldown) {
            this.cooldown = (Math.random() * 200 | 50) + 1;
            new EnemyBullet(this, 2, arrowTilesX.twoArrows, arrowTilesY.twoArrows, 50);
        }
    },
    move: function () {
        this._super();
        //condition to move towards hero
        if (this.findDirection(this.level.figures[0]) === directions.left) {
            this.direction = directions.right;
            this.setVelocity(1, 1);

        }
        else {
            this.direction = directions.left;
            this.setVelocity(-1, 1);
        }
        if (this.direction === directions.right) {
            this.shoot(0);
        }
        else {
            this.shoot(1);
        }
        this.cooldown--;
    },
    findDirection: function (hero) {
        var position = this.x - hero.x;
        if (position < 0) {
            return directions.left;
        }
        else {
            return directions.right;
        }
    },
    death: function () {
        if (this.death_mode === death_modes.normal)
            return --this.deathCount;

        this.deathCount += this.deathDir;

        if (this.deathCount === this.deathFrames)
            this.deathDir = -1;
        else if (this.deathCount === 0)
            return false;

        return true;
    },
    die: function () {
        this.clearFrames();

        if (this.death_mode === death_modes.normal) {
            this.setImage(images.enemies, 0, 0);
            this.level.figures[0].setMana(this.level.figures[0].mana + 25);
            this.level.figures[0].setLifes(this.level.figures[0].lifes + 50);
        }

        this._super();
    },

}, 'ogr');

var Troll = Enemy.extend({
    init: function (x, y, level) {
        this._super(x, y, level);
        this.setSize(64, 70);
        this.setSpeed(constants.monster_v);
        this.death_mode = death_modes.normal;
        this.deathCount = 0;
        this.hp = constants.trollHealth;
        this.cooldown = 0;
        this.step = 0;
    },
    setVelocity: function (vx, vy) {
        this._super(vx, vy);

        if (this.direction === directions.left) {
            if (!this.setupFrames(8, 2, true, 'LeftWalk'))
                this.setImage(images.enemies, 0, 313);
        } else {
            if (!this.setupFrames(8, 2, true, 'RightWalk'))
                this.setImage(images.enemies, 1, 402);
        }
    },
    shoot: function () {
        if (!this.cooldown) {
            this.cooldown = (Math.random() * 200 | 50) + 1;
            new EnemyBullet(this, 2, arrowTilesX.threeArrows, arrowTilesY.threeArrows, 50);
        }
    },
    move: function () {
        this._super();
        //condition to move towards hero
        if (this.findDirection(this.level.figures[0]) === directions.left) {
            this.direction = directions.right;
            this.setVelocity(1, 1);

        }
        else {
            this.direction = directions.left;
            this.setVelocity(-1, 1);
        }
        if (this.direction === directions.right) {
            this.shoot(0);
        }
        else {
            this.shoot(1);
        }
        this.cooldown--;
    },
    findDirection: function (hero) {
        var position = this.x - hero.x;
        if (position < 0) {
            return directions.left;
        }
        else {
            return directions.right;
        }
    },
    death: function () {
        if (this.death_mode === death_modes.normal)
            return --this.deathCount;

        this.deathCount += this.deathDir;

        if (this.deathCount === this.deathFrames)
            this.deathDir = -1;
        else if (this.deathCount === 0)
            return false;

        return true;
    },
    die: function () {
        this.clearFrames();

        if (this.death_mode === death_modes.normal) {
            this.setImage(images.enemies, 0, 313);
            this.level.figures[0].setMana(this.level.figures[0].mana + 75);
            this.level.figures[0].setLifes(this.level.figures[0].lifes + 100);
            this.deathCount = Math.ceil(600 / constants.interval);
        }

        this._super();
    },

}, 'troll');

/*
 * -------------------------------------------
 * DOCUMENT READY STARTUP METHOD
 * -------------------------------------------
 */
$(document).ready(function () {
    var level = new Level('world');
    level.load(definedLevels[0]);
    level.start();
    keys.bind();
});