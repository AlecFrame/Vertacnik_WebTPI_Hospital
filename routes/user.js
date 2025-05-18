import url from 'url';
import viewConstroller from '../controllers/viewController';

const handleRoutes = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    if (req.method === 'GET' && (pathname === '/' || pathname === '/index')) {
        viewConstroller.serverIndex(req, res);
    }else {
        viewConstroller.serverNotFound(req, res);
    }
};

module.exports = {
    handleRoutes
};