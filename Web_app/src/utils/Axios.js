import axios from 'axios';

const instance = axios.create({
    baseURL: `//localhost:5000/Mimic`,
    headers: {
        "Content-Type": "application/json"
    }
});

export default instance;