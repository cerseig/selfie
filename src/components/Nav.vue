<template>
  <nav class="nav">
    <button class="nav__menu" @click="openMenu">
      <Icon name="menu" width="30" height="30" stroke="#000000" />
    </button>
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
    position: fixed;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;

      &__menu {
        margin-right: auto;
      }
  }

  @media (min-width: 768px) and (max-width: 1024px)  {
    .nav {
      padding: 0 50px;
      height: 100px;
    }
  }

</style>
