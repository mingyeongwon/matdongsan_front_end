<template>
  <div>
    <div class="memberSignup-title">
      <h2 class="fw-bold text-center">일반 회원가입</h2>
    </div>
    <div class="memberSignup-box border-top">
      <form v-on:submit.prevent="handleSubmit">
        <div class="d-flex mb-4">
          <div class="d-flex col-2 pt-1">
            <span>이메일</span>
            <span class="text-danger fs-5 fw-bold">*</span>
          </div>
          <div class="memberEmail-box">
            <input
              class="ps-2 me-3 mb-1 border border-1 border-secondary rounded w-100"
              type="text"
              placeholder="이메일 형식으로 입력하세요."
              v-model.trim="userCommonData.uemail"
            />
            <span :style="emailValidStyle ? 'color:green': 'color:red'">
              <small>{{ errorMessage.emailValid }}</small>
            </span>
          </div>
          <button
            type="button"
            class="btn btn-sm ms-2 memberSignupPassword-btn text-light"
            @click="uniqueCheck"
          >
            중복확인
          </button>
        </div>
       
        <div class="d-flex mb-4">
          <div class="d-flex col-2 pt-1">
            <span>비밀번호</span>
            <span class="text-danger fs-5 fw-bold">*</span>
          </div>
          <div class="memberPassword-box d-flex flex-column">
            <input
              class="mb-2 ps-2 border border-1 border-secondary rounded"
              type="password"
              placeholder="영문, 숫자, 특수문자 혼합 4~20자 가능합니다."
              v-model.trim="memberPassword1"
            />
            <input
              class="ps-2 border border-1 border-secondary rounded"
              type="password"
              placeholder="비밀번호를 재입력하세요."
              v-model.trim="userCommonData.upassword"
            />
            <span :style="passwordValidStyle ? 'color:green': 'color:red'">
              {{ errorMessage.passwordValid }}
            </span>
          </div>
        </div>
        <div class="d-flex mb-4 memberName-box">
          <div class="d-flex col-2 pt-1">
            <span>이름</span>
            <span class="text-danger fs-5 fw-bold">*</span>
          </div>

          <div class="memberName-box d-flex flex-column">
            <input
              class="ps-2 border border-1 border-secondary rounded"
              type="text"
              placeholder="본명을 입력하세요."
              v-model.trim="member.mname"
            />
            <span :style="nameValidStyle ? 'color:green': 'color:red'">
              {{ errorMessage.nameValid }}
            </span>
          </div>
        </div>
        <div class="d-flex mb-4 memberPhone-box">
          <div class="d-flex col-2 pt-1">
            <span>핸드폰번호</span>
            <span class="text-danger fs-5 fw-bold">*</span>
          </div>

          <div class="memberPhone-box d-flex flex-column">
            <input
              class="ps-2 border border-1 border-secondary rounded"
              type="text"
              placeholder="하이픈을 포함하여 입력하세요."
              v-model.trim="member.mphone"
            />
            <span :style="phoneValidStyle ? 'color:green': 'color:red'">
              {{ errorMessage.phoneValid }}
            </span>
          </div>
        </div>
        <div class="d-flex mb-5 memberProfile-box">
          <span class="col-2 mt-1">프로필 사진</span>
          <div class="w-100">
            <ImagePreview imagePurpose="single" @update:image="handleImageUpdate" @file-input="handleFileInput" />
          </div>
        </div>
        <div class="text-center memberSignupBtn-box">
          <button type="submit" class="btn btn-warning fw-bold h-100" :disabled="!checkMemberSignupData">
            회원 가입
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import ImagePreview from "@/components/ImagePreview.vue";
import memberAPI from "@/apis/memberAPI";

const router = useRouter();

const member = ref({
  mname: "",
  mphone: ""
});

const memberPassword1 = ref("");

const mprofile = ref(null);  // 프로필 이미지를 저장할 필드 추가

const userCommonData = ref({
  uemail: "",
  upassword: "",
  urole: "MEMBER"
});

let errorMessage = ref({
  emailValid: "",
  passwordValid: "",
  phoneValid: "",
  nameValid: "",
});

function handleFileInput(fileInput) {
  mprofile.value = fileInput;
}

let tempEmail = "user@gmail.com";
var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
var passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{4,20}$/;
var phonePattern = /^(01[016789])-(\d{3,4})-(\d{4})$/;
var namePattern = /^[가-힣]{2,17}$/;

// 회원가입 필수 양식이 빈 값이 아닌 경우에 제출 버튼을 활성화 함
const checkMemberSignupData = computed(() => {
  var result = member.value.memberEmail !== "" && member.value.mphone !== "" && memberPassword1.value !== "" 
              && userCommonData.value.upassword !== "" && member.value.mname !== "";
  return result;
});

var emailValidStyle = ref(false);
var phoneValidStyle = ref(false);
var passwordValidStyle = ref(false);
var nameValidStyle = ref(false);

var emailResult = ref(null);
var phoneResult = ref(null);
var passwordResult = ref(null);
var nameResult = ref(null);

function uniqueCheck() {
  // 중복 확인을 하면서 전체적인 이메일 유효성 검사도 실행
  emailResult.value = emailPattern.test(member.value.memberEmail);
  if (!emailResult.value) {
    errorMessage.value.emailValid = "유효하지 않은 이메일 입니다.";
    emailValidStyle.value = false;
  } else if (member.value.memberEmail === tempEmail) {
    errorMessage.value.emailValid = "이미 사용중인 이메일 입니다.";
    emailValidStyle.value = false;
  } else {
    errorMessage.value.emailValid = "사용 가능한 이메일 입니다.";
    emailValidStyle.value = true;
  }
  console.log("출력", emailValidStyle.value);
}

function handleImageUpdate(files) {
  if (files.length > 0) {
    member.value.mprofile = files[0];
  } else {
    member.value.mprofile = null;
  }
}

// 중복 확인을 아예 하지 않았을 경우와, 비밀번호와 휴대폰 번호의 정규식 검사
async function handleSubmit() {
  // // email 중복확인을 했는가
  // if (errorMessage.value.emailValid === "") {
  //   errorMessage.value.emailValid = "중복 확인을 해주세요";
  //   emailValidStyle.value = false;
  // }

  // // 휴대폰 번호 유효성 검사
  // phoneResult.value = phonePattern.test(member.value.mphone);
  // if (!phoneResult.value) {
  //   errorMessage.value.phoneValid = "유효하지 않은 휴대폰 번호 입니다.";
  //   phoneValidStyle.value = false;
  // } else {
  //   errorMessage.value.phoneValid = "사용 가능한 휴대폰 번호 입니다.";
  //   phoneValidStyle.value = true;
  // }

  // // 비밀번호 유효성 검사
  // passwordResult.value = passwordPattern.test(memberPassword1);
  // if (!passwordResult.value) {
  //   errorMessage.value.passwordValid = "유효하지 않은 비밀번호 입니다.";
  //   passwordValidStyle.value = false;
  // } else if (memberPassword1.value !== userCommonData.value.upassword) {
  //   errorMessage.value.passwordValid = "비밀번호와 비밀번호 확인이 같지 않습니다.";
  //   passwordValidStyle.value = false;
  // } else {
  //   errorMessage.value.passwordValid = "사용 가능한 비밀번호 입니다.";
  //   passwordValidStyle.value = true;
  // }

  // // 이름 유효성 검사
  // nameResult.value = namePattern.test(member.value.mname);
  // if (!nameResult.value) {
  //   errorMessage.value.nameValid = "유효하지 않은 이름 입니다.";
  //   nameValidStyle.value = false;
  // } else {
  //   errorMessage.value.nameValid = "사용 가능한 이름 입니다.";
  //   nameValidStyle.value = true;
  // }

  // console.log(JSON.parse(JSON.stringify(member.value)));

  // // 유효성 검사가 모두 통과되면
  // if (emailValidStyle.value && passwordValidStyle.value && phoneValidStyle.value && nameValidStyle.value) {
    // axios로 통신하여 폼 보내고
    const formData = new FormData();
    formData.append("mphone", member.value.mphone);
    formData.append("mname", member.value.mname);
    formData.append("urole", userCommonData.value.urole);
    formData.append("upassword", userCommonData.value.upassword);
    formData.append("uemail", userCommonData.value.uemail);

    const elMprofile = mprofile.value;
    if(elMprofile.files.length != 0) {
      formData.append("mprofile", elMprofile.files[0]);
    }
    try {
      const response = await memberAPI.memberJoin(formData);
      console.log(response);
      router.push("/"); // 홈으로 돌아가기
    } catch(error) {
      console.log(error);
    }

    
  // }
}
</script>

<style scoped>
.memberSignup-box span {
  font-weight: bold;
}
.memberSignupPassword-btn {
  background: rgb(21, 42, 105);
  font-size: 14px;
}

.memberSignupBtn-box {
  height: 40px;
}

.memberSignupBtn-box button {
  width: 400px;
  font-size: 17px;
}

#memberProfile {
  display: none;
}

.memberProfile-label {
  width: 125px;
  height: 125px;
  cursor: pointer;
  display: block;
  border: 1px solid rgb(233, 236, 239);
  position: relative;
}

.memberProfile-label .x,
.memberProfile-label .y {
  border: 1px solid rgb(222, 226, 230);
  position: absolute;
  top: 50%;
  left: 50%;
}

.memberProfile-label .x {
  transform: translateX(-50%);
  width: 44px;
}

.memberProfile-label .y {
  transform: translateY(-50%);
  height: 44px;
}

.memberPassword-box,
.memberEmail-box,
.memberPhone-box input,
.memberName-box input {
  width: 438px;
}
.memberEmail-box{
  height: 50px;
}
.memberPassword-box input,
.memberEmail-box input,
.memberPhone-box input,
.memberName-box input {
  height: 40px;
  font-size: 14px;
  border: 1px solid rgb(233, 236, 239);
}

.memberEmail-box input {
  width: 312px;
}

.memberSignup-box button {
  height: 40px;
}

.memberSignup-title {
  margin: 50px 0;
}

.memberSignup-box {
  max-width: 900px;
  margin: 50px auto 0;
  padding: 40px 40px;
}
</style>
