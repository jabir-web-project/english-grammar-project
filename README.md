<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Analog Clock</title>
<style>
    body {
        margin: 0;
        height: 100vh;
        background: radial-gradient(circle at top, #1b2735, #090a0f);
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: Arial, sans-serif;
        color: white;
    }

    .clock-container {
        background: #111;
        padding: 20px;
        border-radius: 50%;
        box-shadow: 0 0 40px rgba(0,255,255,0.2);
    }

    canvas {
        display: block;
        background: radial-gradient(circle, #222, #000);
        border-radius: 50%;
    }
</style>
</head>
<body>

<div class="clock-container">
    <canvas id="clock" width="400" height="400"></canvas>
</div>

<script>
const canvas = document.getElementById("clock");
const ctx = canvas.getContext("2d");
const radius = canvas.width / 2;
ctx.translate(radius, radius);

function drawClock() {
    ctx.clearRect(-radius, -radius, canvas.width, canvas.height);
    drawFace();
    drawNumbers();
    drawTime();
    requestAnimationFrame(drawClock);
}

function drawFace() {
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.95, 0, Math.PI * 2);
    ctx.fillStyle = "#000";
    ctx.fill();

    const grad = ctx.createRadialGradient(0,0,radius*0.9,0,0,radius);
    grad.addColorStop(0,"#0ff");
    grad.addColorStop(0.5,"#111");
    grad.addColorStop(1,"#0ff");
    ctx.strokeStyle = grad;
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, 6, 0, Math.PI * 2);
    ctx.fillStyle = "#0ff";
    ctx.fill();
}

function drawNumbers() {
    ctx.font = "18px Arial";
    ctx.fillStyle = "#0ff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (let num = 1; num <= 12; num++) {
        const ang = num * Math.PI / 6;
        const x = Math.sin(ang) * radius * 0.8;
        const y = -Math.cos(ang) * radius * 0.8;
        ctx.fillText(num.toString(), x, y);
    }

    for (let i = 0; i < 60; i++) {
        const ang = i * Math.PI / 30;
        const inner = radius * 0.9;
        const outer = radius * 0.95;
        ctx.beginPath();
        ctx.moveTo(Math.sin(ang) * inner, -Math.cos(ang) * inner);
        ctx.lineTo(Math.sin(ang) * outer, -Math.cos(ang) * outer);
        ctx.strokeStyle = i % 5 === 0 ? "#0ff" : "#444";
        ctx.lineWidth = i % 5 === 0 ? 3 : 1;
        ctx.stroke();
    }
}

function drawTime() {
    const now = new Date();
    const ms = now.getMilliseconds();
    const sec = now.getSeconds() + ms / 1000;
    const min = now.getMinutes() + sec / 60;
    const hr  = (now.getHours() % 12) + min / 60;

    drawHand(hr * Math.PI / 6, radius * 0.5, 6, "#0ff");
    drawHand(min * Math.PI / 30, radius * 0.75, 4, "#09f");
    drawHand(sec * Math.PI / 30, radius * 0.85, 2, "red");
}

function drawHand(pos, length, width, color) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

drawClock();
</script>

</body>
</html>
