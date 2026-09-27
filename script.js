/* ============================================================
   Bali with Putu — Landing page interactions
   Vanilla JS, sans dépendance externe.
   ============================================================ */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Nav : fond plein au scroll + menu mobile ---------- */
const nav = document.getElementById('nav');
const burger = document.getElementById('burger');
const navMobile = document.getElementById('navMobile');

function onScroll() {
  nav.classList.toggle('is-scrolled', window.scrollY > 60);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

if (burger) {
  burger.addEventListener('click', () => navMobile.classList.toggle('is-open'));
  navMobile.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navMobile.classList.remove('is-open'))
  );
}

/* ---------- Scroll reveal ---------- */
const revealEls = document.querySelectorAll('.reveal');
if (prefersReducedMotion) {
  revealEls.forEach(el => el.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('is-visible'), i * 50);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));
}

/* ---------- Fallback propre pour les images placeholder (à remplacer) ---------- */
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', () => {
    img.style.background = '#E5DFCB';
  }, { once: true });
});
