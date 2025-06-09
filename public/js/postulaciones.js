document.addEventListener('DOMContentLoaded', () => {
  const tabla = document.getElementById('tablaPostulaciones');
  const filtro = document.getElementById('filtroPostulacion');

  const cargarPostulaciones = async () => {
    try {
      const estado = filtro.value;
      const res = await fetch(`/admin/postulaciones${estado ? `?estado=${estado}` : ''}`);
      const postulaciones = await res.json();

      const tbody = tabla.querySelector('tbody');
      tbody.innerHTML = '';

      postulaciones.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${p.id}</td>
          <td>${p.nombre}</td>
          <td>${p.email}</td>
          <td>${p.oferta.rol}</td>
          <td>${p.oferta.descripcion}</td>
          <td>${new Date(p.fecha_postulacion).toLocaleDateString()}</td>
          <td>${p.estado}</td>
          <td><a class="btn-ver" href="${p.url_cv}" target="_blank">Ver CV</a></td>
          <td>
            ${p.estado === 'pendiente' ? `
              <button class="btn-accion btn-aceptar" data-id="${p.id}">Aceptar</button>
              <button class="btn-accion btn-rechazar" data-id="${p.id}">Rechazar</button>
            ` : ''}
          </td>
        `;
        tbody.appendChild(tr);
      });

      document.querySelectorAll('.btn-aceptar').forEach(btn => {
        btn.addEventListener('click', async () => {
          const id = btn.dataset.id;
          await fetch(`/admin/postulaciones/${id}/aceptar`, { method: 'PUT' });
          Toast.show('Postulación aceptada y usuario creado', 'success');
          setTimeout(() => location.reload(), 1000);
        });
      });

      document.querySelectorAll('.btn-rechazar').forEach(btn => {
        btn.addEventListener('click', async () => {
          const id = btn.dataset.id;
          await fetch(`/admin/postulaciones/${id}/rechazar`, { method: 'PUT' });
          cargarPostulaciones();
        });
      });

    } catch (err) {
      console.error('Error al cargar postulaciones:', err);
    }
  };

  filtro.addEventListener('change', cargarPostulaciones);
  cargarPostulaciones();
});