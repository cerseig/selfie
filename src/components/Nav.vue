<template>
  <nav class="nav nav--start">
    <SVGSprite />
    <div :class="`nav__menu ${isModalActive ? 'is-hidden' : ''}`" @click="onClickMenu">
      <span :class="`nav__menu__item ${step === (i - 1) ? 'is-active' : ''} ${step > (i - 1) ? 'is-done' : ''}`" v-for="i in 4" :key="`nav-menu-item-${i}`">{{(i)}}</span>
    </div>
    <div class="nav__logo">
      <Icon name="logo" width="120" height="120" fill="#000000" />
    </div>
    <ModalProgress :isActive="isModalActive" />
  </nav>
</template>

<script>
import store from '@/store/index'
import SVGSprite from '@/components/icons/SVGSprite.vue'
import Icon from '@/components/icons/Icon.vue'
import ModalProgress from '@/components/modal/ModalProgress.vue'

export default {
  name: 'Nav',
  components: {
    SVGSprite,
    Icon,
    ModalProgress
  },
  data () {
    return {
      isModalActive: false
    }
  },
  computed: {
    step: () => store.getters.getStep
  },
  methods: {
    onClickMenu () {
      this.isModalActive = true
    }
  },
  mounted () {
    this.$on('Modal:Progress:Close', () => {
      this.isModalActive = false
    })
  }
}

</script>

<style scoped lang="scss">

.nav {
  z-index: 5;
  position: fixed;
  top: 0;
  width: 50vw;
  height: 10rem;
  @include flexCenter();
  width: 50vw;
  padding: 0 0 0 20px;
  justify-content: flex-end;

    &--start {
      background: none;

      .nav__logo {
        opacity: 0;
      }

    }

    &__menu {
      position: absolute;
      left: 50px;

      &.is-hidden {
        opacity: 0;
      }

      &__item {
        display: inline-block;
        width: 4rem;
        height: 4rem;
        margin-right: 0.8rem;
        transition: width .3s;
        border-radius: 3rem;
        border: .3rem solid $color__black;
        opacity: 0.3;
        box-sizing: border-box;

        font-family: $font__sintony;
        font-size: 1.5rem;
        font-weight: 400;
        line-height: 3.5rem;
        color: rgba($color__white, 0);

        &.is-done {
          background: $color__black;
          color: $color__black;
          opacity: 1;
        }

        &.is-active {
          opacity: 1;
          width: 7rem;
          color: $color__black;
        }
      }
    }

    &__logo {
      padding: 1rem 3rem 0;
      border-bottom-left-radius: 9rem;
      border-bottom-right-radius: 9rem;
      background: $color__white;
      transform: translateX(50%);
      box-shadow: -.6rem .7rem 2.1rem .3rem rgba(89,60,23,0.11);

      opacity: 1;
      font-size: 4rem;
    }

  }

@media (min-width: 768px) and (max-width: 1024px)  {
  .nav {
    padding: 0 0 0 5rem;
  }
}

</style>
