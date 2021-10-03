import sgMail from '@sendgrid/mail';
import httpStatus from 'http-status';
import APIError from '../utils/APIError';

import configs from '../configs';

const sendEmail = async (email: string, otp: number): Promise<void> => {
  const msg = {
    from: configs.sendGrid.email,
    to: email,
    templateId: configs.sendGrid.template,
    dynamic_template_data: { otp },
  };

  sgMail.setApiKey(configs.sendGrid.key);

  try {
    await sgMail.send(msg);
  } catch (err) {
    console.log(err);
    throw new APIError({
      message: 'Error Send Email',
      status: httpStatus.FORBIDDEN,
    });
  }
};

export default sendEmail;
