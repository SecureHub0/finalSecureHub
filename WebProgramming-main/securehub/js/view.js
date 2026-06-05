//1. URL에서 파라미터 파싱 (예: ?id=1&from=web)
function getPostIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id')); //id값(문자) 추출 -> 숫자 1로 변환(parseInt)
  return id; //id값 반환
}

//2. 게시글 데이터를 찾아 화면에 출력
function renderPostDetail() {
  //추출한 ID값을 변수에 저장
  const postId = getPostIdFromURL();
  // PostData.js 속 postList 배열 속 id값 === URL id 파라미터값 을 만족하는 글을 변수(post)에 담음 
  const post = postList.find(item => item.id === postId);

  //post 데이터 내 title, author, date 값을 추출해 HTML에 데이터 입력
  // (<span class="postTitle">, <span class="postAuthor">, <span class="postDate"> )
  document.getElementById('postTitle').textContent = post.title;
  document.getElementById('postAuthor').textContent = post.author;
  document.getElementById('postDate').textContent = post.date;

  //2-1. 카테고리 출력
  // HTML 속 id="postCategory" 를 변수에 담음
  const categoryEl = document.getElementById('postCategory');
  if (categoryEl) { 
    const cateText = post.category; //postData.js 속 categrory값을 변수에 담음
    const lowerCate = cateText.toLowerCase(); //해당값을 소문자로 변경(toLowerCase())
    
    //태그 클래스 초기화
    categoryEl.classList.remove('tag-vul', 'tag-sec', 'tag-cve');
  
    //vulnerability라면 text(Vulnerability) 및 tag-vul 클래스 매핑
    if (lowerCate === 'vulnerability') {
      categoryEl.textContent = 'Vulnerability';
      categoryEl.classList.add('tag-vul');
      //security라면 text(Security) 및 tag-sec 클래스 매핑
    } else if (lowerCate === 'security') {
      categoryEl.textContent = 'Security';
      categoryEl.classList.add('tag-sec');
      //cve라면 text(CVE) 및 tag-cev 클래스 매핑
    } else if (lowerCate === 'cve') {
      categoryEl.textContent = 'CVE';
      categoryEl.classList.add('tag-cve');
      //위 조건 충족하지 않으면, 클래스지정X
    } else { categoryEl.textContent = cateText;}
  }

  //2-2. 게시판 경로에 따른 상단 헤더 분야 텍스트 변경
  //URL 속 from 파라미터값을 변수에 담음 (예: view.html?from=cloud)
  const params = new URLSearchParams(window.location.search);
  const fromPage = params.get('from') ? params.get('from').toLowerCase() : 'web'; //값이 없으면(null) 기본값으로 web 사용

  //헤더에 텍스트 및 목록 버튼 요소 미리 변수에 담음
  const categoryLinkEl = document.getElementById('crumbCategoryLink');
  const listBtn = document.querySelector('.header-right .btn');

  //각 분야별 어떤 이름과 어떤 링크로 접속할지 매핑 정보 정의
  const boardConfig = {
    'web': { text: 'WEB', url: 'main.html?field=web' },
    'cloud': { text: 'CLOUD', url: 'main.html?field=cloud' },
    'system': { text: 'SYSTEM', url: 'main.html?field=system' }
  };

  //현재 URL 속 파라미터값이 위에 정의한 boardConfig 객체에 존재하는지 확인 || 만약 없으면 기본 설정값 web
  const currentBoard = boardConfig[fromPage] || boardConfig['web'];

  //상단 분야 텍스트 및 HTML 내 <a> 주소 수정
  if (categoryLinkEl) {
    categoryLinkEl.textContent = currentBoard.text;
    categoryLinkEl.href = currentBoard.url;
  }

  //목록 버튼 주소 변경
  if (listBtn) {
    listBtn.href = currentBoard.url;
  }


  //3. 글 콘텐츠 삽입
  //3-1. 개요
  //HTML 내 개요 섹션 전체 영역 변수에 저장(<section id="sectionOverview">)
  const secOverview = document.getElementById('sectionOverview');
  //post(2번에서 정의) 객체 내 overview 및 description이 있다면
  if (post.overview && post.overview.description) { 
    //postData.js 내 title 삽입 || 1.개요
    document.getElementById('overviewTitle').textContent = post.overview.title || '1. 개요';
    //postData.js 내 description 삽입
    document.getElementById('overviewDesc').textContent = post.overview.description;
    //화면 출력
    secOverview.style.display = 'block';
  } else {
    //postData.js에 데이터가 없는 섹션은 숨김 처리
    secOverview.style.display = 'none';
  }

  //3-2. 핵심개념 섹션
  //HTML 내 핵심개념 섹션 전체 영역 변수에 저장(<section id="sectionCoreConcept">) 
  const secCoreConcept = document.getElementById('sectionCoreConcept');
  //post(2번에서 정의) 객체 내 descripttion 및 coreConcept가 있다면
  if (post.coreConcept && (post.coreConcept.description || post.coreConcept.code)) {
    //postData.js 내 coreConcept 삽입 || 2. 핵심 개념
    document.getElementById('coreConceptTitle').textContent = post.coreConcept.title || '2. 핵심 개념';
    
    //HTML 핵심개념 섹션의 데이터 변수에 저장(<p id="coreConceptDesc"></p>)
    const descEl = document.getElementById('coreConceptDesc');
    //post(2번에서 정의) 객체 내 descript이 존재한다면
    if (post.coreConcept.description) { 
      //postData.js 내 description 삽입
      descEl.textContent = post.coreConcept.description;
      descEl.style.whiteSpace = 'pre-line'; // 줄바꿈(\n)을 화면에서 엔터로 처리
      descEl.style.display = 'block'; //화면 출력
    } else {
      descEl.style.display = 'none'; //postData.js에 데이터가 없는 섹션은 숨김 처리
    }

    //HTML 내 코드 블록 섹션 변수에 저장(<div id="codeBlockContainer">)
    const codeContainer = document.getElementById('codeBlockContainer');
    //( <code id="codeBlock"></code> )
    const codeBlock = document.getElementById('codeBlock');
    
    //post(2번에서 정의) 객체 내 code 존재 && 문자열일이라면
    if (post.coreConcept.code && typeof post.coreConcept.code === 'string') {
      codeContainer.style.display = 'block'; //코드박스 표시
      codeBlock.innerHTML = ''; //이전 글의 코드 초기화
      //XSS 예제 코드 대비, 단순 문장려 전환(textContent)
      codeBlock.textContent = post.coreConcept.code;
    } else {
      codeContainer.style.display = 'none'; //postData.js에 데이터가 없는 섹션은 숨김 처리
    }
    secCoreConcept.style.display = 'block'; //화면 출력
  } else {
    secCoreConcept.style.display = 'none'; //postData.js에 데이터가 없는 섹션은 숨김 처리
  }

  //3-3. 주요피해 섹션
  //HTML 내 주요피해 섹션 전체 영역 변수에 저장(<section id="sectionDamageTypes">) 
  const secDamageTypes = document.getElementById('sectionDamageTypes');
  //post(2번에서 정의) 객체에 damageTypes 데이터가 있다면
  if (post.damageTypes && post.damageTypes.list && post.damageTypes.list.length > 0) {
    //PostData.js 내 title 삽입 || 3. 주요 피해 유형
    document.getElementById('damageTypesTitle').textContent = post.damageTypes.title || '3. 주요 피해 유형';
    //( <ul id="damageTypesList"> )
    const listContainer = document.getElementById('damageTypesList');
    listContainer.innerHTML = ''; //이전 글 데이터 초기화

    //PostData.js 속 damageTypes 리스트 요소 순회
    post.damageTypes.list.forEach(item => {
      if (item.label || item.detail) { //label이나 detial 중 하나라도 있으면
        const li = document.createElement('li'); //<li> 생성
        //<li> 내 삽입
        li.innerHTML = `<strong>${item.label || ''}</strong> ${item.detail || ''}`;
        listContainer.appendChild(li); //lsitContainer(위 10줄에서 정의) 내 <li> 추가
      }
    });
    secDamageTypes.style.display = 'block'; //화면 출력
  } else {
    secDamageTypes.style.display = 'none'; //postData.js에 데이터가 없는 섹션은 숨김 처리
  }

  //3-4. 방어방법 섹션
  //HTML 내 방어방법 섹션 전체 영역 변수에 저장(<section id="sectionDefenses">) 
  const secDefenses = document.getElementById('sectionDefenses');
  if (post.defenses) { //psot(2번에서 정의) 객체 내 defense가 존재하면
    //postData.js 내 title 삽입 || 4. 방어 방법
    document.getElementById('defensesTitle').textContent = post.defenses.title || '4. 방어 방법';
    
    //( <ul id="defensesList"></ul> )
    const listContainer = document.getElementById('defensesList');
    if (listContainer) listContainer.innerHTML = ''; //이전 데이터 초기화
    //이전 설명박스, 코드박스 초기화
    document.querySelectorAll('.dynamic-box').forEach(el => el.remove());

    //리스트 데이터가 있으면 렌더링
    if (post.defenses.list && post.defenses.list.length > 0) {
      post.defenses.list.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        listContainer.appendChild(li);
      });
    }

    //post(2번에서 정의) 객체 내 description이 존재한다면
    if (post.defenses.description) {
      const defenseDescEl = document.createElement('p'); //<p> 생성
      defenseDescEl.className = 'dynamic-box'; //코드 초기화를 위해 클래스(.dynamic-box) 부여
      //psotData.js 에서 descrtiption 변수 정의
      let rawDesc = post.defenses.description;
      defenseDescEl.innerHTML = rawDesc; //화면 출력
      
      defenseDescEl.style.whiteSpace = 'pre-line'; //줄바꿈 보존
      defenseDescEl.style.marginBottom = '15px'; //여백 설정
      
      //제목 바로 아래에 삽입(.after)
      document.getElementById('defensesTitle').after(defenseDescEl);
    }

    //post(2번에서 정의) 객체 내 codeList 순회
    if (post.defenses.codeList && post.defenses.codeList.length > 0) {
      // .after 특성 상 배열 순서를 역순으로 뒤집으므로, reverse 사용
      [...post.defenses.codeList].reverse().forEach(codeText => {
        const pre = document.createElement('pre'); //<pre> 생성    
        const code = document.createElement('code'); //<code> 생성
        
        pre.className = 'dynamic-box code-box-style'; //view.css 적용
        code.className = 'code-text-style'; //view.css 적용
        
        //XSS 예제 코드 대비, 단순 문장려 전환(textContent)
        code.textContent = codeText; 
        
        pre.appendChild(code); //<pre> 내 <code> 삽입
        // 가장 마지막에 생성된 .dynamic-box 바로 뒤에 삽입
        const lastDynamic = document.querySelector('.dynamic-box:last-of-type');
        lastDynamic.after(pre); 
      });
    }
    secDefenses.style.display = 'block'; //화면 출력
  } else {
    secDefenses.style.display = 'none'; //postData.js에 데이터가 없는 섹션은 숨김 처리
  }

  //3-5. 링크 섹션
  //HTML 내 링크 섹션 전체 영역 변수에 저장(<section id="sectionReferences">) 
  const secReferences = document.getElementById('sectionReferences');
  //링크가 존재 && 최소 1개 이상의 데이터가 존재하면
  if (post.referenceLinks && post.referenceLinks.list && post.referenceLinks.list.length > 0) {
    //postData.js 내 tilte 삽입 || 5. 관련 링크
    document.getElementById('referencesTitle').textContent = post.referenceLinks.title || '5. 관련 링크';

    //( <ul id="referencesList"></ul> )
    const listContainer = document.getElementById('referencesList');
    listContainer.innerHTML = ''; //이전 데이터 초기화

    //post(2번에서 정의) 객체 내 list 순회
    post.referenceLinks.list.forEach(link => {
      if (link.name && link.url) { //name과 url이 모두 존재한다면
        const li = document.createElement('li'); //<li> 생성
        const a = document.createElement('a'); //<a>생성
        
        a.href = link.url; //주소 연결
        a.target = '_blank'; //클릭 시 새 창에서 열림
        a.textContent = link.name; //화면에 출력할 텍스트
        a.className = 'reference-link'; //view.css 적용

        li.appendChild(a); //<li> 내 <a> 삽입
        listContainer.appendChild(li); //lsitContainer(위 16줄에서 정의) 내 <li> 추가
      }
    });
    secReferences.style.display = 'block'; //화면 출력
  } else {
    secReferences.style.display = 'none'; //psotData.js에 없는 섹션은 숨김 처리
  }
}

//화면 출력
window.addEventListener('DOMContentLoaded', renderPostDetail);