import { PORT } from './domain/config/configDev';
import { JWToken } from './domain/jwt/jwt';
import { BanTokensRepositoryImplementation } from './domain/repositories/banToken.repository';
import { PostRepositoryImplementation } from './domain/repositories/post.repository';
import { ProfileRepositoryIMplementation } from './domain/repositories/profile.repository';
import { SignInRepositoryImplementation } from './domain/repositories/signin.repository';
import { SignUpRepositoryImplementation } from './domain/repositories/signup.repository';
import { CommentPost } from './domain/use-cases/post/comment-post';
import { CreatePost } from './domain/use-cases/post/create-post';
import { DeletePost } from './domain/use-cases/post/delete-post';
import { GetPost } from './domain/use-cases/post/get-post';
import { SavePost } from './domain/use-cases/post/save-post';
import { LikePost } from './domain/use-cases/post/like-post';
import { UpdatePost } from './domain/use-cases/post/update-post';
import { Profile } from './domain/use-cases/profile/update-profile';
import { SignInEmail } from './domain/use-cases/signin/signinEmail';
import { SignUpEmail } from './domain/use-cases/signup/signUpEmail';
import { BanToken } from './domain/use-cases/token/banToken';
import BanTokenRouter from './presentation/routes/banToken.route';
import PostRouter from './presentation/routes/post.route';
import ProfileRouter from './presentation/routes/profile.route';
import SigninRouter from './presentation/routes/signin.route';
import SignupRouter from './presentation/routes/signup.route';
import TokenRouter from './presentation/routes/token.route';
import server from './server';
import { GetProfile } from './domain/use-cases/profile/get-profile';
import { GetPostAuthor } from './domain/use-cases/post/get-post-author';

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
        new Profile(new ProfileRepositoryIMplementation()),
        new GetProfile(new ProfileRepositoryIMplementation())
    );

    const logoutMiddleware = BanTokenRouter(
        new BanToken(new BanTokensRepositoryImplementation())
    );

    const postMiddleware = PostRouter(
        new CreatePost(new PostRepositoryImplementation()),
        new UpdatePost(new PostRepositoryImplementation()),
        new DeletePost(new PostRepositoryImplementation()),
        new GetPost(new PostRepositoryImplementation()),
        new LikePost(new PostRepositoryImplementation()),
        new CommentPost(new PostRepositoryImplementation()),
        new SavePost(new PostRepositoryImplementation()),
        new GetPostAuthor(new PostRepositoryImplementation())
    );

    const TokenMiddleware = TokenRouter();

    server.use('/api/v1/signup', signUpMiddleware);
    server.use('/api/v1/signin', signInMiddleware);
    server.use('/api/v1/profile', profileMiddleware);
    server.use('/api/v1/logout', logoutMiddleware);
    server.use('/api/v1/token', TokenMiddleware);
    server.use('/api/v1/post', postMiddleware);


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