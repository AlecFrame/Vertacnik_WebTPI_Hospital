document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (res.ok) {
        window.location.href = result.redirect;
      } else {
        Toast.show(result.error || 'Credenciales incorrectas', 'error');
      }
    } catch (err) {
      console.error(err);
      Toast.show('Fallo de red o servidor', 'error');
    }
  });
});
