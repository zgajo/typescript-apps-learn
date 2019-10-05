import { Response } from "express";

export const sendRefreshToken = (res: Response, token: String) => {
  const expiryCookieDate = new Date();
  expiryCookieDate.setDate(expiryCookieDate.getDate() + 7);

  res.cookie("jid", token, {
    httpOnly: true,
    // http://expressjs.com/en/4x/api.html#res.cookie
    // Expiry date of the cookie in GMT. If not specified or set to 0, creates a session cookie.
    expires: expiryCookieDate,
    path: "/refresh_token"
  });
};
