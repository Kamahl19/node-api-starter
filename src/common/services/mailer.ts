import nodemailer from 'nodemailer';
const mailgunTransport = require('nodemailer-mailgun-transport');
const lodash = require('lodash');

import config from '../../config';
import logger from '../../common/services/logger';

const { MAILGUN_API_KEY, MAILGUN_DOMAIN } = process.env;

class DummyTransporter {
  sendMail(data: any) {
    logger.info(data);
  }
}

const transporter =
  MAILGUN_API_KEY && MAILGUN_DOMAIN
    ? nodemailer.createTransport(
        mailgunTransport({
          auth: {
            api_key: MAILGUN_API_KEY,
            domain: MAILGUN_DOMAIN,
          },
        })
      )
    : new DummyTransporter();

export const sendMail = (to: string, template: object, options: object) =>
  transporter.sendMail(
    lodash.merge(
      {
        from: config.mail.from,
        to,
      },
      template,
      options
    )
  );
