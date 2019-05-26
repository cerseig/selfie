<template>
  <div class="temporary__pictures">
    <div :class="`temporary__item ${selection.avatar ? 'is-active' : '' }`" >
        <!-- <img v-if="temporaryPictures.avatar" :src="temporaryPictures.avatar.url" class="temporary__image"> -->
        <img src="https://dummyimage.com/530x720/a9f5e3/a5a8d1.png&text=Avatar+Image" class="temporary__image" />
      <button class="temporary__item__button" @click="onButtonClick" data-key="avatar">
        <Icon name="plus" width="40" height="40" extraClasses="icon--select" fill="#000000" />
        <Icon name="plus" width="40" height="40" extraClasses="icon--unselect" fill="#fff" />
      </button>
    </div>
    <div :class="`temporary__item ${selection.picture ? 'is-active' : '' }`">
      <!-- <img :src="temporaryPictures.picture" class="temporary__image"> -->
       <img src="https://dummyimage.com/530x720/a9f5e3/a5a8d1.png&text=Avatar+Image" class="temporary__image" />
      <button class="temporary__item__button" @click="onButtonClick" data-key="picture">
        <Icon name="plus" width="40" height="40" extraClasses="icon--select" fill="#000000" />
        <Icon name="plus" width="40" height="40" extraClasses="icon--unselect" fill="#fff" />
      </button>
    </div>
  </div>
</template>

<script>
import { GET_USER_REPRESENTATION } from '@/graphQL/queries'

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
    this.getTemporaryPictures()
  }
}
</script>

<style scoped lang="scss">

.temporary__pictures {
    display: flex;
    padding-left: 5rem;
    padding-bottom: 6rem;
    overflow: scroll;

  .temporary {
    &__item {
      position: relative;
      min-width: 55%;
      max-width: 55%;
      margin-right: 3.8rem;

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

        border: 1px solid $color__black;
        border-radius: 2.5rem;
        opacity: 0;
        transform: scale(0.6);

        transition: opacity .3s, transform .3s;
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
        height: auto;

        transition: transform .3s;
      }

      &.is-active {
        &:before {
          opacity: 1;
          transform: scale(1);
        }

        .temporary__image {
          display: block;
          transform: scaleX(0.857) scaleY(0.9);
          transform-origin: center;
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
