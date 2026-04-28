export default async function handler(req, res) {
  const baseUrl = process.env.CODINGCOM_API_URL || 'https://codingcom.kr';
  const apiToken = process.env.EXTERNAL_API_TOKEN;

  try {
    if (req.method === 'POST') {
      // 액션 처리 (이동, 대화 등)
      const actionUrl = `${baseUrl}/api/external/virtual-campus`;
      const response = await fetch(actionUrl, {
        method: 'POST',
        headers: {
          'X-External-Api-Key': apiToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
      });

      if (!response.ok) {
        const errorText = await response.text();
        return res.status(response.status).json({ error: `Action Failed: ${response.status}`, details: errorText });
      }

      const data = await response.json();
      return res.status(200).json(data);
    } else {
      // 기본 데이터 조회 (GET)
      // 클라이언트에서 넘겨준 쿼리 스트링이 있다면 그대로 전달 (예: memberNo)
      const query = new URLSearchParams(req.query).toString();
      const fetchUrl = `${baseUrl}/api/external/virtual-campus?${query || 'scope=room'}`;

      const response = await fetch(fetchUrl, {
        headers: {
          'X-External-Api-Key': apiToken,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        return res.status(response.status).json({ error: `Fetch Failed: ${response.status}`, details: errorText });
      }

      const data = await response.json();
      return res.status(200).json(data);
    }
  } catch (error) {
    console.error("Proxy error:", error);
    return res.status(500).json({ error: error.message });
  }
}