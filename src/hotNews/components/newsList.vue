<template>
  <div class="hot-news" v-loading="newsLoading">
    <el-table v-if="tableData.length" :data="tableData" :show-header="false" class="news-table">
      <el-table-column v-if="!isMobile" type="index" width="60"></el-table-column>
      <el-table-column prop="text" label="标题" min-width="260">
        <template #default="{ row }">
          <span class="column-box">
            <span @click="goLink(row.link)" class="title-box">
              <img v-if="row.icon" :src="imgUrl(row.icon)" alt="" class="title-icon">
              {{ row.text }}
            </span>
            <span v-if="!isMobile" class="hot-value">{{ row.hotValue }}</span>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <el-empty v-else description="暂无数据" />
  </div>
</template>

<script>
import { ref, watch, computed, onMounted, onUnmounted } from 'vue';

export default {
  name: 'HotNews',
  props: {
    newsName: String
  },
  setup(props) {
    const newsLoading = ref(false);
    const tableData = ref([]);

    // 判断是否在移动端（这里使用窗口宽度小于等于768px作为判断条件）
    const isMobile = computed(() => {
      // 在组件挂载后获取浏览器窗口宽度
      const windowWidth = window.innerWidth;
      return windowWidth <= 768;
    });

    watch(() => props.newsName, (newVal, oldVal) => {
      if (newVal === oldVal) return;
      initData(newVal);
    }, {
      immediate: true
    });

    function initData(name) {
      newsLoading.value = true;
      fetch(`https://hotnewsserver.mutoo.asia/hotList?name=${encodeURIComponent(name)}`)
        .then(response => response.json())
        .then(data => {
          newsLoading.value = false;
          if (!data.length) return;
          // 清空热搜度为空的数据；
          // 热搜数据可能没有热度值，只是一个关键字如’热‘综艺’，这些多是广告也屏蔽掉
          tableData.value = data.filter(item => item.hotValue.trim() !== '' && item.hotValue.trim().length > 2);
        })
        .catch(error => {
          newsLoading.value = false;
          console.error('Error:', error);
        });
    }

    function goLink(link) {
      if (link.includes("javascript:void(0)")) return this.$message.error("链接异常！");
      window.open(link);
    }

    function imgUrl(icon) {
      if (icon.includes('https:https://')) {
        icon = icon.replace("https:https:", "https:");
      }
      return icon;
    }

    onMounted(() => {});

    // 在组件销毁时清空定时器
    onUnmounted(() => {});

    return {
      newsLoading,
      tableData,
      isMobile,
      goLink,
      imgUrl
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.news-table {
  width: 100%;
  height: 1200px;
  overflow-y: auto;
}
.column-box {
  display: flex;
  justify-content: space-between;
}
.title-icon {
  height: 14px;
  width: 14px;
  margin-right: 8px;
}

.title-box {
  cursor: pointer;
  font-weight: bold;
  width: 90%;
}
.title-box:hover {
  color: #E6A23C;
}
.hot-value {
  font-size: 12px;
  width: 6%;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
<!-- 移动端适配 -->
<style scoped>
@media screen and (max-width: 768px) {
  .title-box {
    width: 100%;
  }
}
</style>