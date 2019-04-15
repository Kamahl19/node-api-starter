'use strict';

const nodemailer = require('nodemailer');
const mailgunTransport = require('nodemailer-mailgun-transport');
const lodash = require('lodash');

const config = require('../../config');
const logger = require('../../common/services/logger');

const { MAILGUN_API_KEY, MAILGUN_DOMAIN } = process.env;

class DummyTransporter {
  sendMail(data) {
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

module.exports = {
  sendMail: (to, template, options) =>
    transporter.sendMail(
      lodash.merge(
        {
          from: config.mail.from,
          to,
        },
        template,
        options
      )
    ),
};
