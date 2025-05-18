import fs from 'fs';
import path from 'path';

const serverIndex = (req, res) => {
    serverFile(res, path.join(__dirname, '../views/index.html'));
};

const serverNotFound = (req, res) => {
    serverFile(res, path.join(__dirname, '../views/pageNotFound.html'));
};

const serverFile = (res, filePath) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            serverNotFound(null, res);
            return;
        }
        res.writeHead(200, { 'Cpmtemt-Type': 'text/html'});
        res.end(data);
    });
};

module.exports = {
    serverIndex,
    serverNotFound
}