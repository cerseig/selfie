<template>
  <div class="panel panel--category">
    <ul class="list list--category">
      <li :class="`list__item ${isActive === index ? 'is-active' : ''}`" :data-index="index" @click="onClickCategory" v-for="(category, index) in categories" :key="`category-${index}`">
        <button class="list__button">
          <Icon :name="category.icon.title" :width="60" :height="60" stroke="#000000" fill="#000000"/>
        </button>
      </li>
    </ul>
    <div class="panel__subpanel">
      <div :class="`panel__inner ${isActive === index ? 'is-active' : ''}`" v-for="(category, index) in categories" :key="`panel-${index}`">
        <ul class="list--colors" v-if="category && category.colors && category.colors.length > 0">
          <li
            v-for="(color, indexColor) in category.colors"
            :class="`list__item ${selection[index] && selection[index].colors === indexColor ? 'is-selected' : ''}`"
            @click="onClickItem"
            data-type="colors"
            :data-index-item="indexColor"
            :data-index-category="index"
            :key="`color-${indexColor}`"
          >
           <button class="list__button" :style="{ backgroundColor: color }"></button>
          </li>
        </ul>
         <ul :class="`list--attributes ${!category.colors && isActive === index ? 'list--attributes--top' : ''}`" v-if="category && category.attributes && category.attributes.length > 0">
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
    background-color: $color__white;
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
      background-size: 100% 100%;
      background-position: center;
    }
  }

  .list--colors,
  .list--attributes {
    margin: 0;
    .list__item {
      &.is-selected {
        .list__button,
        .list__thumbnail {
          width: 2rem;
          height: 2rem;
        }
      }
    }
  }

  .list--category {
    position: relative;
    bottom: -40px;
    z-index: 2;
    width: fit-content;
    padding: 0 50px;
    border-radius: 50px;
    margin: 0 auto;
    box-shadow: 0px 6px 15px $color__gray--light;
    .list__item {
      opacity: 0.2;
      .list__button {
        padding: 15px 20px 10px 20px;
      }
      &.is-active {
        opacity: 1;
        .list__button {
          border-bottom: .5rem solid $color__black;
        }
      }
    }
  }

  .list--colors {
    height: 160px;
    padding-top: 40px;
    border-bottom: 1px solid $color__gray--light;
    .list__item {
      margin: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      width: 4rem;
      height: 4rem;
      &.is-selected {
        border: .1rem solid $color__black;
      }
      .list__button {
        border-radius: 50%;
        cursor: pointer;
        width: 4rem;
        height: 4rem;
      }
    }
  }

  .list--attributes {
    height: 100px;
    overflow-x: scroll;
    justify-content: initial;
    .list__item {
      border: .1rem solid $color__gray--light;
      width: 6rem;
      height: 6rem;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 10px;
      border-radius: 10px;
      flex-shrink: 0;
      .list__thumbnail {
        width: 4.5rem;
        height: 4.5rem;
      }
      &.is-selected {
        border-color: $color__black;
        .list__button,
        .list__thumbnail {
          width: 3rem;
          height: 3rem;
        }
      }
    }
  }

  .panel {
    width: 100%;
    position: absolute;
    bottom: 0;
    &__subpanel {
      z-index: 1;
    }
    &--category {
      .panel__inner {
        display: none;

        &.is-active {
          display: block;
        }
      }
    }
  }

  @media (min-width: 768px) and (max-width: 1024px)  {
    .list--category,
    .list--attributes,
    .list--colors {
      .list__item {
        margin-right: .5rem;
      }
    }

    .list--colors,
    .list--attributes {
      .list__item {
        &.is-selected {
          .list__button,
          .list__thumbnail {
            width: 2rem;
            height: 2rem;
          }
        }
      }
    }

    .list--colors {
      height: 160px;
      padding-top: 40px;
      .list__item {
        margin: 10px;
        width: 3.5rem;
        height: 3.5rem;
        .list__button {
          width: 3.5rem;
          height: 3.5rem;
        }
      }
    }

    .list--attributes {
      height: 150px;
      &--top {
        padding-top: 40px;
        height: 180px;
      }
      .list__item {
        width: 10rem;
        height: 10rem;
        margin: 0 10px;
        .list__thumbnail {
          width: 7rem;
          height: 7rem;
        }
        &.is-selected {
          .list__button,
          .list__thumbnail {
            width: 4rem;
            height: 4rem;
          }
        }
      }
    }

    .list--category {
      bottom: -40px;
      padding: 0 50px;
      .list__item {
        .list__button {
          padding: 5px 10px 0 10px;
        }
      }
    }

    .panel {
      &__subpanel {
        z-index: 1;
      }
      &--category {
        .panel__inner {
          display: none;

          &.is-active {
            display: block;
          }
        }
      }
    }
  }
</style>
