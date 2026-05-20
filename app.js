// ===== NAV SCROLL STATE =====
const nav = document.querySelector('nav');
const onScroll = () => {
  if (window.scrollY > 20) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ===== VENUE TYPE PICKER =====
document.querySelectorAll('.vtype').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.vtype').forEach(v => v.classList.remove('on'));
    btn.classList.add('on');
  });
});

// ===== REVEAL ON SCROLL =====
const revealEls = document.querySelectorAll(
  '.feat, .tier, .tip, .vcard, .mitem, .pillar, .ab-card, .hstat, .istat, .deco-card, .vtype'
);
revealEls.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => io.observe(el));

// ===== ANIMATED STAT COUNTERS =====
const statEls = document.querySelectorAll('.hstat-num[data-target]');
const formatNum = (n) => {
  if (n >= 100000) return (n / 100000).toFixed(n % 100000 === 0 ? 0 : 1) + 'L+';
  if (n >= 1000)   return n.toLocaleString('en-IN') + '+';
  return n + '+';
};
const animateCount = (el) => {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1600;
  const start = performance.now();
  const step = (now) => {
    const p = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = formatNum(Math.floor(target * eased));
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = formatNum(target);
  };
  requestAnimationFrame(step);
};
const statIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCount(e.target);
      statIO.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });
statEls.forEach(el => statIO.observe(el));

// ===== COPBOT ROTATING TIPS =====
const tips = [
  'Never share your OTP — not even with "police" callers.',
  'Check the sender email carefully before clicking any link.',
  'Too good to be true? It is. It\'s a scam.',
  'Talk to your family about what you do online today.',
  'Cyber crime? Call 1930 immediately — every minute counts.',
  'Enable 2FA on all your important accounts right now.',
  'Update your apps — outdated apps are easy targets.',
  'Use a unique password for every important account.',
  'Strangers online are still strangers. Don\'t share personal info.',
];
let tipIdx = 0;
const tipEl = document.getElementById('floatTipText');
setInterval(() => {
  tipIdx = (tipIdx + 1) % tips.length;
  if (tipEl) {
    tipEl.style.opacity = 0;
    setTimeout(() => {
      tipEl.textContent = tips[tipIdx];
      tipEl.style.opacity = 1;
    }, 200);
  }
}, 4500);

// ===== SMOOTH NAV LINK HIGHLIGHT =====
const navLinks = document.querySelectorAll('.nav-links a');
const sections = Array.from(navLinks)
  .map(a => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);

const setActive = () => {
  const fromTop = window.scrollY + 120;
  let current = sections[0];
  sections.forEach(s => {
    if (s.offsetTop <= fromTop) current = s;
  });
  navLinks.forEach(a => {
    const isActive = a.getAttribute('href') === '#' + current.id;
    a.style.color = isActive ? 'var(--orange)' : '';
    a.style.background = isActive ? 'var(--orange-pale)' : '';
  });
};
window.addEventListener('scroll', setActive, { passive: true });

// ===== MOBILE NAV (basic toggle) =====
const navToggle = document.querySelector('.nav-toggle');
const navLinksUl = document.querySelector('.nav-links');
if (navToggle && navLinksUl) {
  navToggle.addEventListener('click', () => {
    const open = navLinksUl.classList.toggle('open');
    if (open) {
      navLinksUl.style.cssText = `
        display:flex; position:absolute; top:60px; left:8px; right:8px;
        background:#fff; border:1px solid var(--border); border-radius:16px;
        flex-direction:column; padding:12px; gap:4px;
        box-shadow:0 12px 32px rgba(0,0,0,.12);
      `;
    } else {
      navLinksUl.style.cssText = '';
    }
  });
  navLinksUl.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinksUl.classList.remove('open');
      navLinksUl.style.cssText = '';
    });
  });
}

// ===== CART (visual stub) =====
document.querySelectorAll('.add-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const original = btn.textContent;
    btn.textContent = 'Added ✓';
    btn.style.background = 'var(--green)';
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
    }, 1400);
  });
});
