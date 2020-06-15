<template>
  <input
    :class="[
      inputClass,
      {
        'input_bottom-bordered': bottomBordered,
        input_disabled: disabled,
      },
    ]"
    :type="inputType"
    :placeholder="inputPlaceholder"
    @input="handleInput"
    v-model="content"
  />
</template>

<script>
export default {
  props: {
    inputClass: String,
    bottomBordered: Boolean,
    inputType: String,
    inputPlaceholder: String,
    value: String,
    disabled: Boolean,
  },
  data() {
    return {
      content: this.value,
    };
  },
  watch: {
    value(newVal) {
      if (newVal !== this.content) {
        this.content = newVal;
      }
    },
  },
  methods: {
    handleInput() {
      this.$emit('input', this.content);
    },
  },
};
</script>

<style scoped></style>
