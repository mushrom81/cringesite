let c = document.querySelector("canvas");
let ctx = c.getContext("2d");

let quality = 3;
let slider = document.getElementById("quality");
slider.oninput = function() { quality = Number(this.value); };

let doLoop = false;
let autoloop = document.getElementById("autoloop");
autoloop.oninput = function() {doLoop = this.checked};

let frameCount = 122;
let images = new Array();

for (let i = 0; i < frameCount; i++) {
    images[i] = new Image();
    images[i].src = 'cringe (' + (i + 1) + ').jpg'
    images[i].onload = function() {};
};

let keys = {};
onkeydown = onkeyup = function(e) { // Keypress handler
    e = e || window.event;
    keys[e.key] = (e.type == "keydown");
};

let currentFrame = 0;
let direction = -1;

function metamorph() { direction = -direction; };

function loop() {
    requestAnimationFrame(loop);
    if (currentFrame % quality == 0) {
        c.width  = window.innerWidth;
        c.height = window.innerHeight;
        ctx.clearRect(0, 0, c.width, c.height);
        let scale = Math.max(c.width / images[currentFrame].width, c.height / images[currentFrame].height);
        let x = (c.width / 2) - (images[currentFrame].width / 2) * scale;
        let y = (c.height / 2) - (images[currentFrame].height / 2) * scale;
        ctx.drawImage(images[currentFrame], x, y, images[currentFrame].width * scale, images[currentFrame].height * scale);
    };
    if ((currentFrame == frameCount - 1 || currentFrame == 0) && doLoop) direction = -direction;
    if (direction == 1 && currentFrame < frameCount - 1) currentFrame++;
    if (direction == -1 && currentFrame > 0) currentFrame--;
    if (currentFrame >= frameCount) currentFrame = frameCount - 1;
    if (currentFrame < 0) currentFrame = 0;
    if (keys[' ']) {
        metamorph();
        keys[' '] = false;
    };
};
loop();
