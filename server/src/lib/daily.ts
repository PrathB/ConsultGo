import axios from 'axios';

const DAILY_API = 'https://api.daily.co/v1/rooms';
const DAILY_KEY = process.env.DAILY_API_KEY!;

export async function createRoom() {
  const res = await axios.post(
    DAILY_API,
    { properties: { exp: Math.floor(Date.now() / 1000) + 3600 } },
    { headers: { Authorization: `Bearer ${DAILY_KEY}` } }
  );
  return { roomUrl: res.data.url, roomName: res.data.name };
}
