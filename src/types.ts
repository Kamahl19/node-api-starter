import { Request } from 'express';

export type JwtPayload = {
  sub: string;
};

// TODO
export interface Req extends Request {
  jwtPayload?: JwtPayload;
}
