<template>
  <div class="panel panel--category">
    <ul class="list list--category">
      <li :class="`list__item ${isActive === index ? 'is-active' : ''}`" :data-index="index" @click="onClickCategory" v-for="(category, index) in categories" :key="`category-${index}`">
        <button class="list__button">
          {{category.title}}
        </button>
      </li>
    </ul>
    <div class="panel__subpanel">
      <div :class="`panel__inner ${isActive === index ? 'is-active' : ''}`" v-for="(category, index) in categories" :key="`panel-${index}`">
        <ul class="list--colors" v-if="category && category.colors && category.colors.length > 0">
          <li v-for="(color, indexColor) in category.colors" :class="`list__item ${selection[index] && selection[index].color === indexColor ? 'is-selected' : ''}`" @click="onClickItem"  data-type="color" :data-index-item="indexColor" :data-index-category="index" :key="`color-${indexColor}`">
           <button class="list__button" :style="{ backgroundColor: color }"></button>
          </li>
        </ul>
         <ul class="list--attributes" v-if="category && category.attributes && category.attributes.length > 0">
          <li v-for="(attribute, indexAttr) in category.attributes" :class="`list__item ${selection[index] && selection[index].attribute === indexAttr ? 'is-selected' : ''}`" :key="`attribute-${indexAttr}`" @click="onClickItem"  data-type="attribute" :data-index-item="indexAttr" :data-index-category="index">
           <a href="#" class="list__thumbnail" :style="{ backgroundImage: `url(${attribute.icon})` }"></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
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
          selection.color = 0
        }
        if (category.attributes && category.colors.length > 0) {
          selection.attribute = 0
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

      this.selectionChange(this.selection)
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
    .list__item {
      list-style: none;
      margin-right: .5rem;
    }
    .list__thumbnail {
      cursor: pointer;
      display: block;
      width: 3rem;
      height: 3rem;
      background-size: 100% 100%;
      background-position: center;
    }
  }

  .list--colors {
    .list__button {
      border-radius: 100%;
      width: 1rem;
      height: 1rem;
      cursor: pointer;
    }
  }

  .list--colors,
  .list--attributes {
    .list__item {
      &.is-selected {
        border: .2rem solid green;
      }
    }
  }
  .list--category {
    .list__item {
      &.is-active {
        .list__button {
          border: .2rem solid green;
        }
      }
    }
  }

  .panel--category {
    .panel__inner {
      display: none;

      &.is-active {
        display: block;
      }
    }
  }
</style>
