
var keys = {
    bind: function () {
        $(document).on('keydown', function (event) {
            return keys.handler(event, true);
        });
        $(document).on('keyup', function (event) {
            return keys.handler(event, false);
        });
    },
    reset: function () {
        keys.left = false;
        keys.right = false;
        keys.accelerate = false;
        keys.up = false;
        keys.down = false;
        keys.one = false;
        keys.two = false;
        keys.three = false;
        keys.four = false;
    },
    unbind: function () {
        $(document).off('keydown');
        $(document).off('keyup');
    },
    handler: function (event, status) {
        switch (event.keyCode) {
            case 39://RIGHT ARROW
                keys.right = status;
                break;
            case 37://LEFT ARROW
                keys.left = status;
                break;
            case 38://UP ARROW
                keys.up = status;
                break;
            case 49://1
                keys.one = status;
                break;
            case 50://2
                keys.two = status;
                break;
            case 51://3
                keys.three = status;
                break;
            case 52://4
                keys.four = status;
                break;

            default:
                return true;
        }

        event.preventDefault();
        return false;
    },
    accelerate: false,
    left: false,
    up: false,
    right: false,
    down: false,
    one: false,
    two: false,
    three: false,
    four: false
};