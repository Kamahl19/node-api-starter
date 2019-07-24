import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

import config from '../../../config';

import { JwtPayload } from '../../../types';

function parseAuthHeader(authHeader: string) {
  const [bearer, token] = authHeader.split(' ');
  return { bearer, token };
}

export const isAuthHeaderValid = (authHeader: string) => {
  const { bearer, token } = parseAuthHeader(authHeader);
  return !!(/^Bearer$/i.test(bearer) && token);
};

export const getPayloadFromAuthHeader = (authHeader: string): JwtPayload => {
  const { token } = parseAuthHeader(authHeader);
  return jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload; // TODO
};

export const generateJWTToken = (subject: string, expiresIn = config.auth.jwtTokenExpireInSec) =>
  jwt.sign({}, process.env.JWT_SECRET!, { subject, expiresIn });

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(config.auth.saltRounds);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = (password: string, hash: string) =>
  bcrypt.compareSync(password, hash);
