import nodemailer, { Transporter, TransportOptions } from 'nodemailer';
import { google } from 'googleapis';
// eslint-disable-next-line
import { GetAccessTokenResponse } from 'google-auth-library/build/src/auth/oauth2client';

const { OAuth2 } = google.auth;

export default class Mailer {
  private _oAuth2Client = new OAuth2(
    this._clientId,
    this._clientSecret,
    'https://developers.google.com/oauthplayground'
  );

  private _accessToken!: GetAccessTokenResponse;

  private _smtpTransport: Transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: 'flo.hundegger@gmail.com',
      clientId: this._clientId,
      clientSecret: this._clientSecret,
      refreshToken: this._refreshToken,
      accessToken: this._accessToken
    }
  } as TransportOptions);

  constructor(
    private readonly _clientId: string,
    private readonly _clientSecret: string,
    private readonly _refreshToken: string
  ) {
    this._oAuth2Client.setCredentials({
      refresh_token: this._refreshToken
    });
    this._initialize();
  }

  private async _initialize() {
    this._accessToken = await this._oAuth2Client.getAccessToken();
  }

  public async sendVerification(email: string, otp: number) {
    try {
      this._smtpTransport.sendMail({
        from: 'flo.hundegger@gmail.com',
        to: email,
        subject: 'foodforyou verification',
        html: `
        <h1>Verify your Account!</h1>
        your code: ${otp}`
      });
    } catch (err) {
      console.log(err);
    }
  }
}
