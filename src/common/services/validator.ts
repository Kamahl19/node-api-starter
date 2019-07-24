const { celebrate } = require('celebrate');

// TODO should be imported from library
type Schema = {
  /**
   * When `params` is set, `joi` will validate `req.params` with the supplied schema.
   */
  params?: object;
  /**
   * When `headers` is set, `joi` will validate `req.headers` with the supplied schema.
   */
  headers?: object;
  /**
   * When `query` is set, `joi` will validate `req.query` with the supplied schema.
   */
  query?: object;
  /**
   * When `cookies` is set, `joi` will validate `req.cookies` with the supplied schema.
   */
  cookies?: object;
  /**
   * When `signedCookies` is set, `joi` will validate `req.signedCookies` with the supplied schema.
   */
  signedCookies?: object;
  /**
   * When `body` is set, `joi` will validate `req.body` with the supplied schema.
   */
  body?: object;
};

export default (schema: Schema) => celebrate(schema, { abortEarly: false });
