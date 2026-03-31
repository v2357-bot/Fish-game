document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('appointmentForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const msg = document.getElementById('appointmentMsg');
    msg.classList.remove('d-none');
    msg.innerHTML = `Appointment request received for <strong>${fd.get('date')}</strong> at <strong>${fd.get('time')}</strong>. A confirmation email simulation has been sent to <strong>${fd.get('email')}</strong>.`;
    form.reset();
  });
});
