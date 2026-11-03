import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';
import { access } from 'fs/promises';
import Fastify from 'fastify';

const port = +process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const staticDir = join(__dirname, '..', '/site');

const fastify = new Fastify({
    logger: true,
    // LWR links to its generated files with an encoded path (e.g. %40lwrjs%2Fapp) but stores
    // them in nested folders (@lwrjs/app). @fastify/static doesn't decode these since v9.1.1.
    // That's safe to do here: the whole site is public, there are no route guards.
    rewriteUrl: (req) => req.url.replace(/%2F|%40/gi, decodeURIComponent)
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
