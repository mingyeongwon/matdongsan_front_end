<template>
    <div class="modal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <slot name="body">
            <div class="modal-body">
              <p class="fw-bold p-4 h-4 text-center">
                신고를 취소 하시겠습니까? <br />
                취소 후에 수정 불가합니다.
              </p>
            </div>
          </slot>
          <slot name="footer">
            <div class="modal-footer border border-0 mx-auto mb-3">
              <button
                type="button"
                class="btn btn-outline-light ps-4 pe-4 text-dark border border-secondary fw-bold"
                data-bs-dismiss="modal">
                돌아가기
              </button>
              <button
                type="button"
                class="btn btn-warning ms-5 ps-4 pe-4 fw-bold" @click="emit('close')">
                신고 취소하기
              </button>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </template>

<script setup>
const emit = defineEmits(["close"]);
</script>

<style scoped>
</style>
