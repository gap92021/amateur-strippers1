export default async function handler(req, res) {
  try {
    const clientIp = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress || 'request_ip';
    const url = `https://chaturbate.com/api/public/affiliates/onlinerooms/?wm=Ngr0e&client_ip=${clientIp}&format=json&limit=20`;

    const response = await fetch(url);
    const contentType = response.headers.get('content-type');

    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Chaturbate API non-JSON response:', response.status, text);
      return res.status(500).json({ error: 'Non-JSON response', status: response.status, body: text });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Chaturbate API error:', error);
    res.status(500).json({ error: 'Failed to fetch Chaturbate models' });
  }
}