/** مسار الشعار الرسمي الأبيض الشفاف */
window.INEXC_LOGO = {
  primary: 'assets/images/inexc-logo-white.png',
  altPath: 'images/inexc-logo-white.png',
  fallback: 'assets/inexc-logo-white.png',
  alt: 'INEXC — Innovative Excellence'
};

window.inexcLogoOnError = function (img) {
  if (!img) return;
  if (!img.dataset.fallbackTried && img.dataset.fallback) {
    img.dataset.fallbackTried = '1';
    img.src = img.dataset.fallback;
    return;
  }
  img.style.display = 'none';
  img.removeAttribute('src');
};

window.inexcLogoHtml = function (extraClass) {
  const cls = 'inexc-logo logo-img' + (extraClass ? ' ' + extraClass : '');
  const L = window.INEXC_LOGO;
  return '<img src="' + L.primary + '" data-fallback="' + L.fallback + '" alt="' + L.alt + '" class="' + cls + '" onerror="inexcLogoOnError(this)" />';
};
