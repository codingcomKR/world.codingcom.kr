export default async function handler(req, res) {
  try {
    const url = `${process.env.CODINGCOM_API_URL}/api/external/virtual-campus?memberNo=2026022302&scope=room`;
    const response = await fetch(url, {
      headers: { 'Authorization': `Bearer ${process.env.EXTERNAL_API_TOKEN}` }
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
