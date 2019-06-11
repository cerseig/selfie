<template>
  <div :class="`detection__content js-detection ${isReady ? 'is-ready' : ''}`">
    <video class="detection__camera" id="_camera"></video>
    <canvas class="detection__image" id="_imageData"></canvas>
    <canvas class="detection__points" id="_points"></canvas>
  </div>
</template>

<script>
export default {
  name: 'Detection',
  props: {
    isReady: {
      type: Boolean,
      required: false
    }
  }
}
</script>

<style lang="scss">
  .detection {
    &__content {
      overflow: hidden;
      width: calc(100vw - 20%);
      height: calc(100vh - 35%);
      max-width: 824px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      background: $color__blue--pastel;
      opacity: 0;
      transition: opacity .6s .3s;

      &.is-ready {
          opacity: 1;
      }
    }

    &__camera {
      display: none;
    }

    &__image {
      position: absolute;
      opacity: 0.5;
      min-height: 100%;
      min-width: 100%;
      max-width: none;
      z-index: 0;
    }

    &__points {
      position: relative;
      z-index: 1;
    }
  }

@media screen and (max-width: 600px) {
  .detection {
    &__content {
      width: calc(100vw - 20px);
      height: calc(100vh - 200px);
    }
  }
}

</style>
