import createServer from "./lib/infrastructure/webserver/server.js";
import bootstrap from './lib/infrastructure/config/bootstrap.js';

const start = async () => {
    try {
        await bootstrap.init();

        const app = await createServer();
        const port = 3500;
        app.listen(port, () => {

            console.log("████████╗███████╗███████╗████████╗                  ");
            console.log("╚══██╔══╝██╔════╝██╔════╝╚══██╔══╝                  ");
            console.log("   ██║   █████╗  ███████╗   ██║                     ");
            console.log("   ██║   ██╔══╝  ╚════██║   ██║                     ");
            console.log("   ██║   ███████╗███████║   ██║                     ");
            console.log("   ╚═╝   ╚══════╝╚══════╝   ╚═╝                     ");
            console.log("                                                    ");
            console.log("███████╗███████╗██████╗ ██╗   ██╗██╗ ██████╗███████╗");
            console.log("██╔════╝██╔════╝██╔══██╗██║   ██║██║██╔════╝██╔════╝");
            console.log("███████╗█████╗  ██████╔╝██║   ██║██║██║     █████╗  ");
            console.log("╚════██║██╔══╝  ██╔══██╗╚██╗ ██╔╝██║██║     ██╔══╝  ");
            console.log("███████║███████╗██║  ██║ ╚████╔╝ ██║╚██████╗███████╗");
            console.log("╚══════╝╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚═╝ ╚═════╝╚══════╝");
            console.log(`[ SERVICE :: TEST SERVICE ] Test Service is listening on http://localhost:${port}`);
        });
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

start();