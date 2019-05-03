<template>
  <svg :class="['icon', `icon--${name}`, extraClasses ? extraClasses : '']" :width="width" :height="height">
    <use :xlink:href="`#icon-${name}`" :fill="[fill ? fill : '']" :stroke="[stroke ? stroke : '']"></use>
  </svg>
</template>

<script>
export default {
  props: ['name', 'height', 'width', 'fill', 'stroke', 'extraClasses']
}
</script>
