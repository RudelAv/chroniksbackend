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
import { GetUserInfo } from './domain/use-cases/profile/get-user-info';
import { DislikePost } from './domain/use-cases/post/dislike-post';
import { SearchPosts } from './domain/use-cases/post/search-posts';
import { GetBestPosts } from './domain/use-cases/post/get-best-post';
import { GetPostByUser } from './domain/use-cases/post/get-post-by-user';
import HistoryRouter from './presentation/routes/history.route';
import { GetUserHistory } from './domain/use-cases/history/get-viewed-post';
import { HistoryRepositoryImplementation } from './domain/repositories/history.repository';
import { CommunityRepositoryImplementation } from './domain/repositories/community.repository';
import CommunityRouter from './presentation/routes/community.route';
import { CreateCommunityUseCaseImplementation } from './domain/use-cases/community/create-community';
import { JoinCommunityUseCaseImplementation } from './domain/use-cases/community/join-community';
import { LeaveCommunityUseCaseImplementation } from './domain/use-cases/community/leave-community';
import { GetCommunityUseCaseImplementation } from './domain/use-cases/community/get-commmunity';

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
        new GetProfile(new ProfileRepositoryIMplementation()),
        new GetUserInfo(new ProfileRepositoryIMplementation())
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
        new GetPostAuthor(new PostRepositoryImplementation()),
        new DislikePost(new PostRepositoryImplementation()),
        new SearchPosts(new PostRepositoryImplementation()),
        new GetBestPosts(new PostRepositoryImplementation()),
        new GetPostByUser(new PostRepositoryImplementation())
    );

    const historyMiddleware = HistoryRouter(
       new GetUserHistory(new HistoryRepositoryImplementation())
    );

    const communityMiddleware = CommunityRouter(
        new CreateCommunityUseCaseImplementation(new CommunityRepositoryImplementation()),
        new JoinCommunityUseCaseImplementation(new CommunityRepositoryImplementation()),
        new LeaveCommunityUseCaseImplementation(new CommunityRepositoryImplementation()),
        new GetCommunityUseCaseImplementation(new CommunityRepositoryImplementation())
    );

    const TokenMiddleware = TokenRouter();

    server.use('/api/v1/signup', signUpMiddleware);
    server.use('/api/v1/signin', signInMiddleware);
    server.use('/api/v1/profile', profileMiddleware);
    server.use('/api/v1/logout', logoutMiddleware);
    server.use('/api/v1/token', TokenMiddleware);
    server.use('/api/v1/post', postMiddleware);
    server.use('/api/v1/history', historyMiddleware);
    server.use('/api/v1/community', communityMiddleware);


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