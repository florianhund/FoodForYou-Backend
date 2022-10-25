import { PassportStatic } from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';

import { User } from '../api/v2/models';
import {
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET
} from './constants';

// ! error: device id and device name are required
const initialize = (passport: PassportStatic) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID!,
        clientSecret: GOOGLE_CLIENT_SECRET!,
        callbackURL: '/api/v2/auth/google/redirect'
      },
      async (accessToken, refreshToken, profile, done) => {
        const user = await User.findOne({ email: profile.emails?.[0].value });
        if (user) return done(null, user);

        try {
          const newUser = await User.create({
            provider: 'google',
            providerId: profile.id,
            firstName: profile.name?.givenName,
            lastName: profile.name?.familyName,
            email: profile.emails?.[0].value,
            password: null,
            isVerified: true,
            otp: null,
            isAdmin: false
          });
          return done(null, newUser);
        } catch (err) {
          return done(err as Error, undefined);
        }
      }
    )
  );

  passport.use(
    new FacebookStrategy(
      {
        clientID: FACEBOOK_CLIENT_ID!,
        clientSecret: FACEBOOK_CLIENT_SECRET!,
        callbackURL: '/api/v2/auth/facebook/redirect',
        profileFields: ['id', 'emails', 'name'],
        enableProof: true
      },
      async (accessToken, refreshToken, profile, done) => {
        const user = await User.findOne({ email: profile.emails?.[0].value });
        if (user) return done(null, user);
        try {
          const newUser = await User.create({
            provider: 'facebook',
            providerId: profile.id,
            firstName: profile.name?.givenName,
            lastName: profile.name?.familyName,
            email: profile.emails?.[0].value,
            password: null,
            isVerified: true,
            otp: null,
            isAdmin: false
          });
          return done(null, newUser);
        } catch (err) {
          return done(err as Error, undefined);
        }
      }
    )
  );

  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        const user = await User.findOne({ email });
        if (!user)
          return done(null, false, { message: 'no user with given email' });

        if (user.provider !== 'email')
          // means that user.password === null
          return done(null, false, {
            message: 'log in using google or facebook'
          });

        try {
          if (await bcrypt.compare(password, user.password!))
            return done(null, user);
          return done(null, false, { message: 'wrong password' });
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.providerId);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });
};

export default initialize;
