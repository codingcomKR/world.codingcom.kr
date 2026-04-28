export default async function handler(req, res) {
  // 1. 디버깅용 로그 (나중에 Vercel Logs에 이 내용이 찍힙니다)
  console.log("환경변수 URL:", process.env.CODINGCOM_API_URL);
  console.log("환경변수 토큰 존재 여부:", !!process.env.EXTERNAL_API_TOKEN);

  try {
    // 2. 절대 터지지 않는 안전망: 환경변수가 비어있으면 강제로 기본 도메인 사용!
    const baseUrl = process.env.CODINGCOM_API_URL || 'https://codingcom.kr';
    const url = `${baseUrl}/api/external/virtual-campus?memberNo=2026022302&scope=room`;

    console.log("요청할 최종 주소:", url);

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${process.env.EXTERNAL_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    // 3. 만약 코딩컴 서버가 토큰 오류 등으로 거절(4xx, 5xx)했다면, 그 이유를 그대로 브라우저로 패스
    if (!response.ok) {
      const errorText = await response.text();
      console.error("코딩컴 서버가 에러를 뱉음:", response.status, errorText);
      return res.status(response.status).json({ error: `Codingcom Server Error: ${response.status}`, details: errorText });
    }

    // 4. 성공 시 데이터 반환
    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    // 5. 프록시 서버 자체가 터졌을 때 로그에 남기기
    console.error("프록시 서버 내부 치명적 에러:", error);
    return res.status(500).json({ error: error.message });
  }
}