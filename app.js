// Venue picker
function pickType(el) {
  document.querySelectorAll('.vtype').forEach(v => v.classList.remove('on'));
  el.classList.add('on');
}

// Scroll reveal
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.feat,.tier,.tip,.vcard,.mitem,.pillar,.mrow,.hstat,.istat,.vtype')
  .forEach(el => {
    el.classList.add('reveal');
    obs.observe(el);
  });

// Nav scroll state
const nav = document.querySelector('nav');
const onScroll = () => {
  if (window.scrollY > 20) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// CopBot rotating tips
const tips = [
  'Never share your OTP — not even with someone claiming to be police!',
  'Check the sender email carefully before clicking any link.',
  "Too good to be true? It is. It's a scam.",
  'Talk to your family about what you do online today.',
  'Cyber crime? Call 1930 immediately — every minute counts.',
  'Enable 2FA on all your important accounts right now.',
  'Update your apps — outdated apps are easy targets.',
];
let tipIdx = 0;
const tipEl = document.getElementById('floatTip');
if (tipEl) {
  setInterval(() => {
    tipIdx = (tipIdx + 1) % tips.length;
    tipEl.innerHTML = `<strong>CopBot says:</strong><br>${tips[tipIdx]}`;
  }, 4500);
}

// Add to bag stub
document.querySelectorAll('.add-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const text = btn.textContent;
    btn.textContent = 'Added ✓';
    btn.style.background = 'var(--green)';
    setTimeout(() => {
      btn.textContent = text;
      btn.style.background = '';
    }, 1400);
  });
});
