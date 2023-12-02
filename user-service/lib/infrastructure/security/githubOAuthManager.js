import IOAuthManager from '../../application/security/IOAuthManager.js';
import { fetch, setGlobalDispatcher, Agent } from 'undici';
import crypto from 'crypto';
import environment from '../config/environment.js';
import User from '../../domain/entities/User.js';
setGlobalDispatcher(new Agent({ connect: { timeout: 60_000 } }) )

export default class extends IOAuthManager {

    async getUser(code) {
        const query = new URLSearchParams();
        query.append('client_id', environment.GITHUB_OAUTH_CLIENT_ID);
        query.append('client_secret', environment.GITHUB_OAUTH_CLIENT_SECRET);
        query.append('code', code);
        
        let accessToken = null;
        try {
            console.log("started fetching", code);
            const res = await fetch(
                `https://github.com/login/oauth/access_token?${query.toString()}`,
                { method: "POST", headers: { "Accept": "application/json" }}
            );
            const data = await res.json();
            accessToken = data.access_token;
        } catch (err) {
            console.error(err);
        }
        // todo: take data.scope and validate if it has read:email
        if (!accessToken) return null;

        let userData = null;
        try {
            const res = await fetch(
                "https://api.github.com/user",
                { method: "GET", headers: { "Authorization": "Bearer " + accessToken}}
            );
            userData = await res.json();
            console.log(userData);
        } catch (err) {
            console.error(err);
            return null;
        }

        try {
            const res = await fetch(
                "https://api.github.com/user/emails",
                { method: "GET", headers: { "Authorization": "Bearer " + accessToken}}
            );
            const userEmails = await res.json();
            const primaryMail = userEmails.find(entry => entry.primary).email;

            const dummyPassword = crypto.randomBytes(8).toString('hex');

            const user = new User(null, userData.login, primaryMail, dummyPassword);
            user.githubUsername = userData.login;
            // todo: user.bio = userData.bio; (if first time)

            return user;
        } catch (err) {
            console.error(err);
            return null;
        }
    }
}