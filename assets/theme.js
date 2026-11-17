// Sáng / Tối / Theo máy, like the app's "Giao diện". The choice stays in
// this browser only (localStorage); "Theo máy" forgets it. The inline
// script in each page's <head> applies a saved choice before first paint.
(function () {
  var root = document.documentElement;
  var group = document.querySelector('.mode');
  if (!group) return;
  var buttons = group.querySelectorAll('button');
  var dark = window.matchMedia('(prefers-color-scheme: dark)');
  var metas = document.querySelectorAll('meta[name="theme-color"]');

  function paint() {
    var mode = root.getAttribute('data-theme') || 'system';
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('aria-pressed', String(buttons[i].getAttribute('data-mode') === mode));
    }
    var isDark = mode === 'dark' || (mode === 'system' && dark.matches);
    for (var j = 0; j < metas.length; j++) {
      metas[j].setAttribute('content', isDark ? '#191815' : '#F6F0E3');
    }
  }

  function choose(mode) {
    if (mode === 'light' || mode === 'dark') root.setAttribute('data-theme', mode);
    else root.removeAttribute('data-theme');
    try {
      if (mode === 'light' || mode === 'dark') localStorage.setItem('mam-theme', mode);
      else localStorage.removeItem('mam-theme');
    } catch (e) {}
    paint();
  }

  for (var k = 0; k < buttons.length; k++) {
    buttons[k].addEventListener('click', function () { choose(this.getAttribute('data-mode')); });
  }
  if (dark.addEventListener) dark.addEventListener('change', paint);
  group.hidden = false;
  paint();
})();
