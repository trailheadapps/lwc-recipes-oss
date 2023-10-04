import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';
import { access } from 'fs/promises';
import Fastify from 'fastify';

const port = +process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const staticDir = join(__dirname, '..', '/site');

const fastify = new Fastify({
    logger: true
});

fastify.register(import('@fastify/static'), {
    prefix: '/',
    root: join(staticDir)
});

async function start() {
    try {
        await access(staticDir);
    } catch (err) {
        console.error(
            'Static site not found, did you forget to run `npm run build`?'
        );
        process.exit(1);
    }
    await fastify.listen({ port, host: '0.0.0.0' });
}

start().catch((err) => {
    fastify.log.error(err);
});
