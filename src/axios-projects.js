import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://time-tracker-18f25.firebaseio.com/'
});

export default instance;