const form = document.getElementById('formPostulacion');
const inputs = form.querySelectorAll('input, textarea');
const sectionMatriculaMedica = document.getElementById('matricula-medica');
const botones = document.querySelectorAll('.btn-postular');
let oferta = null;

botones.forEach(btn => {
  btn.addEventListener('click', () => {
    const ofertaId = btn.dataset.id;
    form.oferta_id.value = ofertaId;
    form.classList.remove('hidden');
    oferta = obtenerOfertaPorId(ofertaId);
    oferta.then(data => {
      sectionMatriculaMedica.classList.toggle('hidden', data.rol.tipo !== 'Médico');
    });
    form.scrollIntoView({ behavior: 'smooth' });
  });
});

// Obtener oferta por id
const obtenerOfertaPorId = async (id) => {
  try {
    const response = await fetch(`admin/ofertas/${id}`);
    if (!response.ok) throw new Error('Error al obtener la oferta');
    let oferta = await response.json();
    return oferta;
  } catch (error) {
    console.error(error);
  }
};

if (window.location.search.includes('success=1')) {
  const form = document.getElementById('formPostulacion');
  form.classList.add('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}