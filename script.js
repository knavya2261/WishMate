document.addEventListener("DOMContentLoaded", () => {
  const dobInput = document.getElementById("dob");
  const calcBtn = document.getElementById("calculateBtn");
  const nameInput = document.getElementById("username");
  const goBtn = document.getElementById("goBtn");
  const message = document.getElementById("message");
  const canvas = document.getElementById("confetti");

  // 🎂 INDEX PAGE
// 🎂 INDEX PAGE
if (calcBtn) {
  calcBtn.addEventListener("click", () => {
    if (!dobInput.value) {
      alert("⚠ Please select your birthday!");
      return;
    }

    const dob = new Date(dobInput.value);
    const today = new Date();

    const ageYears = today.getFullYear() - dob.getFullYear();
    const ageMonths = today.getMonth() - dob.getMonth();
    const ageDays = today.getDate() - dob.getDate();

    let years = ageYears;
    let months = ageMonths;
    let days = ageDays;

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    // Show result inside index.html
    const resultBox = document.getElementById("result");
    resultBox.innerHTML = `You are <span style="color:red">${years}</span> years, 
                           <span style="color:green">${months}</span> months, 
                           <span style="color:blue">${days}</span> days old.`;

    // If today is birthday, go to name page
    if (dob.getDate() === today.getDate() && dob.getMonth() === today.getMonth()) {
      setTimeout(() => {  // small delay so result is visible
        window.location.href = "name.html";
      }, 2000);
    }
  });
}

  // ✍ NAME PAGE
  if (goBtn) {
    goBtn.addEventListener("click", () => {
      if (!nameInput.value.trim()) {
        alert("⚠ Please enter your name!");
        return;
      }
      const name = encodeURIComponent(nameInput.value.trim());
      window.location.href = `birthday.html?name=${name}`;
    });
  }

  // 🎆 BIRTHDAY PAGE
  if (message && canvas) {
    const params = new URLSearchParams(window.location.search);
    const name = decodeURIComponent(params.get("name")) || "Friend";
    message.innerText = `Happy Birthday ${name}! 🎂`; // ✅ Correct

    // --- Cracker Blast ---
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    function createBlast(x, y) {
      for (let i = 0; i < 100; i++) {
        particles.push({
          x, y,
          size: Math.random() * 5 + 2,
          speedX: (Math.random() - 0.5) * 8,
          speedY: (Math.random() - 0.5) * 8,
          color: `hsl(${Math.random() * 360}, 100%, 50%)`,
          life: 100
        });
      }
    }
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.life--;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        if (p.life <= 0) particles.splice(i, 1);
      });
      requestAnimationFrame(animate);
    }
    setInterval(() => createBlast(canvas.width/2, canvas.height/2), 2000);
    animate();
  }
});