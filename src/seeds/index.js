'use strict';

require('dotenv').config();

const seeder = require('mongoose-seed');

const logger = require('../common/services/logger');
const { mongo } = require('../config');

seeder.connect(mongo.url, async () => {
  seeder.loadModels(['src/features/user/userModel.js']);

  seeder.clearModels(['User'], () => {
    seeder.populateModels(
      [
        {
          model: 'User',
          documents: [
            {
              email: 'user@example.com',
              password: 'password',
              isConfirmed: true,
            },
          ],
        },
      ],
      () => {
        logger.info('DB seed was successful');
        seeder.disconnect();
      }
    );
  });
});
