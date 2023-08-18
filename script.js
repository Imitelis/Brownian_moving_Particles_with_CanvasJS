const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
	constructor() {
		this.x = Math.random() * canvas.width;
		this.y = Math.random() * canvas.height;
		this.radius = 3;
		this.style = "hsla(9, 100%, 50%, 1)";
		this.blur = 12;
		this.speedX;
		this.speedY;
	}

	draw() {
		ctx.save();
		ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.style;
        ctx.fill();
		ctx.shadowBlur = this.blur;
        ctx.closePath();
		ctx.restore();
	}

	update() {
		this.px = this.x;
		this.py = this.y;

		this.speedX = Math.floor(Math.random() * 13) - 6;
		this.speedY = Math.floor(Math.random() * 13) - 6;

		this.x += this.speedX;
		this.y += this.speedY;

		if (this.x < 0) {
			this.x = 3;
		} else if (this.x > canvas.width) {
			this.x = canvas.width - 3;
		}
	
		if (this.y < 0) {
			this.y = 3;
		} else if (this.y > canvas.height) {
			this.y = canvas.height - 3;
		}
	}
}

class init {
  constructor() {
    this.animate = this.animate.bind(this);
    this.particles = [];
    this.particleCount = Math.floor((canvas.width + canvas.height) * 0.24);

    this.resize();
    this.animate();
  }

  resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  animate() {
	if (this.particles.length < this.particleCount) {
		this.particles.push(new Particle());
	}

	this.particles.map((p) => {
		p.update();
		p.draw();
	});

	ctx.globalCompositeOperation = "source-over";
	ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.globalCompositeOperation = "lighter";

	requestAnimationFrame(this.animate);
  }
}

const animation = new init();

window.addEventListener('resize',
  function () {
    animation.resize();
})
