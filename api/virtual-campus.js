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
      const urlParams = new URLSearchParams(req.query);
      if (!urlParams.has('memberNo')) {
        urlParams.set('memberNo', '2026022302'); // 기본 테스트용 번호
      }
      if (!urlParams.has('scope')) {
        urlParams.set('scope', 'room');
      }
      const fetchUrl = `${baseUrl}/api/external/virtual-campus?${urlParams.toString()}`;

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