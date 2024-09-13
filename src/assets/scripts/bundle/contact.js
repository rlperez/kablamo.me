const submitContactForm = async () => {
  const form = document.getElementById('contactForm');
  const flash = document.getElementById('contactFlash');
  const btn = document.getElementById('contactSubmitBtn');

  if (!flash) console.log('contactlash div not found', flash);

  const values = new URLSearchParams();
  document
    .querySelectorAll('#contactForm .input')
    .forEach(element => values.append(element.id, element.value));
  values.append('h-captcha-response', hcaptcha.getResponse());

  const response = await fetch(form.action, {
    method: form.method,
    body: values,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then(response => response.json())
    .catch(error => {
      console.error('Error:', error);
    });

  if (response && response.status === 200) {
    flash.classList.add('is-primary');
    flash.innerHTML = 'Message successfully sent!';
    btn.disabled = true;
  } else {
    flash.classList.add('is-danger');
    flash.innerHTML = 'An error occurred sending message! Please try again later.';
  }

  flash.classList.remove('is-hidden');
};

document.addEventListener('DOMContentLoaded', () => {
  const hcaptcha = document.getElementById('h-captcha');

  hcaptcha.addEventListener('verified', e => {
    console.log('verified event', {token: e.token});
    const btn = document.getElementById('contactSubmitBtn');
    btn.disabled = false;
  });

  hcaptcha.addEventListener('error', e => {
    console.log('error event', {error: e.error});
    const btn = document.getElementById('contactSubmitBtn');
    btn.disabled = true;

    const flash = document.getElementById('contactFlash');
    flash.classList.add('is-danger');
    flash.innerHTML = 'An error occurred verifying your captcha! Please try again later.';
  });

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', e => {
    e.preventDefault();
    submitContactForm();
  });
});
