export default class IAccessTokenManager {
    generate(payload, expiry) {
        throw new Error('generate method not implemented');
    }
    
    decode(accessToken) {
        throw new Error('decode method not implemented');
    }
}