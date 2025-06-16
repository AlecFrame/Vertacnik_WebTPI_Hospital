function cambiarFase(faseActual, faseNueva) {
  faseActual.classList.remove('visible');
  faseActual.style.display = 'none';

  faseNueva.style.display = 'block';
  faseNueva.classList.add('visible');
}

const tipoIngreso = document.getElementById('tipoIngreso');
const campoDerivacion = document.getElementById('campoDerivacion');
const dniPaciente = document.getElementById('dniPaciente');
const turnoInfo = document.getElementById('turnoInfo');
const turnoDetalles = document.getElementById('turnoDetalles');
const turnoId = document.getElementById('turnoId');
const btnSiguiente = document.getElementById('siguienteFase1');

tipoIngreso.addEventListener('change', async () => {
  const valor = tipoIngreso.value;

  // Oculta todo primero
  campoDerivacion.style.display = 'none';
  turnoInfo.style.display = 'none';
  turnoDetalles.textContent = '';
  turnoId.value = '';
  btnSiguiente.disabled = true;

  if (valor === 'Derivado') {
    campoDerivacion.style.display = 'block';
    btnSiguiente.disabled = false;
  }

  if (valor === 'Emergencia') {
    btnSiguiente.disabled = false;
  }

  if (valor === 'Cita') {
    const dni = dniPaciente.value.trim();
    if (dni.length > 0) {
      const res = await fetch('/admision/buscar-turno', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ dni })
      });
      const data = await res.json();

      if (data.turno) {
        turnoInfo.style.display = 'block';
        turnoDetalles.textContent = `Turno con ${data.turno.medico}, hora: ${data.turno.fechaHora}`;
        turnoId.value = data.turno.id;
        btnSiguiente.disabled = false;
      } else {
        turnoInfo.style.display = 'block';
        turnoDetalles.textContent = 'No se encontró un turno válido. Por favor registre uno manualmente.';
        btnSiguiente.disabled = false;
      }
    }
  }
});

dniPaciente.addEventListener('blur', () => {
  // Forzar nueva búsqueda si ya se había seleccionado "Cita"
  if (tipoIngreso.value === 'Cita') {
    tipoIngreso.dispatchEvent(new Event('change'));
  }
});

const unidadIdSelect = document.getElementById('unidadId');
const camaIdSelect = document.getElementById('camaId');

// Cargar unidades al entrar a la Fase 3
async function cargarUnidades() {
  const res = await fetch('/unidad/listar');
  const unidades = await res.json();

  unidadIdSelect.innerHTML = '<option value="">Seleccione una unidad</option>';
  unidades.forEach(unidad => {
      const option = document.createElement('option');
      option.value = unidad.id;
      option.textContent = unidad.nombre;
      unidadIdSelect.appendChild(option);
  });
}

// Al cambiar de unidad, buscar camas disponibles
unidadIdSelect.addEventListener('change', async () => {
    const unidadId = unidadIdSelect.value;
    camaIdSelect.innerHTML = '<option value="">Seleccione una cama</option>';
    camaIdSelect.disabled = true;

    if (!unidadId) return;

    const res = await fetch(`/unidad/${unidadId}/camas`);
    const camas = await res.json();

    if (camas.length > 0) {
        camas.forEach(cama => {
        const option = document.createElement('option');
        option.value = cama.id;
        option.textContent = `Cama ${cama.numero}`;
        camaIdSelect.appendChild(option);
        });
        camaIdSelect.disabled = false;
    } else {
        const option = document.createElement('option');
        option.textContent = 'No hay camas disponibles';
        camaIdSelect.appendChild(option);
    }
});

const fase1 = document.getElementById('fase-1');
const fase2 = document.getElementById('fase-2');
const fase3 = document.getElementById('fase-3');

const siguienteFase1 = document.getElementById('siguienteFase1');
const siguienteFase2 = document.getElementById('siguienteFase2');
const anteriorFase2 = document.getElementById('anteriorFase2');
const anteriorFase3 = document.getElementById('anteriorFase3');

console.log('Fase 1:', fase1);
console.log('Fase 2:', fase2); 

anteriorFase2.addEventListener('click', () => cambiarFase(fase2, fase1));
anteriorFase3.addEventListener('click', () => cambiarFase(fase3, fase2));

const pacienteIdInput = document.getElementById('pacienteId');
const nombrePaciente = document.getElementById('nombrePaciente');
const apellidoPaciente = document.getElementById('apellidoPaciente');
const fechaNacimiento = document.getElementById('fechaNacimiento');
const genero = document.getElementById('genero');
const telefono = document.getElementById('telefono');
const direccion = document.getElementById('direccion');
const contactos_emergencia = document.getElementById('contactos_emergencia');
const grupo_sanguineo = document.getElementById('grupo_sanguineo');
const obraSocial = document.getElementById('obra_social');
const alergias = document.getElementById('alergias');

siguienteFase1.addEventListener('click', async () => {
  if (checkNoIdentificable.checked) {
    // Paciente no identificable: rellena y deshabilita campos
    nombrePaciente.value = 'No identificado';
    apellidoPaciente.value = 'No identificado';
    fechaNacimiento.value = '';
    genero.value = '';
    telefono.value = '';
    direccion.value = '';
    contactos_emergencia.value = '';
    grupo_sanguineo.value = '';
    obraSocial.value = '';
    alergias.value = '';

    // Deshabilita los campos excepto motivo
    [
      nombrePaciente, apellidoPaciente, fechaNacimiento, genero,
      telefono, direccion, contactos_emergencia, grupo_sanguineo,
      obraSocial, alergias
    ].forEach(input => input.disabled = true);

    cambiarFase(fase1, fase2);
    return;
  }else {
    [
      nombrePaciente, apellidoPaciente, fechaNacimiento, genero,
      telefono, direccion, contactos_emergencia, grupo_sanguineo,
      obraSocial, alergias
    ].forEach(input => input.disabled = false);
  }
  
  const dni = dniPaciente.value.trim();
  if (dni.length === 0) return;

  const res = await fetch('/paciente/buscar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ dni })
  });
  const data = await res.json();

  if (data.paciente) {
      // Rellenar campos
      pacienteIdInput.value = data.paciente.id;
      nombrePaciente.value = data.usuario.nombre;
      apellidoPaciente.value = data.usuario.apellido;
      fechaNacimiento.value = data.paciente.fecha_nacimiento?.slice(0, 10); // para input date
      genero.value = data.paciente.genero;
      telefono.value = data.paciente.telefono;
      direccion.value = data.paciente.direccion;
      contactos_emergencia.value = data.paciente.contactos_emergencia || '';
      grupo_sanguineo.value = data.paciente.grupo_sanguineo || '';
      obraSocial.value = data.paciente.obra_social;
      alergias.value = data.paciente.alergias || '';
  } else {
      // Limpiar campos
      pacienteIdInput.value = '';
      nombrePaciente.value = '';
      apellidoPaciente.value = '';
      fechaNacimiento.value = '';
      genero.value = '';
      telefono.value = '';
      direccion.value = '';
      contactos_emergencia.value = '';
      grupo_sanguineo.value = '';
      obraSocial.value = '';
      alergias.value = '';
  }

  cambiarFase(fase1, fase2);
});

siguienteFase2.addEventListener('click', async () => {
  const datosPaciente = {
    id: pacienteIdInput.value || null,
    nombre: nombrePaciente.value,
    apellido: apellidoPaciente.value,
    fecha_nacimiento: fechaNacimiento.value,
    genero: genero.value,
    telefono: telefono.value,
    direccion: direccion.value,
    contactos_emergencia: contactos_emergencia.value,
    grupo_sanguineo: grupo_sanguineo.value,
    obra_social: obraSocial.value,
    alergias: alergias.value,
    dni: dniPaciente.value
  };

  const res = await fetch('/paciente/guardar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datosPaciente)
  });

  const data = await res.json();

  if (data.paciente) {
    pacienteIdInput.value = data.paciente.id; // asegurarse de tenerlo para admisión
    await cargarUnidades();
    cambiarFase(fase2, fase3);
  } else {
    // Mostrar error con toast o alert
    Toast.show('Error al guardar paciente.', 'error');
    console.error('Error al guardar paciente');
  }
});

// Submit del formulario de admisión
const admissionForm = document.getElementById('admission-form');
const btnSubmit = document.getElementById('btnSubmitAdmision');

admissionForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  btnSubmit.disabled = true;

  const datos = {
    pacienteId: pacienteIdInput.value,
    tipoIngreso: tipoIngreso.value,
    motivo: document.getElementById('motivo').value,
    unidadId: unidadIdSelect.value,
    camaId: camaIdSelect.value
  };

  try {
    const res = await fetch('/admision/crear', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });
    const data = await res.json();

    if (res.ok && data.admision) {
      Toast.show('Admisión creada exitosamente', 'success');
      setTimeout(() => window.location.reload(), 1500);
    } else {
      Toast.show(data.error || 'Error al crear la admisión', 'error');
      btnSubmit.disabled = false;
    }
  } catch (err) {
    Toast.show('Error de red al crear la admisión', 'error');
    btnSubmit.disabled = false;
  }
});

// Tipo no identificable
const checkNoIdentificable = document.getElementById('noIdentificable');

checkNoIdentificable.addEventListener('change', async function() {
  if (this.checked) {
    tipoIngreso.value = 'Emergencia';
    tipoIngreso.disabled = true;
    dniPaciente.disabled = true;
    btnSiguiente.disabled = false;

    // Pide al backend un DNI temporal
    const res = await fetch('/paciente/generar-dni-temporal');
    const data = await res.json();
    dniPaciente.value = data.dniTemporal;
  } else {
    tipoIngreso.disabled = false;
    dniPaciente.disabled = false;
    dniPaciente.value = '';
    btnSiguiente.disabled = true;
  }
});