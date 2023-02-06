/* eslint-disable @typescript-eslint/no-empty-function */
import { Request, Response } from 'express';
import passport from 'passport';

import { IRoute } from '../interfaces';
import { HttpMethods } from '../interfaces/types';
import { checkUser } from '../middlewares';
import HttpController from './base/HttpController';

export default class AuthController extends HttpController {
  path = '/auth';

  routes: IRoute[] = [
    {
      path: '/google',
      method: HttpMethods.GET,
      handler: (req: Request, res: Response) => {},
      localMiddleware: [
        checkUser.isNotAuthenticated,
        passport.authenticate('google', {
          scope: ['email', 'profile']
        })
      ]
    },
    {
      path: '/google/redirect',
      method: HttpMethods.GET,
      handler: this.handleGoogleLogin
    },
    {
      path: '/facebook',
      method: HttpMethods.GET,
      handler: (req: Request, res: Response) => {},
      localMiddleware: [
        checkUser.isNotAuthenticated,
        passport.authenticate('facebook', {
          scope: ['email']
        })
      ]
    },
    {
      path: '/facebook/redirect',
      method: HttpMethods.GET,
      handler: this.handleFacebookLogin
    },
    {
      path: '/login',
      method: HttpMethods.POST,
      handler: (req: Request, res: Response) => {},
      localMiddleware: [
        checkUser.isNotAuthenticated,
        passport.authenticate('local', {
          failureRedirect: '/api/v2/auth/login/failed',
          successRedirect: '/'
        })
      ]
    },
    {
      path: '/login/failed',
      method: HttpMethods.GET,
      localMiddleware: [checkUser.isNotAuthenticated],
      handler: this.failureCallback
    },
    {
      path: '/logout',
      method: HttpMethods.DELETE,
      handler: this.handleLogout,
      localMiddleware: [checkUser.isAuthenticated]
    }
  ];

  private handleFacebookLogin(req: Request, res: Response) {
    passport.authenticate('facebook', {
      failureRedirect: '/api/v2/auth/login/failed'
    });
    res.status(200).json({ message: 'logged in', user: req.user });
  }

  private handleGoogleLogin(req: Request, res: Response) {
    passport.authenticate('google', {
      failureRedirect: '/api/v2/auth/login/failed'
    });
    res.status(200).json({ message: 'logged in', user: req.user });
  }

  private handleLogout(req: Request, res: Response) {
    req.logout(_err => {
      res.sendStatus(204);
    });
  }

  private failureCallback(req: Request, res: Response) {
    res.status(401).json({ message: 'login failed' });
  }
}
