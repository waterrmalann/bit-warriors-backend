import IOAuthManager from '../../application/security/IOAuthManager.js';
import { fetch, setGlobalDispatcher, Agent } from 'undici';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import slugify from 'slugify';
import environment from '../config/environment.js';
import User from '../../domain/entities/User.js';
setGlobalDispatcher(new Agent({ connect: { timeout: 60_000 } }) )

export default class extends IOAuthManager {

    async getUser(code) {
        const query = new URLSearchParams();
        query.append('code', code);
        query.append('client_id', environment.GOOGLE_OAUTH_CLIENT_ID);
        query.append('client_secret', environment.GOOGLE_OAUTH_CLIENT_SECRET);
        query.append('redirect_uri', `${environment.FRONTEND_URL}/oauth/google/callback`)
        query.append('grant_type', 'authorization_code')
        
        let accessToken = null;
        let idToken = null;
        try {
            const res = await fetch(
                `https://oauth2.googleapis.com/token?${query.toString()}`,
                { method: "POST", headers: { "Accept": "application/json" }}
            );
            const data = await res.json();
            console.log(data);
            accessToken = data.access_token;
            idToken = data.id_token;
        } catch (err) {
            console.error(err);
        }
        // todo: take data.scope and validate if it has read:email
        if (!accessToken) return null;
        if (!idToken) return null;

        const googleUser = jwt.decode(idToken);
        const userName = slugify(googleUser.name).toLowerCase();
        const userEmail = googleUser.email;
        if (!googleUser.email_verified) {
            return null;
        }
        const dummyPassword = crypto.randomBytes(8).toString('hex');

        const user = new User(null, userName, userEmail, dummyPassword);
        user.emailVerified = true;
        return user;

        // let userData = null;
        // try {
        //     console.log('-------user info fetch-----')
        //     const res = await fetch(
        //         "https://www.googleapis.com/oauth2/v1/userinfo",
        //         { method: "GET", headers: { "Authorization": "Bearer " + accessToken}}
        //     );
        //     userData = await res.json();
        //     console.log(userData);
        // } catch (err) {
        //     console.error(err);
        //     return null;
        // }

        // try {
        //     const res = await fetch(
        //         "https://api.github.com/user/emails",
        //         { method: "GET", headers: { "Authorization": "Bearer " + accessToken}}
        //     );
        //     const userEmails = await res.json();
        //     const primaryMail = userEmails.find(entry => entry.primary).email;

        //     const dummyPassword = crypto.randomBytes(8).toString('hex');

        //     const user = new User(null, userData.login, primaryMail, dummyPassword);
        //     user.githubUsername = userData.login;
        //     // todo: user.bio = userData.bio; (if first time)

        //     return user;
        // } catch (err) {
        //     console.error(err);
        //     return null;
        // }
    }
}