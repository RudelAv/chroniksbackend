import { PORT } from './domain/config/configDev';
import { JWToken } from './domain/jwt/jwt';
import { SignUpRepositoryImplementation } from './domain/repositories/signup.repository';
import { SignUpEmail } from './domain/use-cases/signup/signUpEmail';
import SignupRouter from './presentation/routes/signup.route';
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

    server.use('/api/v1/signup', signUpMiddleware);
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