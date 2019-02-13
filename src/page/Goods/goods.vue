<template>
  <div class="goods">
    <div>
      <!-- 条件标签 -->
      <div class="w" style="height: 30px;margin-top: 10px">
        <span style="margin-right: 40px; color: #c81623">已选属性</span>
        <!-- 品牌 -->
        <el-tag
          v-for="(tag, index) in tagsBrand"
          :key="tag"
          closable
          @close="handleCloseBrand"
          type="warning" style="margin-left: 5px">
          {{tag}}
        </el-tag>

        <!-- 分类 -->
        <el-tag
          v-for="(tag, index) in tagsCategory"
          :key="tag"
          closable
          @close="handleCloseCategory"
          type="info" style="margin-left: 5px">
          {{tag}}
        </el-tag>

        <!-- 属性 -->
        <el-tag
          v-for="(tag, index) in tags"
          :key="index"
          closable
          @close="handleClose(tag)"
          type="success" style="margin-left: 5px">
          {{tag.value}}
        </el-tag>

      </div>
      <div class="search">
        <div class="w" v-if="!tagsBrand.length">
          <span>品牌</span>
          <a v-for="(brand, index) in brandList" :key="index" @click.prevent="brandClick(brand)" v-if="index<8">{{brand.name}}</a>
        </div>
        <div class="w" v-if="!tagsCategory.length">
          <span>分类</span>
          <a v-for="(category, index) in categoryList" :key="index" @click.prevent="categoryClick(category)">{{category.name}}</a>
        </div>
        <div v-for="(attribute, index) in attributeList" :key="index">
          <attributeOptions :category="attribute" :handleClick="handleClick"
                    v-show="attribute.show || attribute.show===undefined">
          </attributeOptions>
        </div>

      </div>

    </div>
    <br>
    <br>

    <!--<div class="nav">-->
      <!--<div class="w">-->
        <!--<a href="javascript:;" :class="{active:sortType===1}" @click="reset()">综合排序</a>-->
        <!--<a href="javascript:;" @click="sortByPrice(1)" :class="{active:sortType===2}">价格从低到高</a>-->
        <!--<a href="javascript:;" @click="sortByPrice(-1)" :class="{active:sortType===3}">价格从高到低</a>-->
        <!--<div class="price-interval">-->
          <!--<input type="number" class="input" placeholder="价格" v-model="min">-->
          <!--<span style="margin: 0 5px"> - </span>-->
          <!--<input type="number" placeholder="价格" v-model="max">-->
          <!--<y-button text="确定" classStyle="main-btn" @btnClick="reset" style="margin-left: 10px;"></y-button>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->

    <div v-loading="loading" element-loading-text="加载中..." style="min-height: 35vw;">
      <div class="img-item" v-if="!noResult">
        <!--商品-->
        <div class="goods-box w">
          <mall-goods v-for="(item,i) in goods" :key="i" :msg="item"></mall-goods>
        </div>

        <el-pagination
          v-if="!noResult&&!error"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[8, 20, 40, 80]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
      <div class="no-info" v-if="noResult">
        <div class="no-data">
          <img src="/static/images/no-search.png">
          <br> 抱歉！暂时还没有商品
        </div>
        <section class="section">
          <y-shelf :title="recommendPanel.name">
            <div slot="content" class="recommend">
              <mall-goods :msg="item" v-for="(item,i) in recommendPanel.panelContents" :key="i"></mall-goods>
            </div>
          </y-shelf>
        </section>
      </div>
      <div class="no-info" v-if="error">
        <div class="no-data">
          <img src="/static/images/error.png">
          <br> 抱歉！出错了...
        </div>
        <section class="section">
          <y-shelf :title="recommendPanel.name">
            <div slot="content" class="recommend">
              <mall-goods :msg="item" v-for="(item,i) in recommendPanel.panelContents" :key="i"></mall-goods>
            </div>
          </y-shelf>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
  import attributeOptions from './attributeOptions'
  import {getAllGoods, getAttributeList, getBrandList, getCategoryList, searchByCondition} from '/api/goods.js'
  import {recommend} from '/api/index.js'
  import mallGoods from '/components/mallGoods'
  import YButton from '/components/YButton'
  import YShelf from '/components/shelf'

  export default {
    data() {
      return {
        tagsCategory: [],
        tagsBrand:[],
        categoryId: null,
        brandId: null,
        brandList: [{id:1, name: '耐克'}, {id: 2, name: '特步'}],
        categoryList: [{id:1, name: '耐克'}, {id: 2, name: '特步'}],
        attributeList: [
          {
            id: 2,
            name: "哈哈",
            attributeValue: [{value: "哈哈", id: 4}, {value: "哈哈1", id: 5}, {value: "哈哈2", id: 6}, {
              value: "哈哈3",
              id: 7
            }, {value: "哈哈4", id: 8}],
            show: true
          },
          {
            id: 3,
            name: "吼吼",
            attributeValue: [{value: "吼吼", id: 4}, {value: "吼吼1", id: 5}, {value: "吼吼2", id: 6}, {
              value: "吼吼3",
              id: 7
            }, {value: "吼吼4", id: 8}],
            show: true
          },
          {
            id: 3,
            name: "吼吼",
            attributeValue: [{value: "吼吼", id: 4}, {value: "吼吼1", id: 5}, {value: "吼吼2", id: 6}, {
              value: "吼吼3",
              id: 7
            }, {value: "吼吼4", id: 8}],
            show: true
          },
          {
            id: 3,
            name: "吼吼",
            attributeValue: [{value: "吼吼", id: 4}, {value: "吼吼1", id: 5}, {value: "吼吼2", id: 6}, {
              value: "吼吼3",
              id: 7
            }, {value: "吼吼4", id: 8}],
            show: true
          },
          {
            id: 3,
            name: "吼吼",
            attributeValue: [{value: "吼吼", id: 4}, {value: "吼吼1", id: 5}, {value: "吼吼2", id: 6}, {
              value: "吼吼3",
              id: 7
            }, {value: "吼吼4", id: 8}],
            show: true
          }
        ],
        tags: [],
        goods: [],
        noResult: false,
        error: false,
        min: '',
        max: '',
        loading: true,
        timer: null,
        sortType: 1,
        windowHeight: null,
        windowWidth: null,
        recommendPanel: [],
        sort: '',
        currentPage: 1,
        total: 0,
        pageSize: 20
      }
    },computed: {
      queryList(){
        const tags = this.tags;
        let valueIds = []
        let brandId = null
        let categoryId = null
        for (let i = 0; i < tags.length; i++) {
          valueIds.push(tags[i].valueId)
        }
        brandId = this.brandId
        categoryId = this.categoryId
        return {
          valueIds,
          brandId,
          categoryId
        }
      }
    },
    methods: {
      handleCloseBrand(){
        this.tagsBrand.splice(0,1)
        this.brandId = null
        this.search()
      },
      handleCloseCategory(){
        this.tagsCategory.splice(0,1)
        this.categoryId = null
        this.search()
      },
      categoryClick(category){
        this.categoryId = category.id
        this.tagsCategory.push('分类：' + category.name)
        this.search()
      },
      brandClick(brand){
        this.brandId = brand.id
        this.tagsBrand.push('品牌：' + brand.name)
        this.search()
      },
      search() {
        let cid = this.$route.query.cid
        if (this.min !== '') {
          this.min = Math.floor(this.min)
        }
        if (this.max !== '') {
          this.max = Math.floor(this.max)
        }
        let data = {
          page: this.currentPage,
          size: this.pageSize,
          sort: this.sort,
          priceGt: this.min,
          priceLte: this.max,
          cid: cid,
          ...this.queryList
        }
        searchByCondition(data).then(res => {
          if (res.code === 100000) {
            this.total = res.data.total
            this.goods = res.data.data
            this.noResult = this.total === 0;
            this.error = false
          } else {
            this.error = true
          }
          this.loading = false
        })
      },
      handleClick(attribute, value, index) {
        for (let i = 0; i < this.attributeList.length; i++) {
          if (this.attributeList[i].id === attribute.id) {
            this.attributeList[i].show = false
            this.tags.push({value: this.attributeList[i].name + "：" + value.value, id: attribute.id, valueId: value.id})
            this.search()
            break
          }
        }
      },
      handleClose(tag) {
        for (let i = 0; i < this.attributeList.length; i++) {
          if (this.attributeList[i].id === tag.id) {
            this.attributeList[i].show = true
            this.tags.splice(this.tags.indexOf(tag), 1)
            this.search()
            break
          }
        }
      },
      handleSizeChange(val) {
        this.pageSize = val
        this._getAllGoods()
        this.loading = true
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this._getAllGoods()
        this.loading = true
      },
      _getAllGoods() {
        let cid = this.$route.query.cid
        if (this.min !== '') {
          this.min = Math.floor(this.min)
        }
        if (this.max !== '') {
          this.max = Math.floor(this.max)
        }
        let params = {
          params: {
            page: this.currentPage,
            size: this.pageSize,
            sort: this.sort,
            priceGt: this.min,
            priceLte: this.max,
            cid: cid
          }
        }
        getAllGoods(params).then(res => {
          if (res.code === 100000) {
            this.total = res.data.total
            this.goods = res.data.data
            this.noResult = false
            if (this.total === 0) {
              this.noResult = true
            }
            this.error = false
          } else {
            this.error = true
          }
          this.loading = false
        })
      },
      // 默认排序
      reset() {
        this.sortType = 1
        this.sort = ''
        this.currentPage = 1
        this.loading = true
        this._getAllGoods()
      },
      // 价格排序
      sortByPrice(v) {
        v === 1 ? this.sortType = 2 : this.sortType = 3
        this.sort = v
        this.currentPage = 1
        this.loading = true
        this._getAllGoods()
      }
    },
    watch: {
      $route(to, from) {
        if (to.fullPath.indexOf('/goods?cid=') >= 0) {
          this.cId = to.query.cid
          this._getAllGoods()
        }
      }
    },
    created() {
    },
    mounted() {
      this.windowHeight = window.innerHeight
      this.windowWidth = window.innerWidth
      this._getAllGoods()
      // recommend().then(res => {
      //   let data = res.result
      //   this.recommendPanel = data[0]
      // })
      getAttributeList().then(res => {
        this.attributeList = res.data
      })
      getBrandList().then(res => {
        this.brandList = res.data
      })
      getCategoryList().then(res => {
        this.categoryList = res.data
      })
    },
    components: {
      mallGoods,
      YButton,
      YShelf,
      attributeOptions
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/style/mixin";
  @import "../../assets/style/theme";

  .search {
    line-height: 35px;

    > div {
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

  }

  .nav {
    height: 60px;
    line-height: 60px;

    > div {
      display: flex;
      align-items: center;

      a {
        padding: 0 15px;
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

      input {
        @include wh(80px, 30px);
        border: 1px solid #ccc;
      }

      input + input {
        margin-left: 10px;
      }
    }

    .price-interval {
      padding: 0 15px;
      @extend %block-center;

      input[type=number] {
        border: 1px solid #ccc;
        text-align: center;
        background: none;
        border-radius: 5px;
      }
    }
  }

  .goods-box {
    > div {
      float: left;
      border: 1px solid #efefef;
    }
  }

  .no-info {
    padding: 100px 0;
    text-align: center;
    font-size: 30px;
    display: flex;
    flex-direction: column;

    .no-data {
      align-self: center;
    }
  }

  .img-item {
    display: flex;
    flex-direction: column;
  }

  .el-pagination {
    align-self: flex-end;
    margin: 3vw 10vw 2vw;
  }

  .section {
    padding-top: 8vw;
    margin-bottom: -5vw;
    width: 1218px;
    align-self: center;
  }

  .recommend {
    display: flex;

    > div {
      flex: 1;
      width: 25%;
    }
  }


</style>
