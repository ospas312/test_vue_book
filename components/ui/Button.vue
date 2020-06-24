<template>
  <button
    @click="$emit('btnClick')"
    :type="buttonType"
    :class="['button', buttonClass, { button_disabled: disabled }]"
    :disabled="disabled"
  >
    {{ buttonText }}
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    buttonType: { type: String, required: true },
    buttonClass: { required: true },
    buttonText: { type: String, required: false },
    disabled: { type: Boolean },
  },
};
</script>

<style scoped>
.button {
  display: block;
  outline: none;
}
.button:disabled {
  opacity: 0.5;
}
.button_type_jump {
  width: 36px;
  height: 12px;
  background: transparent;
  background-image: url("data:image/svg+xml,%3Csvg width='38' height='15' viewBox='0 0 38 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M37 1L19 13L1 1' stroke='white' stroke-width='2'/%3E%3C/svg%3E%0A");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  padding: 0;
  border: none;
}
</style>
