<template>
  <div class="w">
    <span>{{category.name}}</span>
    <a v-for="(item, index) in category.attributeValue" :key="index" @click.prevent="handleClickItem(category, item, index)">{{item.value}}</a>
  </div>
</template>

<script>
  export default {
    props: {
      category: {
        type: Object
      },
      handleClick: {
        type: Function
      }
    },
    methods: {
      handleClickItem(category, item, index) {
        if (this.handleClick) {
          this.handleClick(category, item, index)
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/style/mixin";
  @import "../../assets/style/theme";

  .w {
    width: 1220px;
    margin: 0 auto;
  }

  div {
    display: flex;
    align-items: center;

    a {
      padding: 0 10px;
      height: 100%;
      @extend %block-center;
      font-size: 12px;
      color: #999;

      &.active {
        color: #5683EA;
      }

      &:hover {
        color: #5683EA;
      }
    }

    span {
      width: 100px;
    }
  }
</style>
