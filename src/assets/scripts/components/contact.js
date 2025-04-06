const showFlash = (flash, message, cssClass) => {
  flash.classList.add(cssClass);
  flash.innerHTML = message;
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

    if (!flash) console.log('contactFlash div not found', flash);

    if (!hcaptchaToken && flash) {
      showFlash(flash, 'An error occurred sending message! Please try again later.', 'is-danger');
    }

    btn.setAttribute('disabled', '');

    const values = new URLSearchParams();
    document
      .querySelectorAll('#contactForm .input')
      .forEach(element => values.append(element.id, element.value));
    values.append('hcaptchaResponse', hcaptchaToken);
    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: values,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      const resp = await response.json();
      console.log({resp});
      console.log('Form submission response: ', resp);
      console.log('Form json: ', JSON.stringify(resp ?? {}));

      if (response.status >= 200 && response.status < 300) {
        showFlash(flash, `${resp.message}`, 'is-success');
      } else {
        setTimeout(() => {
          btn.removeAttribute('disabled');
        }, 5000);
        showFlash(
          flash,
          `An error occurred sending message! Please try again later. ${resp.message}`,
          'is-danger'
        );
      }
    } catch (error) {
      console.error('Error: ', error);
      setTimeout(() => {
        btn.removeAttribute('disabled');
      }, 5000);
      showFlash(flash, 'An unexpected critical error has occurred. Please try again later.', 'is-danger');
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
    showFlash(
      flash,
      'An error occurred verifying your captcha! Please reload and try again later.',
      'is-danger'
    );
  });

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', e => {
    e.preventDefault();
    submitContactForm();
  });
});
