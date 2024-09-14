import {verify} from 'hcaptcha';
import {MailerSend, EmailParams, Sender, Recipient} from 'mailersend';

async function verifyCaptcha(hcaptcha_response) {
  const hcaptcha_site_key = process.env.HCAPTCHA_SITE_KEY;
  const hcaptcha_secret = process.env.HCAPTCHA_SECRET;

  if (!hcaptcha_secret) {
    console.error('hCaptcha secret missing!');
    return {status: 500, message: 'hCaptcha secret key missing!'};
  }

  if (!hcaptcha_site_key) {
    console.error('hCaptcha site key missing!');
    return {status: 500, message: 'hCaptcha site key missing!'};
  }

  if (hcaptcha_response) {
    const verify_response = await verify(hcaptcha_secret, hcaptcha_response, address(), hcaptcha_site_key);

    if (verify_response?.success) {
      return {
        status: 200,
        message: 'hCaptcha verified user'
      };
    } else {
      console.warn({verify_response});
      return {
        status: 429,
        message: 'hCaptcha verification failed',
        error_codes: verify_response['error-codes'],
        hostname: verify_response.hostname
      };
    }
  } else {
    return {status: 400, message: 'Missing h-captcha-response'};
  }
}

export default async function handler(request, response) {
  const hcaptcha_response = request?.body['h-captcha-response'];
  const verify_response = await verifyCaptcha(hcaptcha_response);

  if (verify_response.status === 200) {
    const message = {
      from: request?.body['contact-email'],
      to: process.env.CONTACT_EMAIL,
      name: request?.body['contact-name'],
      subject: `[KABLAMO.ME] CONTACT PAGE FROM ${request?.body['contact-name']}`,
      body:
        `NAME: ${request?.body['contact-name']}\n` +
        `PHONE: ${request?.body['contact-phone']}\n\n` +
        `${request?.body['contact-body']}`
    };

    const mailer = new MailerSend({
      apiKey: process.env.MAILER_SEND_API_KEY
    });

    const sentFrom = new Sender(message.from, message.name);
    const recipients = [new Recipient(process.env.CONTACT_EMAIL, 'Kablamo.me Admin')];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject(message.subject)
      .setText(message.body);

    const response = await mailer.send(emailParams);
    if (response.statusCode === 200 || response.statusCode === 204) {
      console.log({info});
      return response.json({status: 200, message: 'Email successful sent'}).end();
    } else {
      console.error({err});
      return response.json({status: response.statusCode, message: response.body}).end();
    }
  } else {
    console.warn({verify_response});
    response.json(verify_response).end();
  }
}
