<template>
  <div :class="`modal modal--conclusion ${isActive ? 'is-active' : ''}`">
    <button class="modal__close" @click="onClickClose">
      <Icon name="close" width="30" height="30" fill="#ffffff" />
    </button>
    <div class="modal__inner">
      ANIMATION CONCLUSION
    </div>
  </div>
</template>

<script>
  import store from '../store/index'

  import Icon from '@/components/icons/Icon.vue'

  export default {
    name: 'ModalConclusion',
    props: {
      isActive: {
        required: true,
        type: Boolean
      }
    },
    components: {
      Icon
    },
    methods: {
      onClickClose () {
        this.$parent.$emit('Modal:Conclusion:Close')
      },
      handleScroll (isActive) {
        if (isActive) {
          document.body.classList.add('is-unscrollable')
        } else {
          document.body.classList.remove('is-unscrollable')
        }
      }
    },
    mounted () {
      this.handleScroll(this.isActive)
    },
    watch: {
      isActive (nextProp) {
        this.handleScroll(nextProp)
      }
    }
  }

</script>

<style scoped lang="scss">
  .modal--conclusion {

  }
</style>
