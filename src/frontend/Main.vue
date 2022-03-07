<template>
  <div>
    <div class="product">
      <!-- 焦点轮播图 -->
      <el-carousel height="480px">
        <el-carousel-item v-for="(item, index) in carousel_lists" :key="index">
          <img :src="item.img" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 支撑物：制造间隔 -->
    <div class="support"></div>

    <!-- 分类商品 -->
    <div class="product">
      <!-- 分类商品列表 -->
      <div class="product_sort_item">
        <el-tabs tab-position="left" type="card" value="first">
          <el-tab-pane label="电脑" name="first">
            <!-- 分类电脑 -->
            <div class="sort_div">
              <!-- v-for循环生成computer_item_lists列表一次循环4个 -->
              <div
                class="sort_item"
                v-for="(item, index) in computer_item_lists.slice(0, 4)"
                :key="index"
              >
                <div
                  class="sort_item_div"
                >
                <router-link
                  :to="`/details?${(item.href || '').split('?')[1]}`"><img class="cpimg" :src="item.pic" alt="" /></router-link>
                  
                  <div class="sort_item_title" v-text="item.title"></div>
                  <a
                    href="javascript:;"
                    class="sort_item_details"
                    v-text="item.details"
                  ></a>
                  <div class="sort_item_price" v-text="`￥${item.price}`"></div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="手机" name="second">
            <!-- 分类手机 -->
            <div class="sort_div">
              <!-- v-for循环生成computer_item_lists列表一次循环4个 -->
              <div
                class="sort_item"
                v-for="(item, index) in computer_item_lists.slice(0, 4)"
                :key="index"
              >
                sort_phone_item
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="平板" name="third">
            <!-- 分类平板 -->
            <div class="sort_div">
              <!-- v-for循环生成computer_item_lists列表一次循环4个 -->
              <div
                class="sort_item"
                v-for="(item, index) in computer_item_lists.slice(0, 4)"
                :key="index"
              >
                sort_ipad_item
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="手表" name="fourth">
            <!-- 分类手表-->
            <div class="sort_div">
              <!-- v-for循环生成computer_item_lists列表一次循环4个 -->
              <div
                class="sort_item"
                v-for="(item, index) in computer_item_lists.slice(0, 4)"
                :key="index"
              >
                sort_watch_item
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>

        <!-- 分页 -->
        <div class="product_sort_paging">
          <el-pagination layout="prev, pager, next" :total="40">
          </el-pagination>
        </div>
      </div>
    </div>

    <!-- 支撑物：制造间隔 -->
    <div class="support"></div>

    <!-- 首页推荐 -->
    <div class="product">
      <div class="hidden">
        <!-- 首页推荐 -->
        <div class="product_recommend">
          <div class="column_font">首页推荐</div>
          <div class="column_div">
            <div
              class="column_item"
              v-for="(item, index) in computer_item_lists.slice(0, 4)"
              :key="index"
            >
              <div class="column_item_div">
                <router-link
                  :to="`/details?${(item.href || '').split('?')[1]}`"
                ><img class="cpimg" :src="item.pic" alt="" /></router-link>
                
                <div class="column_item_title" v-text="item.title"></div>
                <a
                  href="javascript:;"
                  class="column_item_details"
                  v-text="item.details"
                ></a>
                <div class="column_item_price" v-text="`￥${item.price}`"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 销量排行 -->
        <div class="product_ranking">
          <div class="column_font">销量排行</div>
          <div class="ranking_div">
            <div
              href="javascript:;"
              class="ranking_item"
              v-for="(item, index) in computer_item_lists.slice(0, 4)"
              :key="index"
            >
              <div class="ranking_index" v-text="index"></div>
              <router-link :to="`/details?${(item.href || '').split('?')[1]}`"><img :src="item.pic" alt="" /></router-link>
              
              <div class="ranking_title" v-text="item.title"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 支撑物：制造间隔 -->
    <div class="support"></div>
  </div>
</template>

<script>
export default {
  // data：存储数据
  data() {
    return {
      // 轮播图数据
      carousel_lists: [],
      // 分类商品图
      computer_item_lists: [
        // {
        //   img: "http://www.codeboy.com:9999/img/index/study_computer_img3.png",
        // },
        // {
        //   img: "http://www.codeboy.com:9999/img/index/study_computer_img3.png",
        // },
        // {
        //   img: "http://www.codeboy.com:9999/img/index/study_computer_img3.png",
        // },
        // {
        //   img: "http://www.codeboy.com:9999/img/index/study_computer_img3.png",
        // },
      ],

      // 商品图数据
      p1: { price: 0, href: "" },
      p2: { price: 0, href: "" },
      p3: { price: 0, href: "" },
      others: [], //不用初始化内容，因为如果数组长度为0，则for循环一次都不执行！
    };
  },
  methods: {
    // 加载轮播图列表数据
    initCarousel() {
      // 请求 加载轮播图
      this.$axios.get("product/index.php").then((result) => {
        console.log("轮播图数据/分类商品电脑数据");
        console.log(result);

        // 用require处理轮播图 替换当前carousel列表
        // result.data.forEach((item) => {
        //   item.img = require("../assets/" + item.img);
        // });

        // 返回轮播图数据存入 carousel_lists
        this.carousel_lists = result.data.carouselItems;
        // 加载分类商品电脑数据存入 computer_item_lists
        this.computer_item_lists = result.data.recommendedItems;
        // console.log("carousel_lists");
        // console.log(this.carousel_lists);
      });
    },

    // 加载分类商品电脑数据
    initComputerItem() {
      // 请求index 加载分类商品电脑数据
      this.$axios.get("index").then((result) => {
        // console.log(`加载分类商品电脑数据`);
        // console.log(result.data);

        // 用require处理分类商品电脑图 替换当前carousel列表
        // result.data.forEach((item) => {
        //   item.pic = require("../assets/" + item.pic);
        // });
        // this.computer_item_lists = result.data;
      });
    },
  },
  // mounted：页面挂载时触发
  mounted() {
    // 加载轮播图
    this.initCarousel();
    // 加载分类商品电脑数据
    // this.initComputerItem();
  },
};
</script>

<style lang="less" scoped>
.cpimg{
  height: 150px;
  width: 198px;
  display: flex;
  justify-content: center;
  align-items: center;
}

// 商品栏标题字公共样式
.column_font {
  font-size: 25px;
  font-weight: bold;
  padding-bottom: 10px;
  border-bottom-style: solid;
  margin-bottom: 20px;
}

// 商品
.product {
  background-color: #eee;

  // 分类商品列表
  .product_sort_item {
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 0 15px #aaa;

    // 分类商品div
    .sort_div {
      // 高度
      height: 400px;
      // 横向居中
      display: flex;
      justify-content: space-around;

      // 分类商品item
      .sort_item {
        // border: 1px gray solid;
        box-shadow: 0 0 15px #aaa;
        margin: 15px;
        // margin-bottom: 15px;
        // height: 300px;
        width: 250px;
        // text-align: center;
        display: flex;
        justify-content: center;

        //
        .sort_item_div {
          // padding: 15px;
          width: 198px;
          display: flex;
          flex-wrap: wrap;
          align-content: space-around;
          text-align: center;
          text-decoration: none;

          // 公用price样式
          .sort_item_price {
            font-size: 25px;
            margin-bottom: 50px;
            color: #c40000;
            font-weight: bold;
            width: 100%;
          }
          // 公用details样式
          .sort_item_details {
            font-size: 14px;
            color: gray;
          }
          // 公用title样式
          .sort_item_title {
            font-size: 20px;
            font-weight: bold;
            color: black;
          }
        }
      }
    }
  }

  // 横向显示
  .hidden {
    display: flex;
    justify-content: space-between;

    // 首页推荐
    .product_recommend {
      padding: 20px;
      width: 900px;
      // padding: 20px;
      margin-right: 20px;
      background-color: #fff;
      box-shadow: 0 0 15px #aaa;

      // 首页推荐的商品栏标题字颜色
      .column_font {
        color: orange;
      }
      .column_div {
        // border: 1px gray solid;
        // height: 400px;
        display: flex;
        justify-content: space-around;

        .column_item {
          // border: 1px gray solid;
          width: 200px;
          height: 300px;
          display: flex;
          justify-content: space-around;
          box-shadow: 0 0 10px #aaa;
          text-decoration: none;

          .column_item_div {
            padding: 20px;
            display: flex;
            flex-wrap: wrap;
            align-content: space-between;
            text-align: center;

            .column_item_title {
              font-size: 20px;
              width: 100%;
              font-weight: bold;
              color: black;
            }
            .column_item_details {
              font-size: 12px;
              color: gray;
              width: 100%;
            }
            .column_item_price {
              font-size: 20px;
              color: orangered;
              font-weight: bold;
              width: 100%;
            }
          }
        }
      }
    }

    // 销量排行
    .product_ranking {
      padding: 20px;
      width: 220px;
      background-color: #fff;
      box-shadow: 0 0 15px #aaa;

      // 销量排行的商品栏标题字颜色
      .column_font {
        color: cadetblue;
      }

      .ranking_div {
        // border: 1px gray solid;
        height: 500px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        // ranking_index

        .ranking_item {
          border: 3px cadetblue solid;
          // box-shadow: 0 0 10px gray;
          height: 100px;
          // width: 200px;
          display: flex;
          justify-content: space-between;
          text-decoration: none;
          text-justify: auto;

          .ranking_index {
            color: cadetblue;
            font-weight: bold;
            font-size: 30px;
          }
          img {
            width: auto;
            height: 80px;
          }
          .ranking_title {
            font-size: 14px;
            color: black;
          }
        }
      }
    }
  }

  // 分页
  .product_sort_paging {
    text-align: center;
  }
}

.el-carousel {
  box-shadow: 0 0 15px #aaa;
}

// 图片占满
.el-carousel__item img {
  height: 100%;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.support {
  height: 20px;
}
</style>
