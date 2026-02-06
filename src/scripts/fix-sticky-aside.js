// Script para mover y fijar dinámicamente el aside de noticias
const SELECTOR = '#noticia-individual #titles';
const BREAKPOINT = 1024;
let placeholder = null;
let moved = false;
let aside = null;

function applySticky() {
  if (window.innerWidth < BREAKPOINT) {
    removeSticky();
    return;
  }

  const el = document.querySelector(SELECTOR);
  if (!el) return;
  aside = el;

  if (moved) {
    updatePosition();
    return;
  }

  const rect = aside.getBoundingClientRect();
  const originalParent = aside.parentNode;

  // placeholder para mantener el flujo
  placeholder = document.createElement('div');
  placeholder.className = 'cr-sticky-placeholder';
  placeholder.style.width = rect.width + 'px';
  placeholder.style.height = rect.height + 'px';
  originalParent.insertBefore(placeholder, aside);

  // mover aside al body y fijarlo
  document.body.appendChild(aside);
  aside.style.position = 'fixed';
  // calcular top en base a la altura del navbar
  const navbar = document.getElementById('navbar');
  const navHeight = navbar ? navbar.getBoundingClientRect().height : 64;
  const computedTop = navHeight + 8; // 8px de separación
  aside.style.top = computedTop + 'px';
  aside.style.left = rect.left + 'px';
  aside.style.width = rect.width + 'px';
  aside.style.zIndex = '999';

  moved = true;
}

function updatePosition() {
  if (!moved || !placeholder || !aside) return;
  const rect = placeholder.getBoundingClientRect();
  aside.style.left = rect.left + 'px';
  aside.style.width = rect.width + 'px';
}

function removeSticky() {
  if (!moved || !aside || !placeholder) return;
  // restaurar al lugar original
  placeholder.parentNode.insertBefore(aside, placeholder);
  placeholder.parentNode.removeChild(placeholder);
  placeholder = null;
  aside.style.position = '';
  aside.style.top = '';
  aside.style.left = '';
  aside.style.width = '';
  aside.style.zIndex = '';
  moved = false;
  aside = null;
}

let resizeTimer = null;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (moved) updatePosition();
    applySticky();
  }, 120);
});

window.addEventListener('scroll', () => {
  if (moved) window.requestAnimationFrame(updatePosition);
});

document.addEventListener('DOMContentLoaded', () => {
  applySticky();
  // recalcular top si la altura del navbar cambia (por ejemplo en responsive)
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const ro = new ResizeObserver(() => applySticky());
    ro.observe(navbar);
  }
});

// Export nothing; file is imported as module
