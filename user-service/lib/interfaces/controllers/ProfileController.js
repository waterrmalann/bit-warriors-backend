import RetrieveProfileInteractor from '../../application/use-cases/RetrieveProfile.js';
import ChangePasswordInteractor from '../../application/use-cases/ChangePassword.js';
import UserRepository from "../../infrastructure/repositories/UserRepositoryMongo.js";
import PasswordManager from '../../infrastructure/security/BcryptPasswordManager.js';

const userRepository = new UserRepository();
const passwordManager = new PasswordManager();

export async function GetHello(req, res) {
    res.send({ message: "Hello World "});
}

export async function GetBye(req, res) {
    res.send({ message: "Bye World" });
}

export async function GetProfile(req, res) {
    const { username } = req.params;
    try {
        const userProfile = await RetrieveProfileInteractor(username, { userRepository: userRepository });
        res.status(200).send(userProfile);
    } catch (err) {
        res.status(err.statusCode || 500).send({ message: err.message })
    }

}

export async function ChangePassword(req, res) {
    const { username } = req.params;
    const { oldPassword, newPassword } = req.body;
    try {
        const state = await ChangePasswordInteractor(username, oldPassword, newPassword, { userRepository, passwordManager });
        res.sendStatus(204);
    } catch (err) {
        res.status(err.statusCode || 500).send({ message: err.message });
    }
}