let trex = document.getElementById("trex");
document.onkeydown = function (keyPressed) {
    if (keyPressed.keyCode == 32) {
        console.log("Jump!");
        let position = trex.getBoundingClientRect().top;
        console.log(position);
        if (position == 440) {
            position -= 150;
        }
        trex.style.top = position + "px";
        console.log(position, trex.style.top);
        setTimeout(() => {
            position += 150;
            trex.style.top = position + "px";
        }, 600);
    }
}

function frame(obstacle, pos, initialPos) {
    if (pos == 10) {
        pos = initialPos;
    } else {
        console.log(obstacle, pos, initialPos); 
        if (checkCollision(obstacle, trex)) {
            let message = document.getElementById("message");
            message.innerText = "GAME OVER";
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
        --pos;
        obstacle.style.left = pos + "px";
    }
}

function generateGame() {
    let obstacles = document.getElementById("obstacles");
    for (let i = 1; i <= 3; ++i) {
        let obstacle = document.createElement("div");
        obstacle.id = "obstacle" + i;
        obstacles.appendChild(obstacle);
        let pos = obstacle.getBoundingClientRect().left;
        initialPos = pos;
        let id = null;
        clearInterval(id);
        setInterval(() => {
            frame(obstacle, pos, initialPos);
            --pos;
        }, 5)
        id = setInterval(frame, 10 * 1000, obstacle, pos - 1, initialPos);
    }
}

function checkCollision(obj1, obj2) {
    let obj1Pos = obj1.getBoundingClientRect();
    let obj2Pos = obj2.getBoundingClientRect();
    if (!(obj1Pos.right < obj2Pos.left
        || obj1Pos.left > obj2Pos.right
        || obj1Pos.bottom < obj2Pos.top
        || obj1Pos.top > obj2Pos.bottom)) {
        return 1;
    }
}