<template>
  <nav class="nav">
    <SVGSprite />
    <div :class="`nav__menu ${ isModalActive || step === 4 ? 'is-hidden' : ''}`" @click="onClickMenu">
      <span :class="`nav__menu__item ${step === (i - 1) ? 'is-active' : ''} ${step > (i - 1) ? 'is-done' : ''}`" v-for="i in 4" :key="`nav-menu-item-${i}`"><span>{{(i)}}</span></span>
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
  transition: opacity 0.5s ease-in;
  opacity: 0;

    &.is-active {
      opacity: 1;

      .nav__menu {
        &__item {
          transform: scale(1);

          @for $i from 1 through 4 {
              &:nth-of-type(#{$i}) {
                transform: scale(1);
                transition: transform #{$i * .1s} .5s, opacity .3s, color .3s;
              }
            }
        }
      }
      .nav__logo {
        transform: translateY(0) translateX(50%);
        opacity: 1;

        .icon {
          opacity: 1;
        }
      }
    }

    &__menu {
      position: absolute;
      left: 50px;
      transition: opacity 0.5s ease-in;

      &.is-hidden {
        opacity: 0;
      }

      &__item {
        display: inline-block;
        width: 4rem;
        height: 4rem;
        margin-right: 0.8rem;
        border-radius: 3rem;
        border: .3rem solid $color__black;
        opacity: 0.3;
        box-sizing: border-box;

        font-family: $font__sintony;
        font-size: 1.5rem;
        font-weight: 400;
        line-height: 3.5rem;
        color: $color__black;
        overflow: hidden;

        transform: scale(0);

        &:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: $color__black;
          transform: translateY(100%);
          transition: transform .3s;
        }

        span {
          position: relative;
        }

        &.is-done {
          span {
            color: $color__white;
          }
          opacity: 1;

          &:before {
            transform: translateY(0);
          }
        }

        &.is-active {
          opacity: 1;
          color: $color__black;
        }
      }
    }

    &__logo {
      padding: 1rem 3rem 0;
      border-bottom-left-radius: 9rem;
      border-bottom-right-radius: 9rem;
      background: $color__white;
      box-shadow: -.6rem .7rem 2.1rem .3rem rgba(89,60,23,0.11);

      opacity: 1;
      font-size: 4rem;

      transform: translateY(-14rem) translateX(50%);

      transition: opacity .3s, transform .3s;

      .icon {
        opacity: 0;
        transition: opacity .3s .3s;
      }
    }

  }

@media (min-width: 768px) and (max-width: 1024px)  {
  .nav {
    padding: 0 0 0 5rem;
  }
}

</style>
