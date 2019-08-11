'use strict';

const nodemailer = require('nodemailer');
const mailgunTransport = require('nodemailer-mailgun-transport');
const merge = require('lodash.merge');

const logger = require('../../common/services/logger');
const {
  mail: { from },
  mailgun: { apiKey, domain },
} = require('../../config');

class DummyTransporter {
  sendMail(data) {
    logger.info(data);
  }
}

const transporter =
  apiKey && domain
    ? nodemailer.createTransport(
        mailgunTransport({
          auth: {
            api_key: apiKey,
            domain,
          },
        })
      )
    : new DummyTransporter();

module.exports = {
  sendMail: (to, template, options) =>
    transporter.sendMail(
      merge(
        {
          from,
          to,
        },
        template,
        options
      )
    ),
};
