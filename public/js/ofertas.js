const tabla = document.getElementById('tablaOfertas');
const filtro = document.getElementById('filtroEstado');

const cargarOfertas = async () => {
    try {
    const estado = filtro?.value || 'todas';
    const res = await fetch(`/admin/ofertas?estado=${estado}`);
    const ofertas = await res.json();

    const tbody = tabla.querySelector('tbody');
    tbody.innerHTML = '';

    ofertas.forEach(oferta => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
        <td>${oferta.id}</td>
        <td>${oferta.rol}</td>
        <td>${oferta.descripcion}</td>
        <td>${new Date(oferta.fecha_publicacion).toLocaleDateString()}</td>
        <td>${new Date(oferta.fecha_cierre).toLocaleDateString()}</td>
        <td>${oferta.activo ? 'Activa' : 'Inactiva'}</td>
        <td>
            ${oferta.activo ?
            `<button class="btn-deshabilitar" data-id="${oferta.id}">Dar de baja</button>` :
            `<span class="text-muted">No editable</span>`}
        </td>
        `;
        tbody.appendChild(fila);
    });

    document.querySelectorAll('.btn-deshabilitar').forEach(btn => {
        btn.addEventListener('click', async () => {
        const id = btn.dataset.id;
        await fetch(`/admin/ofertas/${id}/desactivar`, { method: 'PUT' });
        cargarOfertas(); // recargar después
        });
    });
    } catch (err) {
        console.error('Error cargando ofertas:', err);
    }
};

// Filtros
filtro?.addEventListener('change', cargarOfertas);

cargarOfertas();

const modal = document.getElementById('modalCrearOferta');
const btnAbrir = document.getElementById('createOfertaBtn');
const btnCerrar = document.getElementById('cerrarModal');
const formCrear = document.getElementById('formCrearOferta');
const especialidadSelection = document.getElementById('especialidad-selection');
const especialidadId = document.getElementById('especialidadOferta');
const radiosRol = document.querySelectorAll('input[name="rol_id"]');

// Listener para mostrar/ocultar especialidad
radiosRol.forEach(radio => {
    radio.addEventListener('change', () => {
        if (radio.value === '3') { // 3 = Médico
            especialidadSelection.style.display = 'block';
        } else {
            especialidadSelection.style.display = 'none';
            especialidadId.value = '';
        }
    });
});

btnAbrir.addEventListener('click', async () => {
    try {
        const res = await fetch('/especialidad/listar');
        const especialidades = await res.json();
        especialidadId.innerHTML = '<option value="">Seleccione una especialidad</option>';
        especialidades.forEach(e => {
            const option = document.createElement('option');
            option.value = e.id;
            option.textContent = e.nombre;
            especialidadId.appendChild(option);
        });
    } catch (err) {
        console.error('Error cargando especialidades:', err);
        alert('Error al cargar especialidades');
    }
    modal.classList.remove('hidden');
});
btnCerrar.addEventListener('click', () => modal.classList.add('hidden'));

formCrear.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(formCrear);
    const data = Object.fromEntries(formData.entries());

    try {
        const res = await fetch('/admin/ofertas/crear', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await res.json(); // <-- agrega esto

        if (res.ok) {
            modal.classList.add('hidden');
            especialidadSelection.style.display = 'none';
            formCrear.reset();
            cargarOfertas(); // vuelve a listar
        } else {
            alert(result.error || 'Error al crear la oferta');
        }
    } catch (err) {
        console.error("Se produjo un error de red: "+err);
        alert('Error de red al crear oferta');
    }
});

// Oculta la selección de especialidad por defecto
especialidadSelection.style.display = 'none';