export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.chaturbate.com/public/affiliates/onlinerooms/?wm=Ngr0e&client_ip=request_ip&format=json&limit=20");
    const contentType = response.headers.get('content-type');

    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Chaturbate API non-JSON response:', response.status, text);
      return res.status(500).json({ error: 'Non-JSON response', status: response.status });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Chaturbate API error:', error);
    res.status(500).json({ error: 'Failed to fetch Chaturbate models' });
  }
}