<template>
  <div class="temporary__pictures">
    <div :class="`temporary__item ${selection.avatar ? 'is-active' : ''}`">
      <div class="temporary__item__container">
        <img v-if="avatarPath" :src="avatarPath" class="temporary__image">
      </div>
        <!--<img src="https://dummyimage.com/530x720/a9f5e3/a5a8d1.png&text=Avatar+Image" class="temporary__image" />-->
      <button class="temporary__item__button" @click="onButtonClick" data-key="avatar">
        <Icon name="plus" width="40" height="40" extraClasses="icon--select" fill="#000000" />
        <Icon name="plus" width="40" height="40" extraClasses="icon--unselect" fill="#fff" />
      </button>
    </div>
    <div :class="`temporary__item ${selection.picture ? 'is-active' : ''}`">
      <div class="temporary__item__container">
        <img v-if="picturePath" :src="picturePath" class="temporary__image temporary__image--picture">
        <!--<img src="https://dummyimage.com/530x720/a9f5e3/a5a8d1.png&text=Avatar+Image" class="temporary__image temporary__image&#45;&#45;picture" />-->
      </div>
      <button class="temporary__item__button" @click="onButtonClick" data-key="picture">
        <Icon name="plus" width="40" height="40" extraClasses="icon--select" fill="#000000" />
        <Icon name="plus" width="40" height="40" extraClasses="icon--unselect" fill="#fff" />
      </button>
    </div>
  </div>
</template>

<script>
import { GET_USER_REPRESENTATION } from '@/graphQL/queries'
import store from '@/store/index'
import Icon from '@/components/icons/Icon.vue'

export default {
  name: 'TemporaryPictures',
  props: {
    id: {
      type: String,
      required: false
    },
    selection: {
      type: Object,
      required: true
    }
  },
  components: {
    Icon
  },
  data () {
    return {
      temporaryPictures: {}
    }
  },
  methods: {
    getTemporaryPictures () {
      if (this.id) {
        this.$apollo.query({
          query: GET_USER_REPRESENTATION,
          variables: {
            id: this.id
          }
        }).then(result => {
          this.temporaryPictures = result.data.UserRepresentation
        })
      }
    },

    onButtonClick (e) {
      const key = e.currentTarget.getAttribute('data-key')
      this.$parent.$emit('TemporaryPicture:Selection', key)
    }
  },
  mounted () {
    // this.getTemporaryPictures()
  },
  computed: {
    avatarPath: () => store.getters.getAvatarPath,
    picturePath: () => store.getters.getPicturePath
  }
}
</script>

<style scoped lang="scss">

.temporary__pictures {
    display: flex;
    padding-bottom: 6rem;

  .temporary {
    &__item {
      position: relative;
      flex: 1;
      margin-right: 3.8rem;
      border-radius: 1.5rem;

      background-color: $color__white;

      display: flex;
      justify-content: center;
      align-items: center;

      &:last-of-type {
        margin-right: 0;
      }

      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        border: .2rem solid $color__black;
        border-radius: 1.5rem;
        opacity: 0.1;
        transform: scale(1);

        transition: opacity .3s, transform .3s;
        overflow: hidden;

        box-shadow: 6px 6px 19px -2px rgba(0,0,0,0.31);
      }

      &__container {
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        height: 500px;
      }

      &__button {
        position: absolute;
        bottom: -3.5rem;
        left: 50%;
        transform-origin: center center;
        transform: translateX(-50%) rotate(0deg);
        width: 7.4rem;
        height: 7.4rem;

        background: $color__white;
        box-shadow: -.4rem .4rem 1rem .3rem rgba(28,28,27,0.11);
        border-radius: 50%;

        transition: background-color .3s, transform .3s;

        .icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          transition: opacity .3s;
        }
        .icon--unselect {
          opacity: 0;
        }
      }

      .temporary__image {
        width: 100%;
        height: 100%;
        transform: scaleX(0.857) scaleY(0.9);

        transition: transform .3s;

        &--picture {
          object-position: center;
          object-fit: cover;
          max-width: none;
        }

      }

      &.is-active {
        &:before {
          opacity: 1;
        }

        .temporary__item__button {
          transform: translateX(-50%) rotate(45deg);
          background: $color__black;
        }

        .icon {
          &--unselect {
            opacity: 1;
          }
          &--select {
          opacity: 0;
          }
        }
      }
    }
  }
}
</style>
