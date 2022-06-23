/* eslint-disable @typescript-eslint/no-empty-function */
import { Request, Response } from 'express';
import passport from 'passport';

import { IRoute } from '../interfaces';
import { httpMethods } from '../interfaces/types';
import { checkUser } from '../middlewares';
import HttpController from './base/HttpController';

export default class AuthController extends HttpController {
  path = '/auth';

  routes: IRoute[] = [
    {
      path: '/google',
      method: httpMethods.GET,
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
      method: httpMethods.GET,
      localMiddleware: [
        passport.authenticate('google', {
          failureRedirect: '/api/v1/auth/login/failed'
        })
      ],
      handler: this.successCallback
    },
    {
      path: '/facebook',
      method: httpMethods.GET,
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
      method: httpMethods.GET,
      localMiddleware: [
        passport.authenticate('facebook', {
          failureRedirect: '/api/v1/auth/login/failed'
        })
      ],
      handler: this.successCallback
    },
    {
      path: '/login',
      method: httpMethods.POST,
      handler: (req: Request, res: Response) => {},
      localMiddleware: [
        checkUser.isNotAuthenticated,
        passport.authenticate('local', {
          failureRedirect: '/api/v1/auth/login/failed',
          successRedirect: '/'
        })
      ]
    },
    {
      path: '/login/failed',
      method: httpMethods.GET,
      localMiddleware: [checkUser.isNotAuthenticated],
      handler: this.failureCallback
    },
    {
      path: '/logout',
      method: httpMethods.DELETE,
      handler: this.handleLogout,
      localMiddleware: [checkUser.isAuthenticated]
    }
  ];

  private handleLogout(req: Request, res: Response) {
    req.logOut();
    res.sendStatus(204);
  }

  private successCallback(req: Request, res: Response) {
    res.status(200).json({ message: 'logged in', user: req.user });
  }

  private failureCallback(req: Request, res: Response) {
    res.status(401).json({ message: 'login failed' });
  }
}
