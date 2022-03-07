<template>
  <div>
    <h3>PersonalCenter</h3>
    <h3>用户{{ this.uname }}的个人中心</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uname: sessionStorage.getItem("uname"),
    };
  },
};
</script>

<style lang="less" scoped></style>
