<script setup lang="ts">
import { computed } from 'vue';
import { useMusicStore } from '@/stores/music';
import type { MusicItem } from '@/types/music';

const props = defineProps<{
  item: MusicItem;
  matchedIndices: number[];
}>();

const musicStore = useMusicStore();

// ID 格式化与曲绘路径
const getFormattedId = (id: string) => (Number(id) % 10000).toString().padStart(6, '0');
const imagePath = computed(() => `/musicbg/${getFormattedId(props.item.musicid)}_s.png`);

const diffColors = ['#61d332', '#f1b32d', '#e62e3d', '#a42ed4', '#ff80df'];
</script>

<template>
  <div
    class="maimai-card"
    :class="{ 'is-selected': musicStore.isSongPartiallySelected(item.musicid) }"
    @click="musicStore.toggleFullSong(item)"
  >
    <div class="image-area">
      <img :src="imagePath" loading="lazy" />
      <div class="overlay" v-if="musicStore.isSongPartiallySelected(item.musicid)">
        <!-- <mdui-icon name="library_add_check"></mdui-icon> -->
      </div>
    </div>

    <div class="diff-row">
      <div
        v-for="(lv, idx) in item.info.levelList"
        :key="idx"
        v-show="lv !== '-'"
        class="diff-dot"
        :class="{
          'is-matched': matchedIndices.includes(idx),
          'is-active': musicStore.isChartSelected(item.musicid, idx)
        }"
        :style="{ '--color': diffColors[idx] }"
        @click.stop="musicStore.toggleChart(item.musicid, idx)"
      >
        {{ lv }}
      </div>
    </div>

    <div class="title-area">
      <div class="title">{{ item.info.name }}</div>
    </div>
  </div>
</template>

<style scoped>
.maimai-card {
  background: var(--mdui-color-surface-container-highest);
  border-radius: 12px; overflow: hidden; position: relative; cursor: pointer;
  transition: transform 0.2s; border: 2px solid transparent;
}
.maimai-card.is-selected { border-color: var(--mdui-color-primary); transform: scale(0.98); }

.image-area { width: 100%; aspect-ratio: 1/1; position: relative; }
.image-area img { width: 100%; height: 100%; object-fit: cover; }
.overlay { position: absolute; inset: 0; background: rgba(var(--mdui-color-primary-rgb), 0.3); display: flex; align-items: center; justify-content: center; color: white; }

.diff-row { display: flex; padding: 4px; gap: 4px; background: rgba(0,0,0,0.05); }
.diff-dot {
  flex: 1; font-size: 10px; font-weight: bold; text-align: center; border-radius: 4px;
  padding: 2px 0; opacity: 0.2; background: #ccc; transition: all 0.2s;
}
/* 匹配到筛选条件的样式 */
.diff-dot.is-matched { opacity: 0.7; background: var(--color); color: white; }
/* 选中的样式 */
.diff-dot.is-active { opacity: 1; background: var(--color); color: white; box-shadow: 0 0 5px var(--color); border: 1px solid white; }

.title-area { padding: 8px; }
.title { font-size: 12px; font-weight: bold; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
</style>
