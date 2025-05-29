export default async function handler(req, res) {
  try {
    const url = 'https://feed.camsoda.com/api/v1/browse/online_embed?id=market4strip&length=50';

    const response = await fetch(url);
    const contentType = response.headers.get('content-type');

    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('CamSoda API non-JSON response:', response.status, text);
      return res.status(500).json({ error: 'Non-JSON response', status: response.status, body: text });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('CamSoda API error:', error);
    res.status(500).json({ error: 'Failed to fetch CamSoda models' });
  }
}