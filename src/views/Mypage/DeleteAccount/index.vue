<template>
  <div class="d-flex vh-100 w-100 mx-auto">
    <MyPageSideBar />
    <div class="titleNcontent mt-2 w-75 mx-auto">
      <h4 class="fw-bold mb-4">회원탈퇴</h4>
      <hr />
      <div class="">
        <p class="w-75 mx-auto">
          <b
            >회원 탈퇴를 신청하기 전에 아래 안내 사항을 한번 더 확인해주세요.</b
          >
        </p>
        <ul class="delete-user-info list-group list-group-numbered w-75">
          <ol class="list-group-item border-0">
            회원 탈퇴 시, 현재 로그인된 아이디는 즉시 탈퇴 처리됩니다.
          </ol>
          <ol class="list-group-item border-0">
            회원 탈퇴 시, 회원 전용 웹 서비스 이용이 불가합니다.
          </ol>
          <ol class="list-group-item border-0">
            회원 탈퇴 시, 현재 로그인된 아이디는 즉시 탈퇴 처리됩니다.
          </ol>
          <ol class="list-group-item border-0">
            탈퇴 시 회원 정보 및 찜 서비스, 등록한 게시물 이용 기록이 모두 삭제
            됩니다.
          </ol>
          <ol class="list-group-item border-0">
            회원 정보 및 서비스 이용 기록은 모두 삭제되며, 삭제된 데이터는
            복구되지 않습니다.
          </ol>
        </ul>
        <hr />
        <form action="#" class="deleteUserForm w-75 mx-auto mt-5" v-on:submit.prevent="handleSubmit">
          <div class="mx-auto form-group mt-5 w-50">
            <h6>비밀번호</h6>
            <input
              class="form-control mx-auto border border-secondary"
              type="password" v-model="deleteAccount.deletePassword"/>
          </div>
          <div class="form-group mt-3 w-50 mx-auto">
            <h6>탈퇴를 하는 이유가 뭔가요?</h6>
            <select
              class="form-select form-select mb-3 mx-auto border border-secondary "
              aria-label=".form-select-lg example" v-model="deleteAccount.deleteOptionSelect">
              <option value="" disabled hidden selected>이유를 선택해 주세요</option>
              <option value="inconvenient">사용이 불편함</option>
              <option value="tooManyTimes">너무 많이 이용함</option>
              <option value="lackOfBenenfits">회원 혜택 부족</option>
              <option value="etc">기타</option>
            </select>
          </div>
          <div class="form-group mt-3 mx-auto w-50">
            <h6>다른 이유가 있다면 알려주세요</h6>
            <textarea
              name="reasonForDeleteAccount"
              id="reasonForDeleteAccount"
              class="mx-auto form-control border border-secondary">
            </textarea>
          </div>
          <div class="form-group mt-3 mx-auto w-50">
            <input
              type="checkbox"
              name="deleteAgreement"
              id="deleteAgreement"
              v-model="deleteAccount.deleteAgreement"
            />
            <label for="deleteAgreement" class="ms-2"
              ><b> 유의 사항에 동의 </b></label
            >
          </div>
          <div class="form-group mt-3 text-center">
            <button type="button" class="btn btn-dark w-25">
              돌아가기
            </button>
            <button type="submit" class="ms-3 btn btn-warning w-25" :disabled="!checkDeleteAccountData">
              탈퇴하기
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import MyPageSideBar from "@/components/MyPageSidebar.vue";
import { ref, computed } from "vue";

let deleteAccount = ref({
  deletePassword: "",
  deleteOptionSelect: "",
  deleteAgreement: "",
});

const checkDeleteAccountData = computed(() => {
  var result = deleteAccount.value.deletePassword !== "" && deleteAccount.value.deleteOptionSelect !== "" && deleteAccount.value.deleteAgreement !== "";
  return result;
});

function handleSubmit() {
  console.log(JSON.parse(JSON.stringify(deleteAccount.value)));
}
</script>

<style scoped>
.titleNcontent {
  width: 80%;
  padding: 20px;
}
.deleteUserForm,
.delete-user-info {
  margin-right: auto;
  margin-left: auto;
}

</style>
