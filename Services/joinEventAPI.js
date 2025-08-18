export async function fetchEvents() {
  const { data } = await axios.get(`${BASE_URL}/api/events`);
  return Array.isArray(data) ? data : data?.events ?? [];
}
