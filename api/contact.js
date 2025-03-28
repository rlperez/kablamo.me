import {verify} from 'hcaptcha';
import {MailerSend, EmailParams, Sender, Recipient} from 'mailersend';
import {getClientIp} from 'request-ip';

async function verifyCaptcha(localAddress, hcaptcha_response) {
  const hcaptcha_site_key = process.env.HCAPTCHA_SITE_KEY;
  const hcaptcha_secret = process.env.HCAPTCHA_SECRET;

  if (!hcaptcha_secret) {
    console.error('hcaptcha secret missing!');
    return {status: 500, message: 'hcaptcha secret key missing!'};
  }

  if (!hcaptcha_site_key) {
    console.error('hCaptcha site key missing!');
    return {status: 500, message: 'hcaptcha site key missing!'};
  }

  if (hcaptcha_response) {
    const verify_response = await verify(hcaptcha_secret, hcaptcha_response, localAddress, hcaptcha_site_key);

    if (verify_response?.success) {
      return {
        status: 200,
        message: 'hcaptcha verified user'
      };
    } else {
      console.warn({verify_response});
      return {
        status: 429,
        message: 'hcaptcha verification failed',
        error_codes: verify_response['error-codes'],
        hostname: verify_response.hostname
      };
    }
  } else {
    return {status: 400, message: 'Missing hcaptchaResponse'};
  }
}

async function sendMail(request) {
  const message = {
    from: request['contactEmail'],
    to: process.env.CONTACT_EMAIL,
    name: request['contactName'],
    subject: `[KABLAMO.ME] CONTACT PAGE FROM ${request['contactName']}`,
    body:
      `NAME: ${request['contactName']}\n` +
      `PHONE: ${request['contactPhone']}\n\n` +
      `${request['contactMessage']}`
  };
  console.trace('Sending email...', {message});
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

  return mailer.email.send(emailParams);
}

export default async function handler(request, response) {
  const hcaptcha_response = request?.body['hcaptchaResponse'];
  console.trace('Contact Request', {body: request.body});
  const ipAddress = getClientIp(request);
  const verify_response = await verifyCaptcha(ipAddress, hcaptcha_response);

  if (verify_response.status === 200) {
    const result = await sendMail(request.body);
    console.error({result});
    console.error({body: result?.body});
    console.error(JSON.stringify(result.body));
    const {statusCode, body} = result;
    if (statusCode >= 200 || statusCode < 400) {
      console.log({statusCode, body});
      const responseStatus = body ? 200 : 204;
      return response.status(responseStatus).json({status: statusCode, message: 'Email successful sent'});
    } else {
      console.error({request: body, result});
      return response.status(500).json({
        status: statusCode,
        message: body
      });
    }
  } else {
    console.warn('hcaptcha verification failed', {verify_response});
    response.status(verify_response.status).json({body: verify_response});
  }
}
