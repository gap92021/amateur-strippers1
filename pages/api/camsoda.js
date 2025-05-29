export default async function handler(req, res) {
  try {
    const response = await fetch("https://www.camsoda.com/api/v1/broadcasters/online");
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('CamSoda API error:', error);
    res.status(500).json({ error: 'Failed to fetch CamSoda models' });
  }
}