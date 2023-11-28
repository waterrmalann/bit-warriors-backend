import RetrieveProfileInteractor from '../../application/use-cases/RetrieveProfile.js';
import UserRepository from "../../infrastructure/repositories/UserRepositoryMongo.js";

const userRepository = new UserRepository();

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