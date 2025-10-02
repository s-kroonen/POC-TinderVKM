import passport from "passport";
import { Strategy as MicrosoftStrategy } from "passport-microsoft";
import User from "./models/Users.js";

passport.use(
  new MicrosoftStrategy(
    {
      clientID: process.env.MICROSOFT_CLIENT_ID!,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET!,
      callbackURL: process.env.MICROSOFT_REDIRECT_URI!,
      tenant: process.env.MICROSOFT_TENANT_ID,
      scope: ["user.read"],
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: (error: any, user?: any) => void
    ) => {
      try {
        const email = profile.emails?.[0].value;
        if (!email) return done(new Error("No email from Microsoft"));

        let user = await User.findOne({ email });
        if (!user) {
          user = await User.create({
            email,
            microsoftId: profile.id,
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);
