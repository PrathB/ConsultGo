import axios from "axios";

const DAILY_API = "https://api.daily.co/v1/rooms";
const DAILY_KEY = process.env.DAILY_API_KEY!;

// Creates a new Daily room that expires in 1 hour
export async function createRoom() {
  const res = await axios.post(
    DAILY_API,
    {
      properties: {
        exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour expiry
        enable_chat: true,
      },
    },
    { headers: { Authorization: `Bearer ${DAILY_KEY}` } }
  );

  return {
    roomName: res.data.name,
    roomUrl: res.data.url,
  };
}
