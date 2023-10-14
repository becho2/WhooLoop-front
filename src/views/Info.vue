<template>
  <div class="info">
    <h2>WhooLoop(후룹)에 대하여</h2>
    <section>
      후잉가계부 동일 거래를 매일 또는 매주 설정한 요일, 설정한 시간에 <br />
      반복적으로 입력해주는 후잉의 써드파티 웹앱입니다.
    </section>
  </div>
  <div class="col-md-12 form-wrapper">
    <section>
      <a
        href="https://whooing.com/#forum/developer/ko/all/0/_/431595"
        target="_blank"
        >후잉게시판 후룹 소개글 보러가기</a
      >
      <a href="https://github.com/becho2/WhooLoop" target="_blank">
        <div>Backend App Github</div>
      </a>
      <a href="https://github.com/becho2/WhooLoop-front" target="_blank">
        <div>Frontend App Github</div>
      </a>
    </section>
    <h4>Update Note</h4>

    <h4>2023.10.14</h4>
    <section>
      도메인을 연결하고, ssl 인증서도 붙여 https 접속되도록 만들었습니다. <br />
      (이제 아이피주소로 접속하지 않으셔도 됩니다!) <br />
      https가 되면서 핀을 붙여넣던 과정을 생략하여 로그인이 더 쉬워졌습니다!<br />
      이제 후잉페이지에서 로그인 - 승인 클릭만 하시면 됩니다.(핀번호 입력창
      삭제)
    </section>

    <h4>2023.09.28</h4>
    <section>
      흥반장님께서 알려주신 https://uptimerobot.com 으로 5분마다 서버 헬스체크
      모니터링을 설정하였습니다.
    </section>

    <h4>2023.09.27</h4>
    <section>
      오늘 오전 9시33분에 서버가 올라가있는 Oracle Cloud에서 유휴 무료 인스턴스
      자원을 회수했다는 연락을 받고 서버가 꺼진 것을 인지하여 10시10분 경
      재시작하였습니다. <br />
      어제인 9월 26일 오전 8시 30분 경 종료되었던 것으로 보입니다. ㅠㅠ 입력되지
      않은 거래가 있을 수 있습니다. 불편 드려 죄송합니다!
    </section>

    <h4>2023.09.02</h4>
    <section>
      새로운 거래 등록시 금액값이 숫자로 인식되지 않아 <br />
      "transaction_money_amount must be a number conforming to the specified
      constraints" <br />
      에러가 발생하며 등록이 되지 않던 에러 수정.
    </section>

    <h4>2023.07.02</h4>
    <section>
      웹훅 요청 에러시 쪽지로 에러 내용 알림 보내는 기능을 추가하였습니다.<br />
      추후 이용자가 많아질 경우 동일 시간대에 웹훅요청이 동시적으로 다량
      발생하면 후잉에 부담을 줄 수 있는 문제가 있어 반복요청 속도를 약간 늦추는
      조치를 우선 취해두었습니다.
    </section>

    <h4>2023.06.13</h4>
    <section>
      입력해둔 반복거래 내용에 대한 수정 기능을 추가하였습니다. <br />
      표에서 더블클릭시 수정할 수 있게 되고, 수정한 뒤 다른 곳을 클릭하면 (focus
      out) 확인 후 수정이 완료됩니다.
    </section>

    <h4>2023.06.12</h4>
    <section>
      루실리스님께서 좋은 의견 주셔서 반복을 일정기간동안만 할 수 있도록
      "종료일"기능을 추가하였습니다. <br />
      종료일을 설정할 경우 종료일 밤 11시 59분에 OFF됩니다.
    </section>

    <h4>2023.06.11</h4>
    <section>
      후잉의 '자주입력거래' 불러와서 보여주고 클릭시 아이템, 금액, 왼쪽, 오른쪽
      간편입력하는 기능을 추가하였습니다.
    </section>

    <h4>2023.06.10</h4>
    <section>
      왼쪽/오른쪽 계정항목을 텍스트직접입력에서 실제 후잉에 있는 항목 중
      선택하도록 변경하였습니다.
    </section>

    <h4>2023.06.09</h4>
    <section>
      요청시간을 숫자 직접 타이핑하던 것에서 시간을 입력하는 형태로 UI
      변경하였습니다.
    </section>

    <h4>2023.06.08</h4>
    <section>
      프론트에서 회원가입 버튼 및 페이지 제거 <br />
      이미 로그인한 적 있는 후잉계정에서 기존에 저장되지 않은 섹션 발견할 경우
      추가로 저장합니다. <br />
      평일(공휴일구분없는 단순 월화수목금) 반복 기능 추가되었습니다. <br />
      @DONE 왼쪽/오른쪽 계정항목을 텍스트직접입력이 아닌 셀렉트박스로 주고
      거기에서 선택하도록 변경할 예정 <br />
      @DONE 요청시간도 숫자 직접입력이 아니라 시간, 분을 셀렉트박스에서
      선택하도록 할 예정
    </section>

    <h4>2023.06.07</h4>
    <section>
      후잉을 통해 로그인할 경우, 최초 로그인시에 해당 계정의 섹션 정보를
      불러와서 저장합니다. <br />
      @DONE 이미 로그인한 적 있는 후잉계정일 경우 섹션정보가 변경될 수 있으므로
      기존 저장된 정보와 비교해서 다를 경우 추가 insert or update 처리
    </section>

    <h4>2023.06.06</h4>
    <section>
      매일의후잉(WhooingEveryday)에서 WhooLoop(후룹)으로 이름을 변경하였습니다!
      <br />
      OAuth 인증을 통해 후잉 로그인 -> 인증 핀번호 복사붙여넣기를 통해 앱을
      이용하는 방식으로 적용완료하였습니다.
    </section>

    <h4>2023.06.05</h4>
    <section>
      @DONE 보안상 흥반장님 말씀대로 후잉 OAuth 인증을 통해 후잉 계정으로
      이용하실 수 있도록 할 예정입니다.<br />(다만 이 경우 하나의 계정으로 여러
      후잉 계정에 대해 반복입력거래를 설정하는 것은 불가하게 될 수도 있음)
      <br />
      @DONE 베타테스터 응줴줴님 제안으로 주말 제외 평일만 입력 기능을 추가할
      예정입니다.(현재는 월화수목금 5개 입력필요)
      <br />
      @TODO 가능하다면 평일만 입력시 '공휴일 제외 평일'(즉 은행영업일)에만
      입력되도록 하는 기능도 추가할 계획입니다.
    </section>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {};
  },
};
</script>
