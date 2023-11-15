export async function GetHello(req, res) {
    res.send({ message: "Hello World "});
}

export async function GetBye(req, res) {
    res.send({ message: "Bye World" });
}