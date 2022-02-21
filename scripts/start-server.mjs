import { createServer } from 'lwr';

createServer()
    .listen(({ port, serverMode }) => {
        console.log(`App listening on port ${port} in ${serverMode} mode\n`);
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });