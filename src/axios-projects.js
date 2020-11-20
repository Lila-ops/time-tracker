import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://time-tracker-a06e9.firebaseio.com/'
});

export default instance;