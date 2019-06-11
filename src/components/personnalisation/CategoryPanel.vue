<template>
  <div :class="`panel panel--category ${show ? 'is-active' : ''}`">
    <ul class="list list--category">
      <span class="list__indicator" :style="{transform: `translateX(${isActive * 10}rem)`}"></span>
      <li :class="`list__item ${isActive === index ? 'is-active' : ''}`" :data-index="index" @click="onClickCategory" v-for="(category, index) in categories" :key="`category-${index}`">
        <button class="list__button">
          <Icon :name="category.icon.title" :width="60" :height="60" stroke="#000000" fill="#000000"/>
        </button>
      </li>
    </ul>
    <div class="panel__subpanel">
      <div :class="`panel__inner ${isActive === index ? 'is-active' : ''}`" v-for="(category, index) in categories" :key="`panel-${index}`">
        <ul class="list list--colors" v-if="category && category.colors && category.colors.length > 0">
          <li
            v-for="(color, indexColor) in category.colors"
            :class="`list__item ${selection[index] && selection[index].colors === indexColor ? 'is-selected' : ''}`"
            @click="onClickItem"
            data-type="colors"
            :data-index-item="indexColor"
            :data-index-category="index"
            :key="`color-${indexColor}`"
          >
           <button class="list__button" :style="{ backgroundColor: color.item }"></button>
          </li>
        </ul>
         <ul :class="`list list--attributes ${!category.colors && isActive === index ? 'list--attributes--top' : ''}`" v-if="category && category.attributes && category.attributes.length > 0">
          <li
            v-for="(attribute, indexAttr) in category.attributes"
            :class="`list__item ${selection[index] && selection[index].attributes === indexAttr ? 'is-selected' : ''}`"
            :key="`attribute-${indexAttr}`"
            @click="onClickItem"
            data-type="attributes"
            :data-index-item="indexAttr"
            :data-index-category="index">
           <a href="#" class="list__thumbnail" :style="{ backgroundImage: `url(${attribute.icon})` }"></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/icons/Icon.vue'

export default {
  name: 'CategoryPanel',
  props: {
    categories: {
      required: true,
      type: Array
    },
    selectionChange: {
      required: true,
      type: Function
    },
    show: {
      required: true,
      type: Boolean
    }
  },
  components: {
    Icon
  },
  data () {
    return {
      isActive: 0,
      selection: []
    }
  },
  methods: {
    initSelection () {
      this.categories.forEach(category => {
        const selection = {}
        if (category.colors && category.colors.length > 0) {
          selection.colors = category.default.colors ? category.default.colors : 0
        }
        if (category.attributes && category.attributes.length > 0) {
          selection.attributes = category.default.attributes ? category.default.attributes : 0
        }
        this.selection.push(selection)
      })
    },
    onClickCategory (e) {
      e.preventDefault()
      const target = e.currentTarget
      const index = target.getAttribute('data-index') * 1
      this.isActive = index
    },
    onClickItem (e) {
      e.preventDefault()
      const target = e.currentTarget
      const indexItem = target.getAttribute('data-index-item') * 1
      const indexCategory = target.getAttribute('data-index-category')
      const type = target.getAttribute('data-type')

      this.selection[indexCategory][type] = indexItem

      const category = this.categories[indexCategory]
      const option = category[type]

      this.selectionChange({
        category: indexCategory,
        type: type,
        value: type === 'colors' ? option[indexItem] : option[indexItem].ref,
        title: category.title,
        item: indexItem
      })
    }
  },
  mounted () {
    this.initSelection()
  }
}
</script>

<style scoped lang="scss">
  .list--category,
  .list--attributes,
  .list--colors {
    display: flex;
    align-items: center;
    justify-content: center;
    .list__item {
      list-style: none;
      margin-right: .5rem;
    }
    .list__thumbnail {
      cursor: pointer;
      display: block;
      background-size: auto 100%;
      background-position: center;
      background-repeat: no-repeat;
    }
  }

  .list--colors,
  .list--attributes {
    margin: 0;
  }

  .list--category {
    position: relative;
    bottom: -4rem;
    margin: 0 auto;
    padding: 0 2rem;
    width: fit-content;
    z-index: 2;
    border-radius: 3rem;
    box-shadow: 0 .6rem 1.5rem rgba($color__black, 0.1);
    background: $color__white;
    .list__item {
      opacity: 0.2;
      transform: scale(0);

      &:last-child {
        margin-right: 0;
      }
      .list__button {
        padding: .3rem .5rem 0 .3rem;

        svg {
          width: 3.5rem;
          height: 3.5rem;
        }
      }
      &.is-active {
        opacity: 1;
      }
    }

    .list__indicator {
      content: '';
      position: absolute;
      left: 5rem;
      bottom: 0;
      width: 9rem;
      height: .5rem;
      background: $color__black;
      transition: transform .3s, opacity .1s .3s;;
      opacity: 0;
    }
  }

  .list--colors {
    height: 100px;
    padding-top: 40px;
    border-bottom: 1px solid $color__gray--light;
    &--overflow { // a ajouter lorsqu'il y a un overflow sur le panel de couleur (js condition)
      overflow-x: scroll;
      justify-content: initial;
    }
    .list__item {
      margin: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      width: 2rem;
      height: 2rem;
      flex-shrink: 0;
      transform: scale(0);
      &.is-selected {
        &:after {
          opacity: 1;
        }

        .list__button {
          transform: scale(0.5);
        }
      }
      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 50%;
        border: .1rem solid $color__black;
        opacity: 0;
        transition: opacity .3s;
      }
      .list__button {
        border-radius: 50%;
        cursor: pointer;
        width: 2rem;
        height: 2rem;
        padding: 0;
        transition: transform .3s;
      }
    }
  }

  .list--attributes {
    height: 9rem;
    width: 100%;
    overflow-x: scroll; // a supprimer quand on utilisera le --overflow
    justify-content: initial; // a supprimer quand on utilisera le --overflow
    &--overflow {
      overflow-x: scroll;
      justify-content: initial;
    }
    .list__item {
      width: 6rem;
      height: 6rem;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 5px;
      border-radius: 1rem;
      flex-shrink: 0;
      transform: scale(0);

      &:after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        border-radius: 1rem;
        border: .1rem solid $color__black;
        opacity: .1;
        transition: opacity .3s;
      }

      .list__thumbnail {
        width: 4.5rem;
        height: 4.5rem;
      }
      &.is-selected {
        .list__button,
        .list__thumbnail {
          transform: scale(0.9)
        }

        &:after {
          opacity: 1;
        }
      }
    }
  }

  .panel {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    transform: translateY(10rem);

    transition: transform .3s, opacity .3s;

    &__subpanel {
      z-index: 1;
    }

    &--category {
      height: 35rem;
      background: $color__white;

      &.is-active {
        opacity: 1;
        transform: translateY(0);

        .list--category {
          .list__item {
            @for $i from 1 through 6 {
              &:nth-of-type(#{$i}) {
                transform: scale(1);
                transition: transform #{$i * .1s} .3s;
              }
            }
          }

          .list__indicator {
            opacity: 1;
          }
        }

        .panel__inner {
          &.is-active {
            .list--colors {
              .list__item {
                @for $i from 1 through 16 {
                  &:nth-of-type(#{$i}) {
                    transform: scale(1);
                    transition: transform #{$i * .1s} .3s;
                  }
                }
              }
            }
            .list--attributes {
              .list__item {
                @for $i from 1 through 16 {
                  &:nth-of-type(#{$i}) {
                    transform: scale(1);
                    transition: transform #{$i * .1s} .3s;
                  }
                }
              }
            }
          }
        }
      }

      .panel__inner {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        opacity: 0;
        pointer-events: none;
        transition: opacity .3s;

        &.is-active {
          pointer-events: all;
          opacity: 1;
        }

        .list {
          &:last-of-type {
            border-bottom: none;
          }
        }
      }
    }
  }

  @media (min-width: 769px) and (max-width: 1024px)  {
    .list--category,
    .list--attributes,
    .list--colors {
      .list__item {
        margin-right: .5rem;
      }
    }

    .list--colors {
      height: 16rem;
      padding-top: 4rem;
      .list__item {
        margin: 1rem;
        width: 4rem;
        height: 4rem;
        .list__button {
          width: 4rem;
          height: 4rem;
        }
      }
    }

    .list--attributes {
      height: 15rem;
      padding-left: 5rem;

      &--top {
        padding-top: 4rem;
        height: 17rem;
      }
      .list__item {
        width: 10rem;
        height: 10rem;
        margin: 0 1rem;
        .list__thumbnail {
          width: 7rem;
          height: 7rem;
          transition: transform .3s;
        }
        &.is-selected {
          .list__button,
          .list__thumbnail {
            transform: scale(0.8)
          }
        }
      }
    }

    .list--category {
      bottom: 4rem;
      padding: 0 5rem;
      border-radius: 5rem;
      .list__item {
        .list__button {
          padding: 1rem 1.5rem .5rem 1.5rem;
          svg {
            width: 6rem;
            height: 6rem;
          }
        }
        &.is-active {
          opacity: 1;
        }
      }
    }

    .panel {
      &__subpanel {
        z-index: 1;
      }
      &--category {
        .panel__inner {
          min-height: 35rem;
        }
      }
    }
  }
</style>
