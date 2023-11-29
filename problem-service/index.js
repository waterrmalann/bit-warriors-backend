import createServer from "./lib/infrastructure/webserver/server.js";
import bootstrap from './lib/infrastructure/config/bootstrap.js';

const start = async () => {

    try {
        await bootstrap.init();

        const app = await createServer();
        const port = 3003;
        app.listen(port, () => {
            console.log(`[ SERVICE :: PROBLEM SERVICE ] Problem Service is listening on http://localhost:${port}`);
        });
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

start();