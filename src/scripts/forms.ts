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
    btn?.setAttribute('disabled', '');
    try {
      const res = await fetch(action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      const done = form.dataset.success ?? 'Thanks.';
      form.replaceChildren(Object.assign(document.createElement('p'), { className: 'form-done', textContent: done, role: 'status' }));
    } catch {
      if (status) status.textContent = 'Sorry, the message could not be sent. Please try again or email us directly.';
      btn?.removeAttribute('disabled');
    }
  });
});
