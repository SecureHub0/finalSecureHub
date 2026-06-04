//1. 현재 URL 주소창의 쿼리 스트링 분석 (?field=web&category=security)
const params = new URLSearchParams(window.location.search);
//1-1. filed 파라미터값을 변수에 저장: 값이 있으면 소문자 통일, 없으면 기본값 web
let field = params.get("field") ? params.get("field").toLowerCase() : "web";
//1-2. category 파라미터값을 변수에 저장: 없으면 기본값 all(전체보기)
const category = params.get("category") || "all";

//2. HTML 속 id값 위치를 변수에 저장
//2-1. 글 목록 행(tr)을 출력할 테이블 본문 구역 (<tbody id="boardBody")
const boardBody = document.getElementById("boardBody");
//2-2. 상단 헤더 영역에 게시할 분야명 (<span id="fieldTitle">)
const fieldTitle = document.getElementById("fieldTitle");
//2-3. 본문 제목 (<h2 id="contentTitle">) 
const contentTitle = document.querySelector(".content-header h2");
//2-4. 세부 정보 (분류: WEb > 전체보기) (<p id="contentCrumb">)
const contentPath = document.querySelector(".content-header p");

//2-6. postData.js 속 catego 텍스트에 매치되는 CSS 디자인 클래스 및 실제 텍스트 매핑
function getTagInfo(cate) { //postData.js로부터 cate 변수(category값)를 받아서 
  const lowerCate = cate.toLowerCase(); //.toLowerCase() 소문자로 변환
  //vulnerability라면 tag-vul 클래스와 실제 텍스트(Vulneerability)로 매핑
  if (lowerCate === "vulnerability") return { className: "tag-vul", text: "Vulnerability" }; 
  //security라면 tag-sec 클래스와 실제 텍스트(security)로 매핑
  if (lowerCate === "security") return { className: "tag-sec", text: "Security" };
  //cve라면 tag-cve 클래스와 실제 텍스트(CVE)로 매핑
  if (lowerCate === "cve") return { className: "tag-cve", text: "CVE" };
  //위 조건에 해당되지 않는 경우, tag-default 클래스와 텍스트(cate)로 매핑
  return { className: "tag-default", text: cate };
}

//3. 분야별 메인 타이틀 매핑
const titleMap = {
  web: "WEB 보안 취약점",
  system: "SYSTEM 보안 취약점",
  cloud: "CLOUD 보안 취약점"
};

//3-1. postData.js 속 filed를 대문자로 변환(toUpeeracase()) -> HTML 위치(<span id="fieldTitle">)에 삽입
fieldTitle.textContent = field.toUpperCase(); 
//3-2. postData.js 속 filed 값을 titleMap에서 찾아 매핑 -> HTML 위치 (<h2 id="contentTitle">)에 삽입
contentTitle.textContent = titleMap[field];

//3-3. category가 all 이라면 '전체보기' 텍스트 붙이기
// : 아니라면 영어 첫 글자(category.charAt(0))만 대문자(.toUpperCase())로 변경 + 나머지는 그대로 (category.slice(1))
const displayCategory = category === 'all' ? '전체보기' : category.charAt(0).toUpperCase() + category.slice(1);
//HTML (<p id="contentCrumb">) 위치에 삽입
contentPath.textContent = `분류: ${field.toUpperCase()} > ${displayCategory}`;


//4. 상단 탭 메뉴(WEB/SYSTEM/CLOUD) active 효과 부여
//.top-nav 클래스를 가진 요소 안의 모든 <a>를 변수에 담음(querySelectorAll)
const topNavLinks = document.querySelectorAll(".top-nav a");
topNavLinks.forEach(link => { //변수 속 객체(<a> = Link)를 순회
  const url = new URL(link.href, window.location.origin); //각 객체(<a> = Link) 의 href를 파싱 주소 파싱
  const linkField = url.searchParams.get("field"); //추출된 URL에서 ?field 값만 추출

  //filed값이 존재 && 추출한 field값 === 현재 URL 내 field
  if (linkField && linkField.toLowerCase() === field.toLowerCase()) {
    link.classList.add("active"); //해당 <a>에 active 클래스명 추가 (main.js에서 효과부여)
  } else { //아니라면
    link.classList.remove("active"); //active 클래스 삭제
  }
});

//5. 사이드바 분류(all, Security 등) current 효과 부여
//사이드바 내 모든 <a>를 변수에 담음(querySelectorAll)
const sidebarLinks = document.querySelectorAll("#sidebarMenu a");
sidebarLinks.forEach(link => { //변수 속 객체(<a> = Link)를 순회
  const cateType = link.getAttribute("data-category"); //HTML에 <a data-category="vulnerability"> 속 vulnerability만 추출 (다른 카테고리도 동일)
  if (cateType) { 
    // 주소 변경 (현재 위치한 field 유지 & 추출한 카테고리)
    link.href = `main.html?field=${field}&category=${cateType}`;
    
    // 사이드바 category === 현재 URL 속 category값
    if (cateType.toLowerCase() === category.toLowerCase()) {
      link.classList.add("current"); //해당 <a>에 current 클래스명 추가 (main.js에서 효과부여)
    } else { //아니라면
      link.classList.remove("current"); //current 클래스 삭제
    }
  }
});

//6. filed, category를 기반으로 게시판에 글 필터링
//postData.js 속 psotList 배열 속 속성을 다 꺼내 post 객체에 담음
const filteredPosts = postList.filter(post => {
  //psotdata.js 속 field === 현재 URL 속 field 파라미터값, 아니라면 제외
  const matchField = post.field.toLowerCase() === field.toLowerCase();
  //카테고리가 all or(||) 특정 psotData.js 속 category값 === 현재 URL 속 category값 이라면 통과
  const matchCategory = (category === "all") || (post.category.toLowerCase() === category.toLowerCase());
  //두 조건(filed && category) 모두 일치 시 filterPosts 배열에 남김
  return matchField && matchCategory;
});

//7. 게시판에 게시글 띄우기(메인처리)
boardBody.innerHTML = ""; //main.html 속 <tbody> 초기화

//필터링된 글이 하나도 없다면
if (filteredPosts.length === 0) {
  //표의 4칸을 하나로 합쳐(colspan="4") '글 없음' 문구 띄움
  boardBody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding:30px;">등록된 게시글이 없습니다.</td></tr>`;
} else {
  // filteredPosts 배열(7번)에서 하나씩 꺼내(forEach) post 객체에 담음, index 순번(0부터)
  filteredPosts.forEach((post, index) => {
    //카테고리 정보 추출 함수 호출 (2-6)
    const tagInfo = getTagInfo(post.category);
    //index가 0부터 시작하므로, 화면에 표시할 수는 1
    const displayNum = index + 1; 

    //HTMl 코드 main.html 속 tbody 뒤에 이어 붙이기(+=)
    boardBody.innerHTML += `
      <tr>
        <td>${displayNum}</td>
        <td>
          <span class="tag ${tagInfo.className}">${tagInfo.text}</span>
        </td>
        <td class="title-cell">
          <a href="view.html?id=${post.id}&from=${field}">${post.title}</a>
        </td>
        <td>${post.date}</td>
      </tr>
    `;
  });
}