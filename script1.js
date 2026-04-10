/* ═══════════════════════════════════════════════════
   RosBotz — Script
   ═══════════════════════════════════════════════════ */

// ── Splash Screen ──────────────────────────────────
const splash     = document.getElementById('splash');
const splashLogo = document.getElementById('splash-logo');
const heroWrap   = document.getElementById('hero-wrap');

let splashEnded = false;

function endSplash() {
  if (splashEnded) return;
  splashEnded = true;
  splash.classList.add('fade-out');
  heroWrap.classList.add('visible');
  setTimeout(() => { splash.style.display = 'none'; }, 1200);
  startHero();
}

// Splash timers
setTimeout(() => splashLogo.classList.add('visible'), 2500);   // logo in
setTimeout(() => endSplash(), 8500);                           // auto-end

// ── Hero Stage Animation ───────────────────────────
function startHero() {
  const laserTop   = document.getElementById('laser-top');
  const laserRight = document.getElementById('laser-right');
  const laserBot   = document.getElementById('laser-bottom');
  const laserLeft  = document.getElementById('laser-left');
  const sparkTR    = document.getElementById('spark-tr');
  const sparkBL    = document.getElementById('spark-bl');
  const heroLogo   = document.getElementById('hero-logo');
  const scanLine   = document.getElementById('scan-line');
  const chromeShine= document.getElementById('chrome-shine');
  const tagline    = document.getElementById('tagline');
  const dots       = document.getElementById('dots');

  // Stage 1 — particles (auto via canvas init)
  initParticles();

  // Stage 2 — laser lines
  setTimeout(() => { laserTop.classList.add('on--top');        }, 600);
  setTimeout(() => { laserRight.classList.add('on--right'); sparkTR.classList.add('visible'); }, 1100);
  setTimeout(() => { laserBot.classList.add('on--bottom');     }, 1600);
  setTimeout(() => { laserLeft.classList.add('on--left');  sparkBL.classList.add('visible'); }, 2100);

  // Stage 3 — logo reveal + scan
  setTimeout(() => {
    heroLogo.classList.add('revealed', 'bright');
    scanLine.classList.add('active');
  }, 2800);

  // Stage 4 — tagline
  setTimeout(() => tagline.classList.add('visible'), 4000);

  // Stage 5 — final polish
  setTimeout(() => {
    heroLogo.classList.remove('bright');
    chromeShine.classList.add('active');
    scanLine.classList.remove('active');
    dots.classList.add('visible');

    // Fade lasers & sparks
    [laserTop, laserRight, laserBot, laserLeft].forEach(l => l.classList.add('fade'));
    sparkTR.classList.remove('visible');
    sparkBL.classList.remove('visible');
  }, 4800);
}

// ── Data Particles (Canvas) ────────────────────────
function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = canvas.offsetWidth  * devicePixelRatio;
    canvas.height = canvas.offsetHeight * devicePixelRatio;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = [];
  const w = () => canvas.offsetWidth;
  const h = () => canvas.offsetHeight;
  const colors = ['0,163,255','244,121,32','100,180,255','255,165,80'];

  function spawn() {
    if (particles.length > 80) return;
    const maxLife = 200 + Math.random() * 300;
    particles.push({
      x: Math.random() * w(), y: h() + 10,
      vx: (Math.random() - .5) * .3,
      vy: -(0.3 + Math.random() * .5),
      size: 1 + Math.random() * 2,
      opacity: 0,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 0, maxLife
    });
  }

  function animate() {
    ctx.clearRect(0, 0, w(), h());
    if (Math.random() < .3) spawn();

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy; p.life++;
      const prog = p.life / p.maxLife;
      p.opacity = (prog < .1 ? prog / .1 : prog > .8 ? (1 - prog) / .2 : 1) * .6;
      if (p.life > p.maxLife) { particles.splice(i, 1); continue; }

      ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${p.opacity})`; ctx.fill();

      ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${p.opacity * .15})`; ctx.fill();
    }

    // Connection lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const a = (1 - dist / 120) * .08 * Math.min(particles[i].opacity, particles[j].opacity);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0,163,255,${a})`;
          ctx.lineWidth = .5; ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
}
