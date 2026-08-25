/* ═══════════════════════════════════════════════════════════════
   Zwei-Klick-Lösung für eingebettete Karten
   ───────────────────────────────────────────────────────────────
   Kartendienste (OpenStreetMap, Google Maps) übertragen beim Laden
   die IP-Adresse der Besucherin an den Anbieter. Ohne Einwilligung
   ist das in der EU heikel. Deshalb wird die Karte erst nach einem
   ausdrücklichen Klick nachgeladen; bis dahin steht dort nur eine
   lokale Vorschaufläche.

   Anwendung: <iframe data-karte-src="…"> statt <iframe src="…">
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var ANBIETER = [
    { muster: 'openstreetmap.org', name: 'OpenStreetMap',
      datenschutz: 'https://wiki.osmfoundation.org/wiki/Privacy_Policy' },
    { muster: 'google.com',        name: 'Google Maps',
      datenschutz: 'https://policies.google.com/privacy' }
  ];

  function anbieterFuer(url) {
    for (var i = 0; i < ANBIETER.length; i++) {
      if (url.indexOf(ANBIETER[i].muster) !== -1) return ANBIETER[i];
    }
    return { name: 'dem Kartenanbieter', datenschutz: null };
  }

  function aufbauen(iframe) {
    var quelle = iframe.getAttribute('data-karte-src');
    if (!quelle) return;

    var anbieter = anbieterFuer(quelle);
    var huelle = document.createElement('div');
    huelle.className = 'karte-consent';
    huelle.innerHTML =
      '<div class="karte-consent-inner">' +
        '<svg class="karte-consent-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
          '<path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11z" stroke="currentColor" stroke-width="1.3"/>' +
          '<circle cx="12" cy="10" r="2.4" stroke="currentColor" stroke-width="1.3"/>' +
        '</svg>' +
        '<p class="karte-consent-text">' +
          'Hier liegt eine Karte von <strong>' + anbieter.name + '</strong>. ' +
          'Beim Laden wird Ihre IP-Adresse an ' + anbieter.name + ' übertragen.' +
        '</p>' +
        '<button type="button" class="karte-consent-btn">Karte laden</button>' +
        (anbieter.datenschutz
          ? '<a class="karte-consent-link" href="' + anbieter.datenschutz +
            '" target="_blank" rel="noopener noreferrer">Datenschutzhinweise ' + anbieter.name + '</a>'
          : '') +
      '</div>';

    iframe.parentNode.insertBefore(huelle, iframe);
    iframe.style.display = 'none';

    huelle.querySelector('.karte-consent-btn').addEventListener('click', function () {
      iframe.setAttribute('src', quelle);
      iframe.removeAttribute('data-karte-src');
      iframe.style.display = '';
      huelle.parentNode.removeChild(huelle);
    });
  }

  function start() {
    var liste = document.querySelectorAll('iframe[data-karte-src]');
    for (var i = 0; i < liste.length; i++) aufbauen(liste[i]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
