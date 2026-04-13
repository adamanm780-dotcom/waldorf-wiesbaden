/* ══════════════════════════════════════════════════════════════
   WALDORF WIESBADEN — Cookie Consent Banner
   Vanilla JS · DSGVO-konform · Kein externes Framework
══════════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  // Bereits akzeptiert? → nichts anzeigen
  if (localStorage.getItem('waldorf_cookie_consent')) return;

  // ── Banner HTML ──────────────────────────────────────────
  const banner = document.createElement('div');
  banner.id = 'cookieBanner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', 'Cookie-Hinweis');
  banner.innerHTML = `
    <div class="cb-inner">
      <div class="cb-text">
        <div class="cb-icon" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <circle cx="8" cy="9" r="1.2" fill="currentColor" stroke="none"/>
            <circle cx="15" cy="8" r="1" fill="currentColor" stroke="none"/>
            <circle cx="10" cy="14" r="1.4" fill="currentColor" stroke="none"/>
            <circle cx="16" cy="13" r=".9" fill="currentColor" stroke="none"/>
            <circle cx="13" cy="17" r="1.1" fill="currentColor" stroke="none"/>
          </svg>
        </div>
        <p>Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten. <strong>Notwendige Cookies</strong> sind für die Grundfunktionen erforderlich. Zusätzliche Cookies helfen uns, die Website zu verbessern. <a href="impressum.html">Mehr erfahren</a></p>
      </div>
      <div class="cb-actions">
        <button id="cbNecessary" class="cb-btn cb-btn-necessary">Nur Notwendige</button>
        <button id="cbAccept" class="cb-btn cb-btn-accept">Alle akzeptieren</button>
      </div>
    </div>
  `;

  // ── Styles ──────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    #cookieBanner {
      position: fixed;
      bottom: 0; left: 0; right: 0;
      z-index: 99998;
      padding: 0 24px 24px;
      pointer-events: none;
      opacity: 0;
      transform: translateY(20px);
      animation: cbSlideIn .6s cubic-bezier(.16,1,.3,1) .8s forwards;
    }
    @keyframes cbSlideIn {
      to { opacity: 1; transform: translateY(0); pointer-events: auto; }
    }
    #cookieBanner.cb-exit {
      animation: cbSlideOut .4s cubic-bezier(.55,.06,.68,.19) forwards;
    }
    @keyframes cbSlideOut {
      to { opacity: 0; transform: translateY(30px); pointer-events: none; }
    }
    .cb-inner {
      max-width: 680px;
      margin: 0 auto;
      background: rgba(15,8,24,.92);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid rgba(166,118,173,.15);
      border-radius: 18px;
      padding: 22px 28px;
      display: flex;
      align-items: center;
      gap: 24px;
      box-shadow: 0 8px 48px rgba(0,0,0,.35), 0 0 0 1px rgba(166,118,173,.08);
      pointer-events: auto;
    }
    .cb-text {
      display: flex;
      align-items: flex-start;
      gap: 14px;
      flex: 1;
    }
    .cb-icon {
      flex-shrink: 0;
      width: 36px; height: 36px;
      display: flex; align-items: center; justify-content: center;
      background: rgba(166,118,173,.12);
      border-radius: 10px;
      color: #c8a8d2;
    }
    .cb-text p {
      font-family: 'Inter', -apple-system, sans-serif;
      font-size: 12.5px;
      line-height: 1.7;
      color: rgba(255,255,255,.6);
      font-weight: 300;
      margin: 0;
    }
    .cb-text p strong {
      color: rgba(255,255,255,.85);
      font-weight: 500;
    }
    .cb-text p a {
      color: #c8a8d2;
      text-decoration: none;
      transition: color .2s;
    }
    .cb-text p a:hover {
      color: #fff;
      text-decoration: underline;
    }
    .cb-actions {
      flex-shrink: 0;
      display: flex;
      gap: 10px;
    }
    .cb-btn {
      font-family: 'Lora', serif;
      font-size: 12.5px;
      font-style: italic;
      letter-spacing: .04em;
      border: none;
      cursor: pointer;
      border-radius: 60px;
      padding: 10px 26px;
      transition: all .3s ease;
    }
    .cb-btn-necessary {
      background: transparent;
      color: rgba(255,255,255,.55);
      border: 1.5px solid rgba(255,255,255,.15);
    }
    .cb-btn-necessary:hover {
      border-color: rgba(255,255,255,.35);
      color: rgba(255,255,255,.85);
      transform: translateY(-1px);
    }
    .cb-btn-accept {
      background: #a676ad;
      color: #fff;
      box-shadow: 0 4px 18px rgba(166,118,173,.4);
    }
    .cb-btn-accept:hover {
      background: #7a4e87;
      transform: translateY(-1px);
      box-shadow: 0 6px 24px rgba(166,118,173,.55);
    }

    @media (max-width: 600px) {
      #cookieBanner { padding: 0 12px 12px; }
      .cb-inner {
        flex-direction: column;
        padding: 20px 22px;
        gap: 16px;
      }
      .cb-actions { width: 100%; }
      .cb-btn { width: 100%; text-align: center; }
    }
  `;

  // ── In DOM einfügen ─────────────────────────────────────
  document.head.appendChild(style);
  document.body.appendChild(banner);

  // ── Events ──────────────────────────────────────────────
  function closeBanner(consent) {
    localStorage.setItem('waldorf_cookie_consent', consent);
    banner.classList.add('cb-exit');
    setTimeout(function() { banner.remove(); }, 500);
  }

  document.getElementById('cbAccept').addEventListener('click', function() {
    closeBanner('all');
  });

  document.getElementById('cbNecessary').addEventListener('click', function() {
    closeBanner('necessary');
  });
})();
