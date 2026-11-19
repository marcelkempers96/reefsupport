// Progressive enhancement for forms marked data-async-form: POST via fetch and show an
// on-page confirmation. Without JS the form posts normally to its action.
document.querySelectorAll<HTMLFormElement>('form[data-async-form]').forEach((form) => {
  const status = form.querySelector<HTMLElement>('[data-form-status]');
  form.addEventListener('submit', async (e) => {
    const action = form.getAttribute('action');
    if (!action || action === '#') {
      e.preventDefault();
      if (status) status.textContent = 'This form has no endpoint configured yet.';
      return;
    }
    e.preventDefault();
    const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    const label = btn?.textContent ?? '';
    btn?.setAttribute('disabled', '');
    form.setAttribute('aria-busy', 'true');
    if (btn) btn.textContent = 'Sending';
    if (status) status.textContent = '';
    try {
      // JSON body works for FormSubmit's /ajax/ endpoint and for Formspree.
      const body = JSON.stringify(Object.fromEntries(new FormData(form)));
      const res = await fetch(action, { method: 'POST', body, headers: { 'Content-Type': 'application/json', Accept: 'application/json' } });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === 'false' || data.success === false) throw new Error(String(res.status));
      form.reset();
      const done = Object.assign(document.createElement('p'), {
        className: 'form-done',
        textContent: form.dataset.success ?? 'Thanks.',
        tabIndex: -1,
      });
      done.setAttribute('role', 'status');
      form.replaceChildren(done);
      form.removeAttribute('aria-busy');
      done.focus({ preventScroll: true });
      done.scrollIntoView({ block: 'nearest' });
    } catch {
      if (status) status.textContent = 'Sorry, the message could not be sent. Your text is still in the form, so please try again in a moment.';
      form.removeAttribute('aria-busy');
      if (btn) { btn.textContent = label; btn.removeAttribute('disabled'); }
    }
  });
});
