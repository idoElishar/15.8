import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = 3000;

const arr = [
    {
        id: uuidv4(),
        email: 'c22@gmail.com',
        password: '3214'
    },
    {
        id: uuidv4(),
        email: 'fsf32@gmail.com',
        password: '1234'
    },
    {
        id: uuidv4(),
        email: 'f453@gmail.com',
        password: '5362'
    },
];

app.use(express.json()); // parse JSON requests

// Create a new user
app.post('/createUser', (req, res) => {
    const newUser = {
        id: uuidv4(), // generate a unique ID
        email: req.body.email,
        password: req.body.password,
    };

    arr.push(newUser);
    res.status(201).json(newUser);
});

// Get user by ID
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    
    const user = arr.find(item => item.id === userId);
    
    if (user) {
        res.send(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Update user by ID
app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const { email, password } = req.body;
    
    const userIndex = arr.findIndex(item => item.id === userId);
    
    if (userIndex !== -1) {
        arr[userIndex] = { ...arr[userIndex], email, password };
        res.json(arr[userIndex]);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Delete user by ID
app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    
    const userIndex = arr.findIndex(item => item.id === userId);
    
    if (userIndex !== -1) {
        arr.splice(userIndex, 1);
        res.json({ message: 'User deleted' });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Check if user exists by email and password
app.post('/checkUser', (req, res) => {
    const { email, password } = req.body;

    const user = arr.find(item => item.email === email && item.password === password);
    
    if (user) {
        res.json({ message: 'User exists' });
    } else {
        res.json({ message: 'User does not exist' });
    }
});


// PUT request to root
app.put('/', (req, res) => {
    // Your PUT logic here
    res.send("PUT request to /");
});

// Get all users
app.get('/', (req, res) => {
    res.send(arr);
});

app.listen(port, () => {
    console.log(`Server is up and running on port:${port}`);
});

git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/idoElishar/15.8.git
git push -u origin main