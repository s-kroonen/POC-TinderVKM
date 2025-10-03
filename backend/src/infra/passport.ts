// keep your passport setup here (microsoft strategy). Keep minimal sideeffects.
import passport from "passport";
import { Strategy as MicrosoftStrategy } from "passport-microsoft";
import config from "../config/index.js";
import { UserRepository } from "./mongoose/repositories/UserRepository.js";
const userRepo = new UserRepository();
passport.use(new MicrosoftStrategy(
    {
        clientID: config.clientID,
        clientSecret: config.clientSecret,
        callbackURL: config.callbackURL,
        tenant: config.tenant,
        scope: ["user.read"],
    }, async (
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: (error: any, user?: any) => void
    ) => {
    try {
        const email = profile._json?.mail || profile.emails?.[0]?.value;
        let user = await userRepo.findByEmail(email);
        if (!user) {
            user = await userRepo.create({ email, microsoftId: profile.id } as
                any);
        }
        done(null, user);
    } catch (err) {
        done(err as Error);
    }
}
));
passport.serializeUser((user: any, done) => done(null, user._id));
passport.deserializeUser(async (id: string, done) => {
    const user = await userRepo.findById(id);
    done(null, user);
});
export default passport;