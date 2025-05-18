import http from 'http';
import userRoutes from './routes/user';

const server = http.createServer((req, res) => {
    userRoutes.handleRoutes(req, res);
});

const PORT = 7200;
server.listen(PORT, () => {
    console.log('Servidor corriendo en http://localhost:${PORT}');
});