const showFlash = (flash, message, cssClass) => {
  flash.classList.add(cssClass);
  flash.innerHtml = message;
  flash.classList.remove('is-hidden');
  setTimeout(() => {
    flash.classList.add('is-hidden');
    flash.classList.remove(cssClass);
  }, 10000);
};

document.addEventListener('DOMContentLoaded', () => {
  const hcaptcha = document.getElementById('h-captcha');

  const submitContactForm = async () => {
    const form = document.getElementById('contactForm');
    const flash = document.getElementById('contactFlash');
    const btn = document.getElementById('contactSubmitBtn');
    const hcaptchaToken = hcaptcha.getAttribute('data-token');

    if (!hcaptchaToken) {
      flash.classList.add('is-danger');
      flash.innerHTML = 'An error occurred sending message! Please try again later.';
    }

    btn.setAttribute('disabled', '');

    if (!flash) console.log('contactFlash div not found', flash);

    const values = new URLSearchParams();
    document
      .querySelectorAll('#contactForm .input')
      .forEach(element => values.append(element.id, element.value));
    values.append('hcaptchaResponse', hcaptchaToken);

    console.error(values);

    const response = await fetch(form.action, {
      method: form.method,
      body: values,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => {
        console.log('Form submission response', response.body);
        console.log('Form json', JSON.stringify(response.body ?? {}));
        return response.json();
      })
      .catch(error => {
        console.error('Error:', error);
      });

    if (response && response.status === 200) {
      showFlash(flash, 'Message successfully sent!', 'is-primary');
    } else {
      setTimeout(() => {
        btn.removeAttribute('disabled');
      }, 5000);
      showFlash(flash, 'An error occurred sending message! Please try again later.', 'is-danger');
    }
  };

  hcaptcha.addEventListener('verified', e => {
    const btn = document.getElementById('contactSubmitBtn');
    hcaptcha.dataset.token = e.token;
    btn.removeAttribute('disabled');
  });

  hcaptcha.addEventListener('error', e => {
    console.log('error event', {error: e.error});
    const btn = document.getElementById('contactSubmitBtn');
    btn.setAttribute('disabled', '');

    const flash = document.getElementById('contactFlash');
    flash.classList.add('is-danger');
    flash.innerHTML = 'An error occurred verifying your captcha! Please reload and try again later.';
  });

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', e => {
    e.preventDefault();
    submitContactForm();
  });
});
