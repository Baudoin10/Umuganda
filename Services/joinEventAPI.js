export async function fetchEvents() {
  const { data } = await axios.get(`${BASE_URL}/api/events`);
  const list = Array.isArray(data) ? data : data?.events ?? [];
  return list.map((e) => ({
    ...e,
    participantsCount:
      (Array.isArray(e.participants)
        ? e.participants.length
        : e.participantsCount) || 0,
  }));
}
