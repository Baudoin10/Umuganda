import axios from axios

export const fetchEvents = async () => {
    const res = await axios.get("/api/events")
    return Array.isArray(res.data) ? res.data : res.data?.events ?? [];

}