<template>
  <mdui-card v-if="targetMusic && currentTypeIndex !== -1" class="chart-card">
    <div class="card-horizontal-layout">
      <div class="cover-wrapper">
        <img :src="coverUrl" class="song-cover" />
        <div :class="['type-badge', `bg-type-${currentTypeIndex}`]">
          {{ typeLabel }}
        </div>
      </div>

      <div class="content-wrapper">
        <div class="title-line">
          <span class="song-name">{{ targetMusic.info.name }}</span>
          <span class="level-val">{{ displayLevel }}</span>
        </div>

        <div class="artist-line">
          <span class="text-truncate">{{ targetMusic.info.artistName }}</span>
        </div>

        <div class="meta-grid">
          <div class="meta-item">
            <span class="label">ID</span>
            <span class="val">{{ targetMusic.musicid }}</span>
          </div>
          <div class="meta-item">
            <span class="label">Charter</span>
            <span class="val text-truncate">{{ currentCharter }}</span>
          </div>
          <div class="meta-item">
            <span class="label">BPM</span>
            <span class="val">{{ targetMusic.info.bpm }}</span>
          </div>
        </div>
      </div>
    </div>
  </mdui-card>
</template>

<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { useMusicStore } from '@/stores/music';



const props = withDefaults(defineProps<{
  chartId?: string; // "11735_4"
}>(), {
  chartId: '11455_3'
});

const musicStore = useMusicStore();

// 1. 安全的数据源获取
const allMusic = computed(() => musicStore?.allMusic || []);


watchEffect(() => console.log(musicStore))
// 2. 解析 ID 逻辑 (musicId 和 typeIndex)
const parsed = computed(() => {
  const parts = props.chartId.split('_');
  return {
    musicId: parts[0],
    typeIndex: parseInt(parts[1] || '0')
  };
});

// 3. 核心查找逻辑：从 ListView 的逻辑抽离
const targetMusic = computed(() => {
  return allMusic.value.find(m => m.musicid === parsed.value.musicId);
});

const currentTypeIndex = computed(() => parsed.value.typeIndex);

// 4. 难度标签逻辑
const typeLabel = computed(() => {
  const labels = ['Basic', 'Advance', 'Expert', 'Master', 'Re:Master'];
  return labels[currentTypeIndex.value] || '???';
});

// 5. 等级判定逻辑 (模仿 ListView 中的 checkLevel 逻辑)
const displayLevel = computed(() => {
  if (!targetMusic.value) return '';
  const info = targetMusic.value.info;
  const lv = info.levelList[currentTypeIndex.value];
  const dec = info.levelDecimalList[currentTypeIndex.value];

  // 遵循 ListView 的逻辑：小数位 >= 6 视为 "+"
  const isPlus = parseInt(dec || '0') >= 6;
  return isPlus ? `${lv}+` : lv;
});

const currentCharter = computed(() => {
  return targetMusic.value?.info.charterList[currentTypeIndex.value] || 'Unknown';
});

const coverUrl = computed(() => `/static/jacket/${targetMusic.value?.musicid}.png`);
</script>

<style scoped>
/* 保持之前的 Flex 样式即可 */
.chart-card {
  width: 100%;
  background-color: var(--mdui-color-surface-container-high);
  border-radius: 12px;
  overflow: hidden;
}
.card-horizontal-layout {
  display: flex;
  padding: 8px 12px;
  gap: 12px;
  align-items: center;
}
.cover-wrapper { position: relative; flex-shrink: 0; }
.song-cover { width: 72px; height: 72px; border-radius: 6px; display: block; object-fit: cover; }
.type-badge {
  position: absolute; bottom: 0; left: 0; right: 0;
  font-size: 9px; text-align: center; color: white;
  padding: 1px 0; border-radius: 0 0 6px 6px;
}
.content-wrapper { flex: 1; min-width: 0; }
.title-line { display: flex; justify-content: space-between; align-items: baseline; }
.song-name { font-size: 1rem; font-weight: bold; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.level-val { font-size: 1.1rem; font-weight: 900; color: var(--mdui-color-primary); font-style: italic; }
.artist-line { font-size: 0.8rem; opacity: 0.7; margin-bottom: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.meta-grid {
  display: grid; grid-template-columns: 1fr 2fr 1.2fr;
  gap: 4px; padding: 4px 8px; border-radius: 4px;
  background: var(--mdui-color-surface-container-highest);
}
.meta-item { display: flex; flex-direction: column; font-size: 10px; }
.label { opacity: 0.5; font-size: 8px; transform: scale(0.9); transform-origin: left; }
.val { font-weight: 500; }

/* 颜色配置 */
.bg-type-0 { background-color: #61d332; }
.bg-type-1 { background-color: #f1b32d; }
.bg-type-2 { background-color: #e62e3d; }
.bg-type-3 { background-color: #a42ed4; }
.bg-type-4 { background-color: #ff80df; }
</style>
