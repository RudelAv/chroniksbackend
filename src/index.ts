import { PORT } from './domain/config/configDev';
import { JWToken } from './domain/jwt/jwt';
import { BanTokensRepositoryImplementation } from './domain/repositories/banToken.repository';
import { ProfileRepositoryIMplementation } from './domain/repositories/profile.repository';
import { SignInRepositoryImplementation } from './domain/repositories/signin.repository';
import { SignUpRepositoryImplementation } from './domain/repositories/signup.repository';
import { Profile } from './domain/use-cases/profile/update-profile';
import { SignInEmail } from './domain/use-cases/signin/signinEmail';
import { SignUpEmail } from './domain/use-cases/signup/signUpEmail';
import { BanToken } from './domain/use-cases/token/banToken';
import BanTokenRouter from './presentation/routes/banToken.route';
import ProfileRouter from './presentation/routes/profile.route';
import SigninRouter from './presentation/routes/signin.route';
import SignupRouter from './presentation/routes/signup.route';
import TokenRouter from './presentation/routes/token.route';
import server from './server';

require('dotenv').config();

(async () => {

    const mongoose = require('mongoose');
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('Connected to database');
    });

    const signUpMiddleware = SignupRouter(
        new SignUpEmail(new SignUpRepositoryImplementation(new JWToken()))
    );
    const signInMiddleware = SigninRouter(
        new SignInEmail(new SignInRepositoryImplementation(new JWToken()))
    );

    const profileMiddleware = ProfileRouter(
        new Profile(new ProfileRepositoryIMplementation())
    );

    const logoutMiddleware = BanTokenRouter(
        new BanToken(new BanTokensRepositoryImplementation())
    )

    const TokenMiddleware = TokenRouter();

    server.use('/api/v1/signup', signUpMiddleware);
    server.use('/api/v1/signin', signInMiddleware);
    server.use('/api/v1/profile', profileMiddleware);
    server.use('/api/v1/logout', logoutMiddleware);
    server.use('/api/v1/token', TokenMiddleware);


    const onlineserver = server.listen(PORT, () => console.log("Api is running at http://localhost:" + PORT))
    const signals = ["SIGINT", "SIGTERM", "SIGQUIT"] as const;
    for (let i = 0; i < signals.length; i++) {
        const signal = signals[i];
        process.on(signal, async () => {
            onlineserver.close();

            process.exit(0);
        });
    }
})();