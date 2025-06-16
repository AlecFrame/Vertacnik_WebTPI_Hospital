document.addEventListener('DOMContentLoaded', () => {
    const tabla = document.getElementById('tabla');

    const cargarAdmisiones = async () => {
        try {
            const res = await fetch('/admision/mis-admisiones');
            const admisiones = await res.json();

            const tbody = tabla.querySelector('tbody');
            tbody.innerHTML = '';

            admisiones.forEach(a => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${new Date(a.fecha).toLocaleDateString()}</td>
                    <td>${a.paciente.usuario.dni}</td>
                    <td>${a.paciente.usuario.nombre} ${a.paciente.usuario.apellido}</td>
                    <td>${a.tipoIngreso}</td>
                    <td>${a.unidad.nombre}</td>
                    <td>${a.cama.numero}</td>
                    <td>${a.estado}</td>
                `;
                tbody.appendChild(tr);
            });
        } catch (err) {
            console.error('Error al cargar admisiones:', err);
        }
    };

    cargarAdmisiones();
});