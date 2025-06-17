const medicosTableBody = document.getElementById('medicosTableBody');

let medicos = [];

const cargarMedicos = async () => {
    try {
        const response = await fetch('/medico/listar');
        if (!response.ok) {
            throw new Error('Error al cargar los médicos');
        }
        medicos = await response.json();
        medicosTableBody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos
        medicos.forEach(medico => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${medico.usuario.dni}</td>
                <td>${medico.usuario.nombre} ${medico.usuario.apellido}</td>
                <td>${medico.especialidad.nombre}</td>
                <td>${medico.matricula}</td>
                <td>${medico.usuario.email}</td>
                <td>${medico.usuario.telefono}</td>
                <td>${medico.usuario.activo ? 'Activo' : 'Inactivo'}</td>
            `;
            medicosTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error al cargar médicos:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    cargarMedicos();
});