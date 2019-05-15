<template>
  <nav class="nav nav--start">
    <button class="nav__menu" @click="openMenu">
      <Icon name="menu" width="30" height="30" stroke="#000000" />
    </button>
    <h1 class="nav__logo">A.M.Y.</h1>
    <SVGSprite />
  </nav>
</template>

<script>

import SVGSprite from '@/components/icons/SVGSprite.vue'
import Icon from '@/components/icons/Icon.vue'

export default {
  name: 'Nav',
  components: {
    SVGSprite,
    Icon
  },
  methods: {
    openMenu () {
      console.log('Menu is open')
    }
  }
}

</script>

<style scoped lang="scss">

.nav {
  z-index: 2;
  position: fixed;
  top: 0;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;

    &--start {

      .nav__logo {
        opacity: 0;
      }

    }

    &__menu {
      position: absolute;
      left: 50px;
    }

    &__logo {
      opacity: 1;
      font-size: 4rem;
    }

  }

@media (min-width: 768px) and (max-width: 1024px)  {
  .nav {
    padding: 0 50px;
    height: 100px;
  }
}

</style>
