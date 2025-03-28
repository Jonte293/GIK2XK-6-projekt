import axios from './api';

// Detta gör så att vi kan hämta alla användare från users
// Det skickas en get-förfrågan till users och vi har en if-sats
// får vi status 200 så returneras usersdata som ett javascript objekt
// catch för att kunna felsöka
export async function getAll() {
    try {
        const response = await axios.get('/users');

        if(response.status === 200) return response.data;
        else {
            console.log(response);
            return [];
        }
    } catch(e) {
        e?.response ? console.log(e.response.data) : console.log(e);
    }
}