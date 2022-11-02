/* eslint-disable no-undef */

import { Request, Response } from 'express';

// eslint-disable-next-line import/prefer-default-export
export const getMockedRequest = (
  params: any = {},
  body: any = {},
  query: any = {}
) =>
  ({
    params,
    body,
    query,
    isAuthenticated: jest.fn()
  } as unknown as Request);

// export function to return new instance isntead of same object
export const getMockedResponse = () =>
  ({
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    sendStatus: jest.fn(),
    setHeader: jest.fn()
  } as unknown as Response);
