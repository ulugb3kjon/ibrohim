const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let squares = [];

for (let i = 0; i < 500; i++) {
  squares.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 4 + 1,
    speed: Math.random() * 1.5 + 0.5
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let square of squares) {
    // Har kvadrat uchun random RGB rang
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;

    ctx.fillRect(square.x, square.y, square.size, square.size);
    square.y += square.speed;

    if (square.y > canvas.height) {
      square.y = 0;
      square.x = Math.random() * canvas.width;
    }
  }

  requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

document.querySelectorAll('.copy-text').forEach(elem => {
  elem.addEventListener('click', () => {
    const text = elem.dataset.copy;

    navigator.clipboard.writeText(text).then(() => {
      elem.classList.add('copied');

      const toast = document.getElementById('toast');
      toast.classList.add('show');

      setTimeout(() => {
        elem.classList.remove('copied');
        toast.classList.remove('show');
      }, 1500);
    });
  });
});
