/* Nav-Dropdown: bleibt 400ms sichtbar nach Mouseleave */
(function () {
  var DELAY = 400;
  var items = document.querySelectorAll('.nav-links li.has-drop');

  items.forEach(function (li) {
    var timer = null;

    li.addEventListener('mouseenter', function () {
      clearTimeout(timer);
      // close other open dropdowns immediately
      items.forEach(function (other) {
        if (other !== li) other.classList.remove('drop-open');
      });
      li.classList.add('drop-open');
    });

    li.addEventListener('mouseleave', function () {
      timer = setTimeout(function () {
        li.classList.remove('drop-open');
      }, DELAY);
    });
  });

  // close all on click outside nav
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav-links')) {
      items.forEach(function (li) { li.classList.remove('drop-open'); });
    }
  });
})();
