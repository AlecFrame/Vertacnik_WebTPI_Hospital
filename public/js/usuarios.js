document.addEventListener('DOMContentLoaded', () => {
  const filtro = document.getElementById('filtroRol');

  const cargarUsuarios = async () => {
    try {
      const res = await fetch('/admin/usuarios');
      const usuarios = await res.json();

      const tbody = document.getElementById('usuariosTableBody');
      tbody.innerHTML = '';

      usuarios
        .filter(u => filtro.value === 'todos' || u.rol.toLowerCase() === filtro.value)
        .forEach(u => {
          const fila = document.createElement('tr');
          fila.innerHTML = `
            <td>${u.id}</td>
            <td>${u.dni}</td>
            <td>${u.nombre}</td>
            <td>${u.rol}</td>
            <td>${u.email}</td>
            <td>${u.telefono || '-'}</td>
            <td>${new Date(u.fecha_registro).toLocaleDateString()}</td>
            <td>${u.activo ? 'Sí' : 'No'}</td>
            <td>
              <button class="btn-estado" data-id="${u.id}">
                ${u.activo ? 'Desactivar' : 'Activar'}
              </button>
              <button class="btn-reset" data-id="${u.id}">Reiniciar Contraseña</button>
            </td>
          `;
          tbody.appendChild(fila);
        });

      agregarEventos();
    } catch (err) {
      console.error('Error cargando usuarios:', err);
    }
  };

  const agregarEventos = () => {
    // Activar / desactivar usuario
    document.querySelectorAll('.btn-estado').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.id;
        await fetch(`/admin/usuarios/${id}/estado`, { method: 'PUT' });
        cargarUsuarios();
      });
    });

    // Cambiar rol
    document.querySelectorAll('.select-rol').forEach(select => {
      select.addEventListener('change', async () => {
        const id = select.dataset.id;
        const nuevoRolId = select.value;
        await fetch(`/admin/usuarios/${id}/rol`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nuevoRolId })
        });
        cargarUsuarios();
      });
    });

    // Reiniciar contraseña
    document.querySelectorAll('.btn-reset').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.id;
        const confirmar = confirm('¿Seguro que quieres reiniciar la contraseña a "temporal123"?');
        if (!confirmar) return;

        const res = await fetch(`/admin/usuarios/${id}/reset-password`, { method: 'PUT' });
        const msg = await res.json();
        alert(msg.mensaje);
      });
    });
  };

  filtro.addEventListener('change', cargarUsuarios);

  cargarUsuarios();
});