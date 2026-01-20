<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
// 引入抽屉组件
import 'mdui/components/icon.js';

const props = defineProps<{
  title?: string;
  navItems: Array<{ label: string; path: string; icon: string }>;
}>();

const router = useRouter();
const route = useRoute();

// 1. 默认状态设为 false (隐藏)
const isDrawerOpen = ref(false);

const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
};

// 2. 点击导航后自动关闭抽屉
watch(() => route.path, () => {
  isDrawerOpen.value = false;
});
</script>

<template>
  <div class="m3-container">
    <mdui-top-app-bar class="custom-app-bar" scroll-behavior="elevate" scroll-target=".main-content">
      <div class="menu-btn-wrapper">
        <mdui-button-icon icon="menu" @click="toggleDrawer"></mdui-button-icon>
      </div>
      <mdui-top-app-bar-title>{{ title || '应用名称' }}</mdui-top-app-bar-title>
      <div style="flex-grow: 1"></div>
      <slot name="toolbar-actions"></slot>
    </mdui-top-app-bar>

    <mdui-navigation-drawer :open="isDrawerOpen" @close="isDrawerOpen = false" close-on-overlay-click
      class="custom-drawer acrylic_base">
      <mdui-list>
        <mdui-list-item v-for="item in navItems" :key="item.path" :active="route.path === item.path" :value="item.path"
          @click="router.push(item.path)" rounded>
          <mdui-icon slot="icon">{{ item.icon }}</mdui-icon>
          {{ item.label }}
        </mdui-list-item>
      </mdui-list>
    </mdui-navigation-drawer>

    <main class="main-content">
      <div class="content-wrapper">
        <slot></slot>
      </div>
    </main>
  </div>
</template>

<style scoped>
.m3-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  /* 修复：改为透明，否则会挡住 BackgroundPrism */
  background-color: transparent !important;
}

/* 主内容滚动容器 */
.main-content {
  flex: 1;
  overflow-y: auto;
  background-color: transparent !important;
  border-radius: 24px;
}

.content-wrapper {
  padding: 16px;
  max-width: 1000px;
  margin: 0 auto;
}

/* 抽屉样式微调，确保它符合 M3 的悬浮感 */
.custom-drawer {
  padding: 12px;
  /* 给里面的 List 一点内边距，配合 rounded 列表项 */
  --mdui-color-navigation-drawer-container: var(--mdui-color-surface-container-low);
}

.custom-drawer {
  /* 设置背景颜色为透明或半透明 */
  --mdui-color-surface-container: rgba(255, 255, 255, 0.933);
  /* 如果是深色模式，可能需要调整这个变量 */
  --mdui-color-surface: rgba(58, 58, 58, 0.6);

  /* 允许毛玻璃效果穿透 */
  background-color: transparent !important;
}


/* 顶部导航栏*/
.custom-app-bar {
  background-color: transparent !important;
  position: sticky;
  top: 0;
}

.custom-app-bar::part(container) {
  background-color: transparent !important;
}

.menu-btn-wrapper {
  /* 尺寸控制 */
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;

  /* 圆形与模糊 */
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);

  /* 避免遮挡点击事件 */
  cursor: pointer;
  transition: all 0.3s ease;
}

.menu-btn-wrapper:active {
  transform: scale(0.95);
  background-color: rgba(255, 255, 255, 0.5);
}

/* 覆盖 MDUI 内部默认背景，让它全透明以展示父级的模糊 */
.menu-btn-wrapper mdui-button-icon {
  background-color: transparent !important;
}


</style>
