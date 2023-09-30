<template>
  <div class="hot-news">
    <el-table :data="tableData" :show-header="false" style="width: 100%">
      <el-table-column prop="index" label="序号" width="60"> </el-table-column>
      <el-table-column prop="text" label="标题" min-width="260">
        <template #default="{ row }">
          <img v-if="row.icon" :src="imgUrl(row.icon)" alt="" class="icon-info">
          <span @click="goLink(row.link)" class="title-info">{{ row.text }}</span>
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
    const tableData = ref([]);

    watch(() => props.newsName, (newVal, oldVal) => {
      if (newVal === oldVal) return;
      initData(newVal);
    }, {
      immediate: true
    });

    function initData(name) {
      console.log('ʕ̡̢̡ʘ̅͟͜͡ʘ̲̅ʔ̢̡̢🚀 ~ initData ~ name:', name);
      fetch(`http://localhost:3000/hotList?name=${encodeURIComponent(name)}`)
        .then(response => response.json())
        .then(data => {
          if (!data.length) return;
          tableData.value = data.filter(item => item.hotValue.trim() !== '');
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
      timerId = setInterval(() => {
        initData(props.newsName);
      }, 30000);
    });

    // 在组件销毁时清空定时器
    onUnmounted(() => {
      clearInterval(timerId);
    });

    return {
      tableData,
      goLink,
      imgUrl
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.icon-info {
  height: 14px;
  width: 14px;
  margin-right: 8px;
}
.title-info:hover {
  color: #E6A23C;
}
.title-info {
  cursor: pointer;
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
