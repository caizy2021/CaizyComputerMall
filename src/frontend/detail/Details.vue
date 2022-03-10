<template>
  <div>
    <!-- <h3>我是details.vue</h3> -->
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        ><a href="javascript:;">笔记本电脑</a></el-breadcrumb-item
      >
      <el-breadcrumb-item v-text="p.lname"></el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 详情主体 -->
    <div class="details_main">
      <!-- 左 -->
      <div class="details_left">
        <!-- 视图 -->
        <div class="big_pic">
          <!-- <img src="../../../public/img/product/md/57b12a31N8f4f75a3.jpg" /> -->
          <!-- <div v-for="(img, i) in pics" :key="i"> -->
          <img :src="pics[i].md" />

          <!-- </div> -->
        </div>
        <!-- 小图 -->
        <div class="small_pic">
          <div class="img_sm" v-for="(img, i) in pics.slice(0, 4)" :key="i">
            <a href="javascript:;" @mouseenter="clickImgSM(i)">
              <img :src="img.sm" />
            </a>
          </div>
        </div>
      </div>
      <!-- 右 -->
      <div class="details_right">
        <!-- 标题&标题详情 -->
        <div>
          <!-- 标题 -->
          <div class="title" v-text="p.title"></div>
          <!-- 标题详情 -->
          <el-link type="info" v-text="p.subtitle"></el-link>
        </div>

        <!-- 售价/服务承诺 -->
        <div class="price">
          <!-- 售价 -->
          <div>售价：<span class="p_price" v-text="`￥${p.price}`"></span></div>
          <!-- 服务承诺 -->
          <div>
            服务承诺：
            <el-link type="info" v-text="p.promise"></el-link>
          </div>
        </div>

        <el-divider></el-divider>

        <!-- 客服/规格/数量 -->
        <div class="list">
          <!-- 客服 -->
          <div class="customer_service">
            <span
              >客服：<el-link type="info">联系客服</el-link>
              <img src="/img/product_detail/kefuf.gif" />
            </span>
          </div>
          <!-- 规格 -->
          <div>
            <span>规格：</span>
            <el-button
              type="danger"
              v-for="(sp, i) in specs"
              :key="i"
              plain
              v-text="sp.spec"
              @click="changeLid(i)"
            ></el-button>

            <!-- <router-link class="sp_link" v-for="(sp, i) in specs" :key="i" :to="`/details/${sp.lid}`">
              <el-button type="info" plain>{{sp.spec}}</el-button>
            </router-link> -->
          </div>
          <!-- 数量 -->
          <span>
            <div class="num">
              <span>数量：</span
              ><el-input-number
                v-model="num"
                @change="handleChange"
                :min="1"
                label="数量"
              ></el-input-number>
            </div>
          </span>
        </div>

        <!-- 购买部分 -->
        <div>
          <el-button @click="toCart()" type="danger">加入购物车</el-button>
          <!-- <el-button type="info" plain>立即购买</el-button> -->
          <el-button
            type="danger"
            icon="el-icon-star-off"
            circle
            plain
          ></el-button>
        </div>
      </div>
    </div>

    <!-- 商品详情 -->
    <div class="product_details">
      <el-tabs value="first">
        <el-tab-pane label="商品详情" name="first">
          <h1>商品详情</h1>
          <el-row>
            <el-col :span="8"
              ><div class="">
                <div>商品名称：{{ p.lname }}</div>
                <div>系统：{{ p.os }}</div>
                <div>内存容量：{{ p.memory }}</div>
              </div></el-col
            >
            <el-col :span="8"
              ><div class="">
                <div>分辨率：{{ p.resolution }}</div>
                <div>显卡型号：{{ p.video_card }}</div>
                <div>处理器：{{ p.cpu }}</div>
              </div></el-col
            >
            <el-col :span="8"
              ><div class="">
                <div>显存容量：{{ p.video_memory }}</div>
                <div>分类：{{ p.category }}</div>
                <div>硬盘容量:{{ p.disk }}</div>
              </div></el-col
            >
          </el-row>

          <el-divider></el-divider>

          <h1>商品介绍</h1>
          <div class="p_details" v-html="p.details"></div>
        </el-tab-pane>
        <el-tab-pane label="商品评价" name="second">商品评价</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      p: { price: 0 }, // 价格
      specs: [], // 规格
      pics: [{}], // 商品图
      lid: this.$route.query.lid, // 获取 lid
      uid: sessionStorage.getItem("uid"), // 获取 uid
      newlid: 0,
      i: 0, //当前正在看第几张
      num: 1, // 商品数量
    };
  },
  methods: {
    // 点击规格更新lid
    changeLid(index) {
      // console.log(index);
      this.newlid = this.lid - 0 + index;
      console.log(
        `user_id=${this.uid}&product_id=${this.newlid}&count=${this.num}&is_checked=1`
      );
    },
    // 点击'加入购物车'时触发
    async toCart() {
      // 跳转到购物车
      const sql = `/cart/add?user_id=${this.uid}&product_id=${this.newlid}&count=${this.num}&is_checked=1`;
      console.log(sql);
      const { data: res } = await this.$axios.get(sql);
      // console.log(res);
      if (res.code == 200) {
        this.$message.success("加入购物车成功");
      }
    },

    handleChange(value) {
      console.log(`count=${value}`);
    },
    // 点小图切换大图
    clickImgSM(i) {
      // console.log(`${i}点击了clickImgSM`);
      this.i = i;
    },
    // 获取商品详情的方法
    async getDetails() {
      const url = "/details?lid=" + this.lid;
      const { data: res } = await this.$axios.get(url);
      console.log(res);
      // console.log(res);
      this.p = res.product;
      this.specs = res.specs;
      this.pics = res.pics;
    },
  },
  // 生命周期钩子 created
  // 回调函数函数 添加后自动执行
  // 内部可以通过this 访问到 vue实例

  // 页面内容挂载完成
  mounted() {
    console.log(`页面内容挂载完成之后发送请求...`);
    this.getDetails();
    this.changeLid(0);

    // let lid = this.$route.query.lid;
    // console.log("mountedlid:" + lid);
    // let url = "product/details.php?lid=" + lid;
    // console.log(url);

    // this.$axios.get(url).then((result) => {
    //   console.log(result);
    //   this.p = result.data.details;
    //   this.specs = result.data.family.laptopList;
    //   this.pics = result.data.details.picList;
    // });
  },
};
</script>

<style lang="less" scoped>
.el-row {
  .el-col {
    // border: 1px gray solid;
    div div {
      display: flex;
      justify-content: center;
    }
  }
}

// 详情主体
.details_main {
  margin-top: 20px;
  // border: 1px gray solid;
  // 内容横向布局
  display: flex;
  justify-content: space-between;

  // 左
  .details_left {
    box-shadow: 0 0 15px #aaa;
    background-color: #fff;
    // border: 1px gray solid;
    width: 500px;
    height: 600px;

    // 内边距
    padding: 20px;
    // 竖向居中
    display: flex;
    flex-wrap: wrap;
    align-content: space-around;
    text-align: center;
    // 大图
    .big_pic {
      width: 100%;
      // border: 1px gray solid;
    }
    // 小图
    .small_pic {
      width: 100%;
      // border: 1px gray solid;
      display: flex;
      justify-content: left;
      // text-align: left;
      img {
        // border: 1px gray solid;
        height: 84px;
        width: 84px;
      }
      .img_sm {
        padding: 10px;
      }
    }
  }
  // 右
  .details_right {
    box-shadow: 0 0 15px #aaa;
    background-color: #fff;
    // 内边距
    padding: 20px;
    // border: 1px gray solid;
    // background-color: red;
    width: 600px;
    height: 600px;
    // 竖向居中
    display: flex;
    flex-wrap: wrap;
    align-content: space-around;
    // text-align: center;
    .el-button {
      margin: 5px;
    }
    // 标题
    .title {
      font-size: 25px;
      font-weight: bold;
    }
    // 标题信息
    .title_details {
      font-size: 16px;
      color: gray;
    }
    // 价格
    .price {
      .p_price {
        color: #c40000;
        font-size: 40px;
      }
    }
    .list {
      div {
        margin: 10px 0;
      }
      // 数量
      .num {
        span {
          margin-top: 18px;
        }
        display: flex;
        justify-content: left;
        .el-input-number {
          width: 150px;
        }
      }
      .sp_link {
        border: 1px gray solid;
        color: green;
      }
    }
  }
}

// 商品详情
.product_details {
  margin-top: 20px;
  // height: 800px;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 0 15px #aaa;
  .el-tabs {
    padding: 20px;
    .p_details {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
