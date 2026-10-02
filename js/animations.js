/**
 * BHODT - ANIMATIONS & INTERACTIVE VISUAL EFFECTS
 * Lightweight, hardware accelerated, battery friendly
 */

(function () {
  'use strict';

  // 1. SCROLL REVEAL VIA INTERSECTION OBSERVER
  if ('IntersectionObserver' in window) {
    const revealElements = document.querySelectorAll('.reveal');
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.15,
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-revealed'));
  }

  // 2. HERO CANVAS PARTICLES (Lightweight, low CPU)
  const canvas = document.getElementById('heroParticleCanvas');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (canvas && !prefersReducedMotion) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let animationFrameId;

    const particleCount = window.innerWidth < 768 ? 24 : 45;
    const maxDistance = 110;

    function resizeCanvas() {
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    }

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 1.6 + 0.8;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 255, 255, 0.45)';
        ctx.fill();
      }
    }

    function initParticles() {
      resizeCanvas();
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function render() {
      ctx.clearRect(0, 0, width, height);

      // Connect close particles with subtle cyber lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDistance) {
            const opacity = (1 - dist / maxDistance) * 0.18;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 255, 255, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(render);
    }

    initParticles();
    render();

    window.addEventListener('resize', () => {
      resizeCanvas();
    });

    // Pause canvas if scrolled out of hero viewport to preserve battery
    const heroSection = document.querySelector('.hero-section');
    if (heroSection && 'IntersectionObserver' in window) {
      const heroObserver = new IntersectionObserver(
        (entries) => {
          if (!entries[0].isIntersecting) {
            cancelAnimationFrame(animationFrameId);
          } else {
            animationFrameId = requestAnimationFrame(render);
          }
        },
        { threshold: 0.05 }
      );
      heroObserver.observe(heroSection);
    }
  }

  // 3. TYPING EFFECT FOR HERO SUBTITLE
  const typingElement = document.getElementById('typingTagline');
  if (typingElement && !prefersReducedMotion) {
    const phrases = [
      'BUILD. SECURE. INNOVATE.',
      'MODERN WEB ARCHITECTURE',
      'AUTHORIZED SECURITY AUDITS',
      'ENTERPRISE DIGITAL PLATFORMS'
    ];
    let phraseIndex = 0;
    let letterIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeLoop() {
      const currentPhrase = phrases[phraseIndex];
      if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, letterIndex - 1);
        letterIndex--;
        typingSpeed = 50;
      } else {
        typingElement.textContent = currentPhrase.substring(0, letterIndex + 1);
        letterIndex++;
        typingSpeed = 110;
      }

      if (!isDeleting && letterIndex === currentPhrase.length) {
        typingSpeed = 2200; // Pause at end of phrase
        isDeleting = true;
      } else if (isDeleting && letterIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 450;
      }

      setTimeout(typeLoop, typingSpeed);
    }

    typeLoop();
  }
})();
