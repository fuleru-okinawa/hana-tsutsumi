(function () {
  const mount = document.getElementById('contact-form-mount');
  if (!mount) return;

  mount.innerHTML = `
    <form
      class="inquiry-form"
      action="https://formspree.io/f/mbdwyego"
      method="POST"
      accept-charset="UTF-8"
    >
      <input type="text" name="_gotcha" style="display:none" tabindex="-1" autocomplete="off">
      <div class="form-row">
        <label for="f-name">お名前</label>
        <input id="f-name" type="text" name="name" required placeholder="山田 花子">
      </div>
      <div class="form-row">
        <label for="f-email">メールアドレス</label>
        <input id="f-email" type="email" name="email" required placeholder="info@example.com">
      </div>
      <div class="form-row">
        <label for="f-purpose">ご相談内容</label>
        <select id="f-purpose" name="purpose">
          <option value="">選択してください</option>
          <option value="novelty">ノベルティ利用について</option>
          <option value="usage">お店に合う使い方について</option>
          <option value="other">その他</option>
        </select>
      </div>
      <div class="form-row">
        <label for="f-message">メッセージ（任意）</label>
        <textarea id="f-message" name="message" rows="4"
          placeholder="ご予算・本数・用途など、お気軽にご記入ください"></textarea>
      </div>
      <button type="submit" class="cta" style="margin-top:8px">
        送信する <span class="arrow"></span>
      </button>
    </form>
    <div class="inquiry-thanks" hidden>
      <svg class="inquiry-check" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="26" cy="26" r="25" stroke="currentColor" stroke-width="1.5"/>
        <polyline points="14,27 22,35 38,19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <p style="margin-top:20px">お問い合わせありがとうございます。</p>
      <p>3営業日以内にご連絡いたします。</p>
    </div>
    <p class="inquiry-error" hidden>送信に失敗しました。時間をおいて再度お試しください。</p>
  `;

  const form = mount.querySelector('.inquiry-form');
  const thanks = mount.querySelector('.inquiry-thanks');
  const errorMsg = mount.querySelector('.inquiry-error');
  const btn = form.querySelector('button[type="submit"]');

  function resetBtn() {
    btn.disabled = false;
    btn.innerHTML = '送信する <span class="arrow"></span>';
  }

  function fadeIn(el) {
    el.hidden = false;
    el.style.opacity = '0';
    el.style.transition = 'opacity 0.4s';
    requestAnimationFrame(() => { el.style.opacity = '1'; });
    setTimeout(() => { el.style.transition = ''; }, 420);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    btn.disabled = true;
    btn.textContent = '送信中…';
    thanks.hidden = true;
    errorMsg.hidden = true;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        form.reset();
        resetBtn();
        fadeIn(thanks);
      } else {
        resetBtn();
        fadeIn(errorMsg);
      }
    } catch {
      resetBtn();
      fadeIn(errorMsg);
    }
  });

  const style = document.createElement('style');
  style.textContent = `
    .inquiry-form {
      max-width: 520px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 28px;
    }
    .form-row {
      display: flex;
      flex-direction: column;
      gap: 6px;
      text-align: left;
    }
    .form-row label {
      font-size: 11px;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      font-family: var(--sans-en, sans-serif);
      color: var(--ink-mute, #999);
    }
    .form-row input,
    .form-row select,
    .form-row textarea {
      background: transparent;
      border: none;
      border-bottom: 1px solid color-mix(in srgb, var(--ink, #333) 25%, transparent);
      padding: 8px 0;
      font-size: 15px;
      font-family: var(--serif-jp, serif);
      color: var(--ink, #333);
      outline: none;
      width: 100%;
      transition: border-color 0.2s;
      -webkit-appearance: none;
      appearance: none;
    }
    .form-row input::placeholder,
    .form-row textarea::placeholder {
      color: color-mix(in srgb, var(--ink, #333) 30%, transparent);
      font-size: 13px;
    }
    .form-row input:focus,
    .form-row select:focus,
    .form-row textarea:focus {
      border-bottom-color: var(--ink, #333);
    }
    .form-row textarea { resize: vertical; min-height: 96px; }
    .form-row select { cursor: pointer; }
    .inquiry-thanks {
      max-width: 520px;
      margin: 32px auto 0;
      text-align: center;
      font-family: var(--serif-jp, serif);
      line-height: 2;
      color: var(--ink, #333);
    }
    .inquiry-thanks[hidden] { display: none; }
    .inquiry-check {
      width: 52px;
      height: 52px;
      color: var(--accent, #7a8268);
    }
    .inquiry-error {
      max-width: 520px;
      margin: 32px auto 0;
      text-align: center;
      font-size: 13px;
      color: #b94a48;
      font-family: var(--serif-jp, serif);
    }
    .inquiry-error[hidden] { display: none; }
    button[type="submit"]:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `;
  document.head.appendChild(style);
})();
