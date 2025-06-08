document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formPostulacion');
  const inputs = form.querySelectorAll('input, textarea');
  const botones = document.querySelectorAll('.btn-postular');

  botones.forEach(btn => {
    btn.addEventListener('click', () => {
      const ofertaId = btn.dataset.id;
      form.oferta_id.value = ofertaId;
      form.classList.remove('hidden');
      form.scrollIntoView({ behavior: 'smooth' });
    });
  });
});

if (window.location.search.includes('success=1')) {
  const form = document.getElementById('formPostulacion');
  form.classList.add('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}