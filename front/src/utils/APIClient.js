import axios from 'axios'

const api = "http://localhost:3003"

// Generate a unique token for storing your bookshelf data on the backend server.
const headers = {
    'Accept': 'application/json',
    'method' : 'GET'
}

export const getStatistic = (symbol) =>
    axios.get(`${api}/`, {'headers' : headers})
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error(error);
        });
