import fs from 'fs';
import jwt from 'jsonwebtoken';


const usersPath = './data/users.json';
const secretKey = 'my-secret-key';


class AuthController {
    async getUser(req, res) {
        const { username, password } = req.body;

        fs.readFile(usersPath, 'utf8', (err, data) => {
            if (err) return res.status(500).send('Internal Server Error');
            if (!data) return res.status(404).send('Users data not found');
            if (!username || !password) return res.status(400).send('Bad Request: Missing username or password');

            const users = JSON.parse(data);
            const user = users.find(u => u.username === username && u.password === password);

            if (!user) {
                return res.status(401).send('Anauthorized: Invalid username or password');
            }

            const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });

            res.status(200).json({ token, user: { id: user.id, username: user.username } });
        });
    };
}

export default new AuthController();