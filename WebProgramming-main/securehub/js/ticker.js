// js/ticker.js
document.addEventListener('DOMContentLoaded', () => {
  const rail = document.getElementById('tickerRail')
  if (!rail) return

  // 📌 제목과 실제 기사 상세 페이지 링크를 1:1로 정확하게 매칭 완료했습니다.
  const realSecurityNews = [
    {
      title:
        'CU 택배 전산망 뚫렸다... BGF네트웍스, 웹 취약점 해킹으로 CI 등 유출',
      link: 'https://www.boannews.com/media/view.asp?idx=143985&page=1&kind=1',
      date: '2026-06-06',
    },
    {
      title:
        '무분별한 AI 도입 막는다... 美 연방 정부, 표준화된 안보 가이드라인 구축',
      link: 'https://www.boannews.com/media/view.asp?idx=143975&page=1&kind=2',
      date: '2026-06-05',
    },
    {
      title:
        'KT, 제로트러스트 보안 전략 고도화....전사 시스템에 ‘선제적 대응 체계’ 적용',
      link: 'https://www.boannews.com/media/view.asp?idx=143991&page=1&kind=3',
      date: '2026-06-07',
    },
    {
      title:
        'KISA, 판교 정보보호클러스터서 ‘화이트햇스쿨 4기’ 입학식... AI 보안 인재 키운다',
      link: 'https://www.boannews.com/media/view.asp?idx=143983&page=1&kind=2',
      date: '2026-06-05',
    },
    {
      title: '전 세계 윈도우 서버가 표적... ‘Netlogon’ 제로클릭 취약점',
      link: 'https://www.boannews.com/media/view.asp?idx=143912&page=1&kind=1',
      date: '2026-06-06',
    },
    {
      title:
        '인포트렌드, CCTV·보안 분석 등 실사용 환경에 최적화된 타워형·랙형 서버 공개',
      link: 'https://www.boannews.com/media/view.asp?idx=143972&page=1&kind=3',
      date: '2026-06-06',
    },
    {
      title:
        '스스로 판단하고 막아낸다... 이글루코퍼레이션, ‘자율형 보안운영센터’ 본격화',
      link: 'https://www.boannews.com/media/view.asp?idx=143965&page=1&kind=2',
      date: '2026-06-04',
    },
  ]

  // 2. 페이지에 들어올 때마다 뉴스가 무작위로 섞여서 5개 노출됩니다.
  const shuffledNews = [...realSecurityNews]
    .sort(() => Math.random() - 0.5)
    .slice(0, 5)

  // 3. 전광판 구조 생성 (target="_blank" 속성으로 새 탭에서 진짜 기사 열림)
  const baseContent = shuffledNews
    .map(
      (item) => `
    <span class="ticker-item">
      <span class="tag tag-cve">NEWS</span>
      <a href="${item.link}" target="_blank" class="ticker-link">${item.title}</a>
      <span class="ticker-date">[${item.date}]</span>
    </span>
  `,
    )
    .join('')

  // 4. 무한 루프를 위해 2개 세트 배치
  rail.innerHTML = `
    <div class="ticker-set" style="display:inline-flex;">${baseContent}</div>
    <div class="ticker-set" style="display:inline-flex;">${baseContent}</div>
  `

  // 5. 애니메이션 부드럽게 실행
  const firstSet = rail.querySelector('.ticker-set')
  if (!firstSet) return

  setTimeout(() => {
    const setWidth = firstSet.offsetWidth
    const tickerAnimation = rail.animate(
      [
        { transform: 'translateX(0px)' },
        { transform: `translateX(-${setWidth}px)` },
      ],
      {
        duration: 35000,
        iterations: Infinity,
      },
    )

    rail.addEventListener('mouseenter', () => tickerAnimation.pause())
    rail.addEventListener('mouseleave', () => tickerAnimation.play())
  }, 150)
})
