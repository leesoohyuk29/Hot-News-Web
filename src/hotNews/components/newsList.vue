<template>
  <div class="hot-news">
    <el-table :data="tableData" :show-header="false" v-loading="newsLoading" class="news-table">
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="text" label="标题" min-width="260">
        <template #default="{ row }">
          <span class="column-box">
            <span @click="goLink(row.link)" class="title-box">
              <img v-if="row.icon" :src="imgUrl(row.icon)" alt="" class="title-icon">
              {{ row.text }}
            </span>
            <span class="hot-value">{{ row.hotValue }}</span>
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { ref, watch, onMounted, onUnmounted } from 'vue';

export default {
  name: 'HotNews',
  props: {
    newsName: String
  },
  setup(props) {
    let timerId = ref(null);
    const newsLoading = ref(false);
    const tableData = ref([]);

    watch(() => props.newsName, (newVal, oldVal) => {
      if (newVal === oldVal) return;
      initData(newVal);
    }, {
      immediate: true
    });

    function initData(name) {
      newsLoading.value = true;
      fetch(`https://www.mutoo.asia?name=${encodeURIComponent(name)}`)
        .then(response => response.json())
        .then(data => {
          newsLoading.value = false;
          if (!data.length) return;
          // 清空热搜度为空的数据；
          // 热搜数据可能没有热度值，只是一个关键字如’热‘综艺’，这些多是广告也屏蔽掉
          tableData.value = data.filter(item => item.hotValue.trim() !== '' && item.hotValue.trim().length > 2);
        })
        .catch(error => {
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

    onMounted(() => {
      // initData(props.newsName);
      // timerId = setInterval(() => {
      //   initData(props.newsName);
      // }, 30000);
    });

    // 在组件销毁时清空定时器
    onUnmounted(() => {
      clearInterval(timerId);
    });

    return {
      newsLoading,
      tableData,
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
}
.title-box:hover {
  color: #E6A23C;
}
.hot-value {
  font-size: 12px;
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
