const btnRegistrarPaciente = document.getElementById('btnRegistrarPaciente');
const btnListaPacientes = document.getElementById('btnListaPacientes');
const sectionListaPacientes = document.getElementById('sectionListaPacientes');
const sectionFormPaciente = document.getElementById('sectionFormPaciente');
const tableBody = document.getElementById('pacientesTableBody');
const pacienteForm = document.getElementById('paciente-form');
const inputDniPaciente = document.getElementById('dniPacienteP');
const inputNombrePaciente = document.getElementById('nombrePacienteP');
const inputApellidoPaciente = document.getElementById('apellidoPacienteP');
const inputEmailPaciente = document.getElementById('emailPacienteP');
const inputFechaNacimientoPaciente = document.getElementById('fechaNacimientoP');
const inputGeneroPaciente = document.getElementById('generoP');
const inputTelefonoPaciente = document.getElementById('telefonoPacienteP');
const inputDireccionPaciente = document.getElementById('direccionP');
const inputContactoEmergencia = document.getElementById('contactos_emergenciaP');
const inputGrupoSanguineo = document.getElementById('grupo_sanguineoP');
const inputObraSocial = document.getElementById('obra_socialP');
const inputAlergias = document.getElementById('alergiasP');
const btnPacienteSubmit = document.getElementById('btnPacienteSubmit');

let pacientes = [];
// Cambiar entre secciones
btnRegistrarPaciente.addEventListener('click', () => {
    sectionListaPacientes.style.display = 'none';
    sectionFormPaciente.style.display = 'block';
    pacienteForm.reset();
    btnPacienteSubmit.textContent = 'Registrar Paciente';
});
btnListaPacientes.addEventListener('click', () => {
    sectionFormPaciente.style.display = 'none';
    sectionListaPacientes.style.display = 'block';
    cargarPacientes();
});

// Cargar lista de pacientes
async function cargarPacientes() {
    tableBody.innerHTML = '';
    try {
        const res = await fetch('/paciente/listar');
        pacientes = await res.json();
        pacientes.forEach(paciente => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${paciente.usuario.dni}</td>
                <td>${paciente.usuario.nombre}</td>
                <td>${paciente.usuario.apellido}</td>
                <td>${paciente.usuario.email}</td>
                <td>${new Date(paciente.fecha_nacimiento).toLocaleDateString()}</td>
                <td>${paciente.genero}</td>
                <td>${paciente.telefono}</td>
                <td>${paciente.direccion}</td>
                <td>${paciente.grupo_sanguineo}</td>
                <td>${paciente.obra_social}</td>`;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error al cargar pacientes:', error);
        tableBody.innerHTML = '<tr><td colspan="10">Error al cargar turnos</td></tr>';
    }
};

// Registrar paciente
pacienteForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    btnPacienteSubmit.disabled = true;
    btnPacienteSubmit.textContent = 'Registrando...';
    // Validar campos
    const dni = inputDniPaciente.value.trim();
    const nombre = inputNombrePaciente.value.trim();
    const apellido = inputApellidoPaciente.value.trim();
    const email = inputEmailPaciente.value.trim();
    const fechaNacimiento = inputFechaNacimientoPaciente.value;
    const genero = inputGeneroPaciente.value;
    const telefono = inputTelefonoPaciente.value.trim();
    const direccion = inputDireccionPaciente.value.trim();
    const contactosEmergencia = inputContactoEmergencia.value.trim();
    const grupoSanguineo = inputGrupoSanguineo.value;
    const obraSocial = inputObraSocial.value.trim();
    const alergias = inputAlergias.value.trim();

    if (!dni || !nombre || !apellido || !email || !fechaNacimiento || !genero || !telefono || !direccion) {
        Toast.show('Completa todos los campos obligatorios', "warning");
        return;
    }

    try {
        const res = await fetch('/paciente/crear', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                dni, nombre, apellido, email, fecha_nacimiento: fechaNacimiento,
                genero, telefono, direccion, contactos_emergencia: contactosEmergencia,
                grupo_sanguineo: grupoSanguineo, obra_social: obraSocial, alergias
            })
        });
        if (res.ok) {
            Toast.show('Paciente registrado correctamente', "success");
            pacienteForm.reset();
            btnPacienteSubmit.disabled = false;
            btnPacienteSubmit.textContent = 'Registrar Paciente';
            sectionFormPaciente.style.display = 'none';
            sectionListaPacientes.style.display = 'block';
            cargarPacientes();
        } else {
            const errorData = await res.json();
            console.error('Error al registrar paciente:', errorData);
            Toast.show(errorData.error || 'Error al registrar paciente', "error");
        }
    } catch (error) {
        console.error('Error al registrar paciente:', error);
        Toast.show('Error de red al registrar paciente', "error");
    }
});

// Inicializar la lista de pacientes al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    sectionListaPacientes.style.display = 'block';
    sectionFormPaciente.style.display = 'none';
    cargarPacientes();
});