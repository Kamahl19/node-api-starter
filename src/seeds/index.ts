require('dotenv').config();

const seeder = require('mongoose-seed');

import logger from '../common/services/logger';
import { hashPassword } from '../common/services/auth/index';

seeder.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
  },
  async () => {
    seeder.loadModels(['src/features/user/userModel.js']);

    const data = await getData();

    seeder.clearModels(['User'], () => {
      seeder.populateModels(data, () => {
        logger.info('DB seed was successful');
        seeder.disconnect();
      });
    });
  }
);

async function getData() {
  const password = await hashPassword('password');

  return [
    {
      model: 'User',
      documents: [
        {
          email: 'user@example.com',
          password,
          isActive: true,
        },
      ],
    },
  ];
}
