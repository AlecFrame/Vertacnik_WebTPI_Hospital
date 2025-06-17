const form = document.getElementById('formPostulacion');
const inputs = form.querySelectorAll('input, textarea');
const sectionMatriculaMedica = document.getElementById('matricula-medica');
const botones = document.querySelectorAll('.btn-postular');
let oferta = null;

botones.forEach(btn => {
  btn.addEventListener('click', async () => {
    const ofertaId = btn.dataset.id;
    form.oferta_id.value = ofertaId;
    form.classList.remove('hidden');
    oferta = await obtenerOfertaPorId(ofertaId);
    console.log(oferta);
    // Solo mostrar la matricula médica si el tipo de rol de la oferta es 'medico'
    if (oferta && oferta.rol.id === 3) {
      sectionMatriculaMedica.style.display = 'block';
    }else {
      sectionMatriculaMedica.style.display = 'none';
    }
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