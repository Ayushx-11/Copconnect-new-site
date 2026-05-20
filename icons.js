// CopConnect line-icon set. 24×24, stroke-based, inherits currentColor.
// Usage: <i data-icon="shield"></i>  — replaced inline on load.
(function () {
  const I = {
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z"/>',
    handshake: '<path d="M3 12l3-3 4 4M21 12l-3-3-4 4M8 13l3 3 5-5 2 2M2 10l4-4M22 10l-4-4"/>',
    megaphone: '<path d="M3 11v2a2 2 0 0 0 2 2h1l4 4V5L6 9H5a2 2 0 0 0-2 2zM14 8a5 5 0 0 1 0 8M18 5a9 9 0 0 1 0 14"/>',
    family: '<circle cx="9" cy="7" r="3"/><circle cx="17" cy="8" r="2"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2M15 21v-1a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v1"/>',
    school: '<path d="M3 21h18M5 21V10l7-4 7 4v11M9 21v-6h6v6M10 12h4"/>',
    building: '<path d="M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2M10 21v-4h4v4"/>',
    houses: '<path d="M2 21V10l5-4 5 4v11M12 21V13l5-4 5 4v8M2 21h20M6 17h2M16 17h2"/>',
    badge: '<circle cx="12" cy="9" r="5"/><path d="M9 13l-2 8 5-3 5 3-2-8M12 7v4M10 9h4"/>',
    document: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6z"/><path d="M14 3v6h6M8 13h8M8 17h6"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-5-5"/>',
    book: '<path d="M4 4v16a2 2 0 0 0 2 2h14V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2zM20 20H6a2 2 0 0 1-2-2 2 2 0 0 1 2-2h14"/>',
    alert: '<path d="M12 3a7 7 0 0 0-7 7v4l-2 3h18l-2-3v-4a7 7 0 0 0-7-7zM10 21a2 2 0 0 0 4 0"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .6 2.9a2 2 0 0 1-.5 2.1L7.9 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c1 .3 1.9.5 2.9.6a2 2 0 0 1 1.8 2.1z"/>',
    medal: '<circle cx="12" cy="14" r="6"/><path d="M8 10L5 3h14l-3 7M9 14l1.5 1.5L12 14M12 11v3"/>',
    chart: '<path d="M3 3v18h18M7 16l4-5 4 3 6-7"/>',
    tshirt: '<path d="M4 7l4-3h8l4 3-3 3-2-1v12H9V9L7 10z"/>',
    cap: '<path d="M3 12c0-5 4-8 9-8s9 3 9 8M3 12h18l-1 4H4zM12 4v8"/>',
    backpack: '<path d="M6 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8a4 4 0 0 0-4-4h-4a4 4 0 0 0-4 4zM10 4V3a2 2 0 0 1 4 0v1M6 14h12M9 17h6"/>',
    mug: '<path d="M4 6h12v10a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM16 9h2a3 3 0 0 1 0 6h-2"/>',
    journal: '<path d="M5 4v16a1 1 0 0 0 1 1h13V3H6a1 1 0 0 0-1 1zM9 3v18M12 8h4M12 12h4"/>',
    idcard: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M6 16c.5-1.5 1.5-2 3-2s2.5.5 3 2M15 10h4M15 13h3"/>',
    frame: '<rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 16l5-5 5 5 3-3 5 5"/>',
    gift: '<rect x="3" y="8" width="18" height="13" rx="1"/><path d="M3 12h18M12 8v13M8 8a2 2 0 1 1 0-4c2 0 4 4 4 4s2-4 4-4a2 2 0 1 1 0 4"/>',
    lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4M12 15v2"/>',
    lockKey: '<rect x="3" y="11" width="11" height="10" rx="2"/><path d="M6 11V7a4 4 0 0 1 8 0v4M18 8a3 3 0 1 0 0 6M18 11h4M21 11v3"/>',
    monitor: '<rect x="3" y="4" width="18" height="12" rx="1"/><path d="M8 20h8M12 16v4"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    pin: '<path d="M12 21s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
    check: '<path d="M4 12l5 5L20 6"/>',
    muscle: '<path d="M4 14c0-3 2-5 5-5h2l3-3a3 3 0 0 1 4 4l-3 3v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/>',
    graduate: '<path d="M2 9l10-4 10 4-10 4-10-4zM6 11v5c0 2 3 3 6 3s6-1 6-3v-5M22 10v5"/>',
    trophy: '<path d="M8 4h8v6a4 4 0 0 1-8 0zM8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M10 14v3h4v-3M8 21h8"/>',
    clipboard: '<rect x="6" y="4" width="12" height="17" rx="1"/><path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1M9 11h6M9 15h4"/>',
    users: '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20v-1a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1M15 20v-1a3 3 0 0 1 3-3h1a3 3 0 0 1 3 3v1"/>',
    brain: '<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 3 3M15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-3 3M12 4v16"/>',
    eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
    key: '<circle cx="8" cy="14" r="4"/><path d="M11 12l11-11M19 4l2 2M16 7l2 2"/>',
    play: '<polygon points="8,5 19,12 8,19" fill="currentColor" stroke="none"/>',
    arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    bell: '<path d="M12 3a6 6 0 0 0-6 6v4l-2 3h16l-2-3V9a6 6 0 0 0-6-6zM10 19a2 2 0 0 0 4 0"/>',
    rupee: '<path d="M6 4h12M6 8h12M9 4c4 0 4 8 0 8H6M6 12l8 8"/>',
    sparkles: '<path d="M12 3v6M12 15v6M3 12h6M15 12h6M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3"/>',
    heart: '<path d="M12 21s-8-5-8-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6-8 11-8 11h-2z" fill="none"/>',
    bag: '<path d="M5 8h14l-1 12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2zM8 8V6a4 4 0 0 1 8 0v2"/>',
    arrowUpRight: '<path d="M7 17L17 7M9 7h8v8"/>'
  };

  const NS = 'http://www.w3.org/2000/svg';
  function render() {
    document.querySelectorAll('[data-icon]').forEach(el => {
      const name = el.dataset.icon;
      const path = I[name];
      if (!path || el.querySelector('svg')) return;
      el.innerHTML = `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }

  // Re-render after dynamic content updates
  window.__renderIcons = render;
})();
