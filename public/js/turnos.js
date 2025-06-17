document.addEventListener('DOMContentLoaded', () => {
    const btnNuevoTurno = document.getElementById('nuevoTurno');
    const btnVerTurnos = document.getElementById('verTurnos');
    const sectionTurnos = document.getElementById('turnos-list');
    const sectionNuevo = document.getElementById('nuevo-turno');
    const tableBody = document.getElementById('turnosTableBody');
    const turnoForm = document.getElementById('turno-form');
    const doctorSelect = document.getElementById('doctor');
    const buscarBtn = document.getElementById('buscarPaciente');
    const dniInput = document.getElementById('dniPacienteTurno');
    const pacienteInfo = document.getElementById('pacienteInfo');
    const fechaHoraInput = document.getElementById('fechaHoraTurno');
    const motivoInput = document.getElementById('motivoTurno');
    const btnTurnoSubmit = document.getElementById('btnTurnoSubmit');

    let doctores = [];
    let pacienteId = null;

    // Cambiar entre secciones
    btnNuevoTurno.addEventListener('click', () => {
        sectionTurnos.style.display = 'none';
        sectionNuevo.style.display = 'block';
    });
    btnVerTurnos.addEventListener('click', () => {
        sectionNuevo.style.display = 'none';
        sectionTurnos.style.display = 'block';
        cargarTurnos();
    });
    buscarBtn.addEventListener('click', async () => {
        const dni = dniInput.value.trim();
        if (!dni) return;
        const res = await fetch('/paciente/buscar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dni })
        });
        const data = await res.json();
        if (data.paciente && data.usuario) {
            pacienteInfo.textContent = `${data.usuario.nombre} ${data.usuario.apellido}`;
            pacienteId = data.paciente.id;
            // Habilita el form para crear turno
            btnTurnoSubmit.disabled = false;
        } else {
            // Si no se encuentra el paciente, muestra mensaje y deshabilita el botón de crear turno
            btnTurnoSubmit.disabled = true;
            pacienteInfo.textContent = 'Paciente no encontrado. Debe crearlo en la sección de pacientes.';
            pacienteId = null;
        }
    });

    // Cargar lista de doctores para el select
    async function cargarDoctores() {
        doctorSelect.innerHTML = '<option value="">Seleccione un doctor</option>';
        try {
            const res = await fetch('/api/doctores'); // Debes crear este endpoint que devuelva todos los médicos con usuario y especialidad
            doctores = await res.json();
            doctores.forEach(medico => {
                const option = document.createElement('option');
                option.value = medico.id;
                option.textContent = `Dr. ${medico.usuario.nombre} ${medico.usuario.apellido} - ${medico.especialidad.nombre}`;
                doctorSelect.appendChild(option);
            });
        } catch (err) {
            doctorSelect.innerHTML = '<option value="">Error al cargar doctores</option>';
        }
    }

    // Cargar lista de turnos
    async function cargarTurnos() {
        tableBody.innerHTML = '';
        try {
            const res = await fetch('/turno/listar');
            const turnos = await res.json();
            turnos.forEach(turno => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${turno.medico ? `Dr. ${turno.medico.usuario.nombre} ${turno.medico.usuario.apellido} (${turno.medico.especialidad.nombre})` : '-'}</td>
                    <td>${turno.paciente ? `${turno.paciente.usuario.nombre} ${turno.paciente.usuario.apellido}` : '-'}</td>
                    <td>${new Date(turno.fechaHora).toLocaleString()}</td>
                    <td>${turno.motivo}</td>
                    <td>${turno.estado}</td>
                `;
                tableBody.appendChild(tr);
            });
        } catch (err) {
            tableBody.innerHTML = '<tr><td colspan="6">Error al cargar turnos</td></tr>';
        }
    }

    // Crear nuevo turno
    turnoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const medicoId = doctorSelect.value;
        const fechaHora = fechaHoraInput.value;
        const motivo = motivoInput.value.trim();

        if (!medicoId || !pacienteId || !fechaHora || !motivo) {
            alert('Completa todos los campos');
            return;
        }

        if (!pacienteId) {
            alert('Paciente no encontrado');
            return;
        }

        try {
            const res = await fetch('/turno/crear', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ medicoId, pacienteId, fechaHora, motivo })
            });
            const data = await res.json();
            if (res.ok) {
                alert('Turno creado');
                turnoForm.reset();
                sectionNuevo.style.display = 'none';
                sectionTurnos.style.display = 'block';
                cargarTurnos();
            } else {
                alert(data.error || 'Error al crear turno');
            }
        } catch (err) {
            alert('Error de red');
        }
    });

    // Inicialización
    sectionNuevo.style.display = 'none';
    sectionTurnos.style.display = 'block';
    btnTurnoSubmit.disabled = true; // Deshabilitar botón hasta que se busque un paciente
    cargarDoctores();
    cargarTurnos();
});