const postList = [
  {
    id: 1,
    field: "web",
    title: "[Injection] SQL 인젝션 분석 및 방어",
    category: "vulnerability",
    author: "Kim",
    date: "2026-04-09",
    overview: {
      title: "1. 개요",
      description: "SQL 인젝션(SQL Injection)이란 웹 애플리케이션이 사용자로부터 입력받은 값을 적절한 검증 없이 데이터베이스(DB) 쿼리문 생성을 위한 인자로 사용할 때 발생하는 취약점입니다. 입력값이 단순 데이터가 아닌 'SQL 명령어(코드)'로 해석되어 데이터베이스가 비정상적으로 동작하게 만듭니다."
    },
    coreConcept: {
      title: "2. 핵심 개념",
      description: "공격자가 입력 창이나 URL 파라미터에 악의적인 SQL 구문을 주입하면, 웹 서버는 이를 정상적인 SQL 명령의 일부로 판단하고 실행합니다.\n공격 원리 예시:",
      code: "SELECT * FROM users WHERE id = 'admin' OR '1'='1' AND pw = '...';"
    },
    damageTypes: {
      title: "3. 주요 피해 유형",
      list: [
        { label: "데이터 유출:", detail: "회원 정보, 비밀번호 등 민감 데이터 무단 조회" },
        { label: "인증 우회:", detail: "비밀번호를 몰라도 관리자 계정으로 로그인 성공" },
        { label: "데이터 파괴:", detail: "DB 테이블 삭제(Drop) 또는 임의 데이터 수정" }
      ]
    },
    defenses: {
      title: "4. 방어 방법",
      list: [
        "PreparedStatement(매개변수화된 쿼리)를 사용하여 입력값 분리",
        "사용자 입력값에 대해 화이트리스트 기반 필터링 적용",
        "DB 계정의 권한을 최소한으로 설정하여 피해 범위 최소화"
      ]
    },
    referenceLinks: {
      title: "5. 링크",
      list: [
        { name: "Drupal API SQL Injection (CVE-2026-9082) 동향", url: "https://www.skshieldus.com/security-insights/trends/drupal-api-sql-injection-cve-2026-9082" }
      ]
    }
  },
  {
    id: 2,
    field: "web",
    title: "[XSS] 신규 게시판 스크립트 실행 취약점",
    category: "vulnerability",
    author: "Kim",
    date: "2026-04-09",
    overview: {
      title: "1. 개요",
      description: "XSS(Cross-Site Scripting, 사이트 간 스크립팅)는 웹 애플리케이션이 사용자 입력값을 검증하지 않고 그대로 브라우저에 출력할 때 발생하는 취약점입니다. 공격자가 악성 스크립트를 삽입하면, 해당 웹 페이지를 방문하는 일반 사용자의 브라우저에서 스크립트가 실행됩니다."
    },
    coreConcept: {
      title: "2. 핵심 개념",
      description: "사용자의 브라우저에서 의도하지 않은 악성 스크립트가 실행되도록 유도하는 취약점입니다. 공격 원리 예시:",
      code: "<script>alert('XSS');</script>"
    },
    damageTypes: {
      title: "3. 주요 피해 유형",
      list: [
        { label: "세션 탈취:", detail: "사용자의 쿠키 정보를 가로채 계정 도용" },
        { label: "피싱:", detail: "가짜 입력창을 띄워 개인정보 유도" },
        { label: "데이터 변조:", detail: "웹 페이지의 내용을 임의로 수정" }
      ]
    },
    defenses: {
      title: "4. 방어 방법",
      list: [
        "입력값에 대한 검증 및 필터링 수행",
        "출력 시 HTML 엔티티 인코딩 적용",
        "보안 정책(CSP) 설정을 통해 스크립트 실행 제한"
      ]
    },
    referenceLinks: {
      title: "5. 링크",
      list: [
        { name: "EQST Insight - CVE 분석 보고서", url: "https://www.skshieldus.com/report/eqstInsight/cve2411.html" }
      ]
    }
  },
  {
    id: 3,
    field: "web",
    title: "[CSRF] CSRF(사이트 간 요청 위조) 분석 및 방어",
    category: "vulnerability",
    author: "Kim",
    date: "2026-04-09",
    overview: {
      title: "1. 개요",
      description: "CSRF(Cross-Site Request Forgery, 사이트 간 요청 위조)는 특정 웹사이트에 로그인되어 있는 사용자가, 공격자가 유도한 악성 링크나 페이지를 방문함으로써 자신의 의지와 상관없이 특정 요청(수정, 송금, 삭제 등)을 서버에 전송하게 만드는 취약점입니다."
    },
    coreConcept: {
      title: "2. 핵심 개념",
      description: "로그인된 사용자의 세션 권한을 이용해, 공격자가 의도한 요청(송금, 비밀번호 변경 등)을 서버에 강제로 보내게 만드는 취약점입니다. 공격 원리 예시:",
      code: "<img src=\"http://bank.com/transfer?to=attacker&amount=10000\" style=\"display:none;\" />"
    },
    damageTypes: {
      title: "3. 주요 피해 유형",
      list: [
        { label: "사용자 권한 오용:", detail: "본인도 모르게 게시글 작성, 회원정보 변경" },
        { label: "금전적 피해:", detail: "금융 사이트에서의 무단 이체 및 결제 실행" },
        { label: "계정 탈취:", detail: "이메일이나 비밀번호를 변경하여 계정 점유" }
      ]
    },
    defenses: {
      title: "4. 방어 방법",
      list: [
        "모든 요청에 대해 CSRF Token을 발급하고 유효성 검증",
        "쿠키 설정 시 SameSite=Lax 또는 Strict 속성을 부여",
        "주요 작업 수행 시 비밀번호 재입력 또는 2단계 인증 요구"
      ]
    },
    referenceLinks: {
      title: "5. 링크",
      list: [
        { name: "NVD - CVE-2025-24358 상세 정보", url: "https://nvd.nist.gov/vuln/detail/CVE-2025-24358" }
      ]
    }
  },
  {
    id: 4,
    field: "cloud", // AWS 관련이므로 cloud 필드로 지정
    title: "CVE-2025-0693: AWS IAM 사용자 열거 취약점",
    category: "cve",
    author: "이제희",
    date: "2026-04-14",
    overview: {
      title: "1. 개요",
      description: "사용자 이름 열거(User Enumeration) 취약점은 공격자가 시스템 내 유효한 계정을 식별해내는 공격 초기 단계의 취약점이다. 보안 업체 Rhino Security Labs가 AWS 웹 콘솔 침투 테스트 중 발견하였다."
    },
    coreConcept: {
      title: "2. 핵심 개념: 사용자 이름 열거 (MFA 활성화)",
      description: "IAM 사용자 계정에 MFA(다단계 인증)이 활성화된 경우, 로그인 과정에서 사용자 여부가 노출될 수 있는 문제가 발생한다. 시스템은 해당 사용자의 존재 여부를 확인한 후, 계정이 존재할 경우 MFA 입력 단계로 진행된다. 만약 존재하지 않는 경우 에러 메시지를 반환하고 사용자가 존재하는 경우, 비밀번호 일치 여부와 무관히 다음 페이지에서 MFA 코드 입력이 요구된다. 즉, 공격자는 해당 반응 차이를 통해 IAM 계정명의 실제 존재 여부 확인이 가능해진다.",
      code: null
    },
    damageTypes: {
      title: "3. 주요 피해 유형",
      list: [
        { label: "유효 계정 수집:", detail: "공격자가 무차별 대입(Brute Force) 공격을 수행할 타깃 계정 확보" },
        { label: "인프라 정보 노출:", detail: "특정 사내 계정 규칙이나 사용자 이름 체계 파괴 및 유출" }
      ]
    },
    defenses: {
      title: "4. 방어 방법: 인증 타이밍 공격 방지",
      description: "서버가 계정 존재 여부와 무관하게 동일한 시간 동안 동일한 처리를 하도록 설계해야 한다.",
      codeList: [
        `IF USER_EXISTS (username) THEN
    password_hash = HASH ( password )
    IS_VALID = LOOKUP_CREDENTIALS_IN_STORE ( username , password_hash )
    IF NOT IS_VALID THEN RETURN Error ( "잘못된 사용자 이름 또는 비밀번호입니다!")
ELSE 
    RETURN Error ( "잘못된 사용자 이름 또는 비밀번호입니다!")
ENDIF`,
        `password_hash = HASH ( password)
IS_VALID = LOOKUP_CREDENTIALS_In_STORE ( username , password_hash)
IF NOT IS_VALID THEN
    RETURN Error ( "잘못된 사용자 이름 또는 암호입니다!" ) 
ENDIF`
      ]
    },
    referenceLinks: {
      title: "5. 관련 링크",
      list: [
        { name: "Rhino Security Labs - AWS Research 상세", url: "https://rhinosecuritylabs.com/research/unauthenticated-username-enumeration-in-aws/" }
      ]
    }
  },
  {
    id: 5,
    field: "System",
    title: "sudo 원데이 분석 (CVE-2019-14287)",
    category: "CVE",
    author: "cucu",
    date: "2026-06-04",
    overview: {
      title: "1. 개요",
      description: "Sudo 취약점(CVE-2019-14287)은 -u 옵션의 입력값 검증 미흡을 이용하여 /etc/sudoers 파일의 보안 정책을 우회하고 root 권한을 획득하는 공격입니다."
    },
    coreConcept: {
      title: "2. 핵심 개념",
      description: "공격자는 -u 옵션에 UID 값으로 -1 또는 4294967295를 입력합니다.\n시스템은 이 값을 0(root)이 아닌 것으로 판단하여 정책을 통과시킵니다.\n실제 실행 시에는 이를 '권한 변경 없음'으로 해석하여 root(0) 권한으로 명령이 실행됩니다."
    },
    damageTypes: {
      title: "3. 주요 피해 유형",
      list: [
        { label: "시스템 장악:", detail: "공격자가 시스템의 최고 관리자(root) 권한을 탈취" },
        { label: "권한 남용:", detail: "중요 파일 무단 삭제, 백도어 설치 등 시스템 전체 장악" }
      ]
    },
    defenses: {
      title: "4. 방어 방법",
      list: [
        "Sudo 버전을 1.8.28 이후로 업데이트",
        "UID 입력값에 대한 예외 처리가 포함된 패치 적용"
      ]
    },
    referenceLinks: {
      title: "5. 링크",
      list: [
        { name: "CVE-2019-14287 분석", url: "https://www.cyberone.kr/news-trends-detail?id=55517&page=1" }
      ]
    }
  },
  {
    id: 6,
    field: "System",
    title: "BOF (Buffer OverFlow) 개념 정리",
    category: "Vulnerability",
    author: "cucu",
    date: "2026-06-04",
    overview: {
      title: "1. 개요",
      description: "버퍼 오버플로우는 할당된 메모리 범위를 넘어서는 데이터를 입력하여 인접한 영역을 덮어쓰는 취약점입니다."
    },
    coreConcept: {
      title: "2. 핵심 개념",
      description: "스택은 데이터 저장 방향과 제어 정보의 위치 때문에 오버플로우에 매우 취약한 구조를 가집니다."
    },
    damageTypes: {
      title: "3. 주요 피해 유형",
      list: [
        { label: "중요 데이터 변조:", detail: "버퍼 뒤의 변수를 덮어써서 프로그램의 로직을 무력화" },
        { label: "데이터 유출:", detail: "널바이트를 제거하여 메모리 내 민감한 정보를 노출" },
        { label: "실행 흐름 조작:", detail: "반환 주소(RET)를 변조하여 공격자의 코드를 실행" }
      ]
    },
    defenses: {
      title: "4. 방어 방법",
      list: [
        "strncpy, fgets 등 안전한 함수 사용",
        "스택 카나리 적용",
        "NX/DEP 방어 기법 적용"
      ]
    },
    referenceLinks: {
      title: "5. 링크",
      list: [
        { name: "Cloudflare: Buffer Overflow 학습", url: "https://www.cloudflare.com/ko-kr/learning/security/threats/buffer-overflow/" }
      ]
    }
  },
  {
    id: 7,
    field: "System",
    title: "ROP (Return Oriented Programming)",
    category: "Vulnerability",
    author: "cucu",
    date: "2026-06-04",
    overview: {
      title: "1. 개요",
      description: "기존 코드 조각을 이용한 공격 기법"
    },
    coreConcept: {
      title: "2. 핵심 개념",
      description: "리턴 가젯: ret 명령어로 끝나는 코드 조각들을 체인처럼 연결.\nPLT / GOT: 라이브러리 함수의 실제 주소를 알아내거나 변조.\n라이브러리 OFFSET: 함수 간의 상대적 거리가 고정된 점을 이용."
    },
    damageTypes: {
      title: "3. 주요 피해 유형",
      list: [
        { label: "방어 우회:", detail: "NX/DEP 환경을 우회하여 코드 실행" },
        { label: "임의 코드 실행:", detail: "기존 코드를 재조합하여 원격 코드 실행(RCE) 및 쉘 획득" }
      ]
    },
    defenses: {
      title: "4. 방어 방법",
      list: [
        "ASLR 적용",
        "PIE 기법 적용"
      ]
    },
    referenceLinks: {
      title: "5. 링크",
      list: [
        { name: "Wikipedia: Return-oriented programming", url: "https://en.wikipedia.org/wiki/Return-oriented_programming" }
      ]
    }
  },
  {
    id: 8,
    field: "System",
    title: "PIE (Position-Independent Executable)",
    category: "Security",
    author: "cucu",
    date: "2026-06-04",
    overview: {
      title: "1. 개요",
      description: "코드 영역까지 무작위 주소에 배치하여 실행 파일의 위치를 예측할 수 없게 만드는 보안 기술입니다."
    },
    coreConcept: {
      title: "2. 핵심 개념",
      description: "작동 원리: PIC 기반의 상대 참조 방식 사용.\nASLR과의 비교: ASLR은 스택/힙/라이브러리만, PIE는 코드 영역까지 포함하여 무작위화."
    },
    damageTypes: {
      title: "3. 주요 피해 유형",
      list: [
        { label: "가젯 노출:", detail: "PIE 미적용 시 코드 영역 주소가 고정되어 ROP 공격 용이" }
      ]
    },
    defenses: {
      title: "4. 방어 방법",
      list: [
        "개발 및 빌드 단계에서 컴파일러 옵션 활성화"
      ]
    },
    referenceLinks: {
      title: "5. 링크",
      list: [
        { name: "RedHat: PIE 블로그", url: "https://www.redhat.com/en/blog/position-independent-executables-pie" }
      ]
    }
  }
];