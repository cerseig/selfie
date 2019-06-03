<template>
  <nav class="nav nav--start">
    <button :class="`nav__menu ${isModalActive ? 'is-hidden' : ''}`" @click="onClickMenu">
      <Icon name="menu" width="30" height="30" fill="#000000" />
    </button>
    <h1 class="nav__logo">A.M.Y.</h1>
    <SVGSprite />
    <ModalProgress :isActive="isModalActive" />
  </nav>
</template>

<script>

import SVGSprite from '@/components/icons/SVGSprite.vue'
import Icon from '@/components/icons/Icon.vue'
import ModalProgress from '@/components/ModalProgress.vue'

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
    }

    &__logo {
      opacity: 1;
      font-size: 4rem;
      transform: translateX(50%)
    }

  }

@media (min-width: 768px) and (max-width: 1024px)  {
  .nav {
    padding: 0 0 0 5rem;
  }
}

</style>
