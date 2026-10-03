const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

const form = document.getElementById('bookingForm');
const msgEl = document.getElementById('formMsg');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = form.querySelector('.submit-btn');
  btn.querySelector('span').textContent = 'Sending...'; btn.disabled = true;
  msgEl.className = 'form-msg'; msgEl.textContent = '';
  try {
    const response = await fetch(form.action, {
      method: 'POST', headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    });
    if (response.ok) {
      msgEl.textContent = "Service request sent! We'll be in touch shortly to confirm.";
      msgEl.className = 'form-msg success'; form.reset();
    } else {
      const data = await response.json();
      const err = data.errors ? data.errors.map(e => e.message).join(', ') : 'Something went wrong.';
      msgEl.textContent = err + ' Please call (520) 571-0939.';
      msgEl.className = 'form-msg error';
    }
  } catch(err) {
    msgEl.textContent = 'Could not send request. Please call (520) 571-0939.';
    msgEl.className = 'form-msg error';
  }
  btn.querySelector('span').textContent = 'Send Service Request'; btn.disabled = false;
});
