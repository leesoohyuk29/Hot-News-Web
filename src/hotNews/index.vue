<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item, index) in tabPanes"
        :key="index"
        :label="item.label"
        :disabled="['zh', 'xhs', 'blbl'].includes(item.name)"
        :name="item.name"
        ></el-tab-pane>
    </el-tabs>
    <news-list :newsName="activeName"></news-list>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import newsList from './components/newsList.vue'

export default {
  name: "HotNews",
  components: { newsList },
  setup() {
    let activeName = ref("wb");
    const tabPanes = reactive([
      { name: "wb", label: "微博" },
      { name: "bd", label: "百度" },
      { name: "hp", label: "虎扑" },
      { name: "tt", label: "头条" },
      { name: "zh", label: "知乎" },
      { name: "xhs", label: "小红书" },
      { name: "blbl", label: "哔哩哔哩" },
    ]);

    const handleClick = (tab) => {
      const { name } = tab?.props ?? {};
      activeName = name ?? '';
    };
    return {
      activeName,
      tabPanes,
      handleClick,
    };
  },
};
</script>

<style scoped>
/* .app-container .el-tabs .el-tabs__item {
  width: 100% !important;
} */
</style>
