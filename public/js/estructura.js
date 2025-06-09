document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab');
  const panel = document.getElementById('estructuraPanel');

  tabs.forEach(tab => {
    tab.addEventListener('click', async () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const seccion = tab.dataset.section;
      panel.innerHTML = '<p>Cargando...</p>'; // Mensaje de carga
      // Limpiar el panel antes de cargar una nueva sección

      try {
        const res = await fetch(`/admin/estructura/${seccion}`);
        const html = await res.text();
        panel.innerHTML = html;
      } catch (err) {
        console.error('Error cargando sección:', err);
        panel.innerHTML = '<p>Error al cargar la sección.</p>';
      }
    });
  });
});
