<template>
  <div class="popup">
    <div class="popup__content">
      <slot></slot>
      <Overlay />
      <div class="close" @click="close"></div>
    </div>
  </div>
</template>

<script>
import Overlay from '@/components/ui/Overlay';
export default {
  components: {
    Overlay,
  },
  methods: {
    close(e) {
      this.$store.commit('popup/close');
    },
  },
};
</script>

<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}
.popup__content {
  width: 920px;
  min-height: 324px;
  background-color: #fff;
  border-radius: 0px;
  position: relative;
  box-sizing: border-box;
  padding: 40px;
}
.close {
  position: absolute;
  right: 42px;
  top: 42px;
  width: 20px;
  height: 20px;
  opacity: 1;
  cursor: pointer;
}
.close:hover {
  opacity: 0.5;
}
.close:before,
.close:after {
  position: absolute;
  left: 9px;
  content: ' ';
  height: 20px;
  width: 2px;
  background-color: #333;
}
.close:before {
  transform: rotate(45deg);
}
.close:after {
  transform: rotate(-45deg);
}
@media screen and (max-width: 1280px) {
  .popup__content {
    width: 800px;
  }
}
@media screen and (max-width: 1024px) {
  .popup__content {
  }
}
@media screen and (max-width: 768px) {
  .popup__content {
    width: 580px;
  }
}
@media screen and (max-width: 320px) {
  .popup__content {
    width: 290px;
    min-height: 191px;
    padding: 15px 4px;
  }
  .close {
    right: 15px;
    top: 15px;
  }
}
</style>
