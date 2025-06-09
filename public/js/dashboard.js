document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.menu-item');
  const panels = document.querySelectorAll('.section-panel');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Quitar clase activa de botones
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Ocultar todos los paneles
      panels.forEach(panel => panel.classList.remove('active'));

      // Determinar qué panel mostrar
      const sectionMap = {
        'Inicio': 'inicio',
        'Mi perfil': 'mi-perfil',
        'Historial médico': 'historial',
        'Recetas': 'recetas',
        'Turnos asignados': 'turnos',
        'Usuarios': 'usuarios',
        'Pacientes': 'pacientes',
        'Ofertas': 'ofertas',
        'Postulaciones': 'postulaciones',
        'Estructura Hospitalaria': 'hospital'
      };

      const selectedSection = sectionMap[btn.innerText.trim()];
      const targetPanel = document.querySelector(`.section-panel[data-section="${selectedSection}"]`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
});
