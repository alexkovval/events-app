import fs from 'fs';

export const handleFileReadEvents = (callback) => {
    const eventsPath = './data/mockup.json';
    fs.readFile(eventsPath, 'utf8', (err, data) => {
        callback(data, err);
    });
};