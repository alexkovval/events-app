import { handleFileReadEvents } from '../utils.js';
import fs from 'fs';

const path = './data/mockup.json';

class EventsController {
    async getAllEvents(req, res) {
        // function handleFileReadEvents to read the file and parse the JSON data
        handleFileReadEvents((data, err) => {
            if (err) {
                console.error('Error reading file:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            try {
                const jsonData = JSON.parse(data);
                res.json(jsonData);
            } catch (parseErr) {
                console.error('Error parsing JSON:', parseErr);
                res.status(500).send('Internal Server Error');
            }
        });
    }

    async getEventById(req, res) {
        handleFileReadEvents((data, err) => {
            if (err) {
                console.error('Error reading file:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            try {
                const jsonData = JSON.parse(data);
                const eventId = req.params.id;
                const event = jsonData.find(event => event.id === parseInt(eventId, 10));

                if (!event) {
                    res.status(404).send('Event not found');
                    return;
                }

                res.json(event);
            } catch (parseErr) {
                console.error('Error parsing JSON:', parseErr);
                res.status(500).send('Internal Server Error');
            }
        });
    }

    async rsvpEvent(req, res) {
        handleFileReadEvents((data, err) => {
            if (err) {
                console.error('Error reading file:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            try {

                let events = JSON.parse(data);
                const eventId = req.params.id;
                const userId = req.body.userId;
                const guestsCount = req.body.guestsCount;
                const eventIndex = events.findIndex(e => e.id === parseInt(eventId, 10));

                if (req.body.userId === undefined || req.body.guestsCount === undefined) {
                    return res.status(400).send('Missing required parameters: userId or guestsCount');
                }
                if (eventIndex === -1) return res.status(404).send('Event not found');



                const event = events[eventIndex];

                if (event.attendees.some(user => user.userId === userId)) {
                    return res.status(400).send('User already RSVP\'d');
                }

                event.attendees.push({ userId, guestsCount });
                event.rsvpCount += 1 + guestsCount;

                events[eventIndex] = event;

                fs.writeFile(path, JSON.stringify(events, null, 2), 'utf8', err => {
                    if (err) return res.status(500).send('Error writing file');

                    res.status(200).json(event);
                });
            } catch (parseErr) {
                console.error('Error parsing JSON:', parseErr);
                res.status(500).send('Internal Server Error');
            }
        });
    }

    async editRsvpEvent(req, res) {
        handleFileReadEvents((data, err) => {
            if (err) {
                console.error('Error reading file:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            try {
                let events = JSON.parse(data);
                const eventId = req.params.id;
                const userId = req.body.userId;
                const guestsCount = req.body.guestsCount;
                const eventIndex = events.findIndex(e => e.id === parseInt(eventId, 10));

                if (req.body.userId === undefined || req.body.guestsCount === undefined) {
                    return res.status(400).send('Missing required parameters: userId or guestsCount');
                }
                
                if (eventIndex === -1) return res.status(404).send('Event not found');

                const event = events[eventIndex];

                const attendeeIndex = event.attendees.findIndex(user => user.userId === userId);
                if (attendeeIndex === -1) {
                    return res.status(400).send('User not RSVP\'d');
                }
                const currentGuestsCount = event.attendees[attendeeIndex].guestsCount;
                event.attendees[attendeeIndex].guestsCount = guestsCount;
                event.rsvpCount = event.rsvpCount - (currentGuestsCount - guestsCount);
                events[eventIndex] = event;

                fs.writeFile(path, JSON.stringify(events, null, 2), 'utf8', err => {
                    if (err) return res.status(500).send('Error writing file');

                    res.status(200).json(event);
                });
            } catch (parseErr) {
                console.error('Error parsing JSON:', parseErr);
                res.status(500).send('Internal Server Error');
            }
        });
    }

    async deleteRsvpEvent(req, res) {
        handleFileReadEvents((data, err) => {
            if (err) {
                console.error('Error reading file:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            try {
                let events = JSON.parse(data);
                const eventId = req.params.id;
                const userId = req.body.userId;
                const eventIndex = events.findIndex(e => e.id === parseInt(eventId, 10));

                if (eventIndex === -1) return res.status(404).send('Event not found');

                const event = events[eventIndex];

                const attendeeIndex = event.attendees.findIndex(user => user.userId === userId);
                if (attendeeIndex === -1) {
                    return res.status(400).send('User not RSVP\'d');
                }
                const currentGuestsCount = event.attendees[attendeeIndex].guestsCount;
                event.attendees.splice(attendeeIndex, 1);
                event.rsvpCount = event.rsvpCount - currentGuestsCount - 1;
                events[eventIndex] = event;

                fs.writeFile(path, JSON.stringify(events, null, 2), 'utf8', err => {
                    if (err) return res.status(500).send('Error writing file');

                    res.status(200).json(event);
                });
            } catch (parseErr) {
                console.error('Error parsing JSON:', parseErr);
                res.status(500).send('Internal Server Error');
            }
        });
    }
}

export default new EventsController();