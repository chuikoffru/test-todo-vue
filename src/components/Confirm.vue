<template>
  <transition name="modal">
    <div class="modal">
      <div class="modal__window">
        <div class="modal__window-message">{{modal.message}}</div>
        <div class="modal__window-actions actions">
          <button class="actions__cancel" @click="onCancel">Отмена</button>
          <button class="actions__confirm" @click="onConfirm">Подтвердить</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  props: ['modal'],
  methods: {
    onConfirm() {
      this.$emit('confirm');
    },
    onCancel() {
      this.$emit('cancel');
    },
  },
};
</script>

<style lang="sass">
.modal
  position: fixed
  top: 0
  left: 0
  bottom: 0
  right: 0
  background: rgba(0, 0, 0, 0.5)
  &__window
    position: absolute
    top: 50%
    left: 50%
    transition: .5s
    width: 100%
    min-width: 400px
    max-width: 600px
    background: white
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5)
    transform: translate(-50%, -50%)
    padding: 2.5rem
    color: black
    text-align: center
    &-message
      font-size: 1.2rem
      margin-bottom: 20px
    .actions
      display: flex
      justify-content: center
      &__cancel, &__confirm
        margin: 4px
        border: none
        padding: 10px 15px
        cursor: pointer
        font-size: inherit
      &__cancel
        background: darkred
        color: white
      &__confirm
        background: darkcyan
        color: white
.appear-enter
  opacity: 0
  .modal-window
    transform: translate(-75%, -50%)
.appear-enter-active
  transition: .5s
.appear-leave-active
  opacity: 0
  transition: .5s
  .modal-window
    transform: translate(0, -50%)
</style>
