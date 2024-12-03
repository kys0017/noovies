const API_ACC_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMjIxMmU5MzM4ZTIxODk5ZjI5YzUwMTA4ODJkMTNkMSIsIm5iZiI6MTYzMzA4MDIzNC40ODE5OTk5LCJzdWIiOiI2MTU2ZDNhYTE1NmNjNzAwMmMxZjNkNjEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.3vKKFH7_CaHANmn6GNVJ_9QfzZJg6gdaqgFej8CqE78';
const BASE_URL = 'https://api.themoviedb.org/3';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_ACC_TOKEN}`
  }
};

export const trending = () => fetch(`${BASE_URL}/trending/movie/week?language=en-US`, options).then(res => res.json());

export const upcoming = () => fetch(`${BASE_URL}/movie/upcoming?language=en-US&page=1`, options).then(res => res.json());

export const nowPlaying = () => fetch(`${BASE_URL}/movie/now_playing?language=en-US&page=1`,
  options).then(res => res.json());