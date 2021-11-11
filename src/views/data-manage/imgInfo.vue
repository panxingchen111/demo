<template>
  <div>
    <viewer :images="imgList">
      <el-row :gutter="20">
        <el-col v-for="(item, index) in imgList" :key="index" :span="8">
          <el-card shadow="hover">
            <img :src="item.url" />
          </el-card>
        </el-col>
      </el-row>
    </viewer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgList: [
        {
          url:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F963dc440910836702bbd3e9a152ff91153117863d315-Z46lui_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1635055209&t=75e38bf2abc45d66f24bd590258168d6"
        },
        {
          url:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftp05%2F1910011H2046039-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1635055240&t=2954228d25f2b03e4b19e237f49ecdca"
        },
        {
          url:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ftupian.qqjay.com%2Fu%2F2017%2F1215%2F14_1657_8.jpg&refer=http%3A%2F%2Ftupian.qqjay.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1635055258&t=f015264acaa0378d64fc08dc912d0be3"
        },
        {
          url:
            "https://img0.baidu.com/it/u=3824885854,2211929209&fm=26&fmt=auto"
        },
        {
          url:
            "https://img1.baidu.com/it/u=1638839161,1359064032&fm=26&fmt=auto"
        },
        {
          url:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F43%2F2f%2F2e%2F432f2e913ced9bafd650186c43c96759.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1635055337&t=26b750fe0a4acef4d18a944147a43303"
        },
        {
          url:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fqzone.qqjay.com%2Fu%2Ffiles%2F2012%2F0220%2F9852cf8fa1ab4216c9629f40659670c8.jpg&refer=http%3A%2F%2Fqzone.qqjay.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1635055362&t=0abc8ed90c9ca8d9f9662070a36fd42e"
        },
        {
          url:
            "https://img1.baidu.com/it/u=1430309912,4088233564&fm=26&fmt=auto"
        },
        {
          url:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic24.nipic.com%2F20121020%2F10812677_005036136125_2.jpg&refer=http%3A%2F%2Fpic24.nipic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1635055419&t=b8b64cd04c89e3916acc5dc958bf4848"
        }
      ]
    };
  },
  created() {
    let date = new Date().valueOf();
    console.log(this.dayjs().format("YYYY-MM-DD"), date);
    this.$store.commit("getList", 12);
  }
};
</script>
<style lang="less" scoped>
img {
  position: relative;
  display: inline-block;
  overflow: hidden;
  height: 220px;
  width: 100%;
  border-radius: 14px;
}
.el-col-8 {
  padding: 10px;
}
</style>
