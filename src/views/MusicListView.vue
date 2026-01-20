<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useMusicStore } from '@/stores/music';
import MusicCard from '@/components/MusicCard.vue';
import { useElementSize, useDebounceFn } from '@vueuse/core';
import type { MusicItem } from '@/types/music';

const musicStore = useMusicStore();
const scrollerRef = ref<HTMLElement | null>(null);
const { width: containerWidth } = useElementSize(scrollerRef);

// 布局常量
const CARD_MIN_WIDTH = 180;
const CARD_HEIGHT = 320;
const CARD_GAP = 16;

const gridConfig = computed(() => {
  const w = containerWidth.value > 0 ? containerWidth.value : window.innerWidth;
  const availableWidth = w - 60;
  const columns = Math.max(1, Math.floor((availableWidth + CARD_GAP) / (CARD_MIN_WIDTH + CARD_GAP)));
  const columnWidth = (availableWidth - (columns - 1) * CARD_GAP) / columns;
  return { columns, columnWidth, gap: CARD_GAP };
});

// 数据与筛选状态
const allMusic = ref<MusicItem[]>([]);
const searchQuery = ref('');
const selectedTypes = ref<string[]>(['Standard', 'DX', 'Utage']);
const selectedGrades = ref<number[]>([]);
const selectedLevels = ref<string[]>([]);
const selectedVersions = ref<string[]>([]);

const expandedPanels = ref<Record<string, boolean>>({
  type: true, grade: true, level: false, version: false
});

const levels = ['1', '2', '3', '4', '5', '6', '7', '7+', '8', '8+', '9', '9+', '10', '10+', '11', '11+', '12', '12+', '13', '13+', '14', '14+', '15'];
const diffGrades = [
  { label: 'Basic', color: '#61d332', value: 0 },
  { label: 'Advance', color: '#f1b32d', value: 1 },
  { label: 'Expert', color: '#e62e3d', value: 2 },
  { label: 'Master', color: '#a42ed4', value: 3 },
  { label: 'Re:Master', color: '#ff80df', value: 4 },
];

const fileInput = ref<HTMLInputElement | null>(null);

onMounted(async () => {
  const res = await fetch('/music_info.json');
  allMusic.value = await res.json();
  // 初始默认全选版本
  selectedVersions.value = [...new Set(allMusic.value.map(m => m.info.addVersion))];
});

const versions = computed(() => [...new Set(allMusic.value.map(m => m.info.addVersion))]);

// 核心过滤逻辑
const filteredMusic = computed(() => {
  const query = searchQuery.value.toLowerCase();
  const isSpecificFilterActive = selectedGrades.value.length > 0 || selectedLevels.value.length > 0;

  const checkLevel = (lv: string, dec: string) => {
    if (selectedLevels.value.length === 0) return true;
    return selectedLevels.value.some(s => {
      const isPlus = s.includes('+');
      const base = s.replace('+', '');
      const d = parseInt(dec || "0");
      if (isPlus) return lv === base && d >= 6;
      return lv === base && d < 6;
    });
  };

  return allMusic.value.reduce((acc: any[], item) => {
    const { info, musicid: id } = item;

    // 基础过滤
    if (query && ![id, info.name, info.artistName].some(s => s.toLowerCase().includes(query))) return acc;
    if (selectedVersions.value.length > 0 && !selectedVersions.value.includes(info.addVersion)) return acc;

    const type = id.length < 5 ? 'Standard' : (id.length === 5 ? 'DX' : 'Utage');
    if (!selectedTypes.value.includes(type)) return acc;

    // 谱面匹配
    const matchedIndices: number[] = [];
    info.levelList.forEach((lv, idx) => {
      if (!lv || lv === '-') return;
      if (!isSpecificFilterActive) {
        matchedIndices.push(idx);
      } else {
        const gMatch = selectedGrades.value.length === 0 || selectedGrades.value.includes(idx);
        const lMatch = selectedLevels.value.length === 0 || checkLevel(lv, info.levelDecimalList[idx]);
        if (gMatch && lMatch) matchedIndices.push(idx);
      }
    });

    if (matchedIndices.length > 0) acc.push({ ...item, matchedIndices });
    return acc;
  }, []);
});

const toggleItem = (list: any[], val: any) => {
  const i = list.indexOf(val);
  if (i > -1) {
    list.splice(i, 1);
  } else {
    list.push(val);
  }
};

const handleSave = () => {
  // 示例：保存到本地存储，或者你可以调用 API
  localStorage.setItem('maimai_selected_charts', JSON.stringify(musicStore.selectedCharts));
  alert('选中内容已保存到本地存储');
};

// --- 导出功能 ---
const exportConfig = () => {
  const data = {
    version: '1.0',
    selectedCharts: musicStore.selectedCharts,
    exportTime: new Date().toISOString()
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `maimai_config_${new Date().getTime()}.json`;
  link.click();
  URL.revokeObjectURL(url);
};

// --- 导入功能 ---
const triggerImport = () => {
  fileInput.value?.click();
};

const importConfig = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (!input.files || input.files.length === 0) return;

  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const json = JSON.parse(e.target?.result as string);
      if (json.selectedCharts && Array.isArray(json.selectedCharts)) {
        // 更新 store 中的选中列表
        musicStore.selectedCharts = json.selectedCharts;
        alert('配置导入成功！');
      }
    } catch (err) {
      alert('无效的 JSON 文件');
    }
  };
  reader.readAsText(file);
  input.value = ''; // 重置 input 以便下次触发
};
</script>

<template>
  <div class="music-page">
    <div class="filter-panel m3-surface">
      <mdui-text-field v-model="searchQuery" label="搜索曲名/ID" icon="search" clearable></mdui-text-field>

      <div class="collapsible-filters">
        <div class="collapsible-section">
          <div class="section-header" @click="expandedPanels.version = !expandedPanels.version">
            <span>版本分类 ({{ selectedVersions.length }})</span>
            <mdui-icon :name="expandedPanels.version ? 'expand_less' : 'expand_more'"></mdui-icon>
          </div>
          <div v-show="expandedPanels.version" class="section-content">
            <div class="wrap-chips compact">
              <mdui-chip v-for="v in versions" :key="v" :selected="selectedVersions.includes(v)"
                @click="toggleItem(selectedVersions, v)">{{ v }}</mdui-chip>
            </div>
          </div>
        </div>

        <div class="collapsible-section">
          <div class="section-header" @click="expandedPanels.level = !expandedPanels.level">
            <span>等级与难度筛选</span>
            <mdui-icon :name="expandedPanels.level ? 'expand_less' : 'expand_more'"></mdui-icon>
          </div>
          <div v-show="expandedPanels.level" class="section-content">
            <div class="wrap-chips" style="margin-bottom: 12px;">
              <mdui-chip v-for="g in diffGrades" :key="g.value" :selected="selectedGrades.includes(g.value)"
                @click="toggleItem(selectedGrades, g.value)">{{ g.label }}</mdui-chip>
            </div>
            <div class="wrap-chips compact">
              <mdui-chip v-for="l in levels" :key="l" :selected="selectedLevels.includes(l)"
                @click="toggleItem(selectedLevels, l)">{{ l }}</mdui-chip>
            </div>
          </div>
        </div>
        <div class="action-bar" v-if="musicStore.selectedCharts.length > 0 || allMusic.length > 0">
          <div class="selection-info">
            <span>已选中 <b>{{ musicStore.selectedCharts.length }}</b> 个谱面</span>
            <mdui-button variant="text" @click="musicStore.clearAll" size="sm">清空</mdui-button>
          </div>

          <div class="button-group">
            <mdui-button variant="filled" icon="save" @click="handleSave">保存</mdui-button>

            <mdui-button variant="tonal" icon="file_download" @click="exportConfig">导出</mdui-button>
            <mdui-button variant="tonal" icon="file_upload" @click="triggerImport">导入</mdui-button>
            <input type="file" ref="fileInput" style="display: none" accept=".json" @change="importConfig" />
          </div>
        </div>
      </div>
    </div>

    <div class="scroller-container" ref="scrollerRef">
      <RecycleScroller class="music-scroller" :items="filteredMusic" :item-size="CARD_HEIGHT + CARD_GAP"
        :grid-items="gridConfig.columns" :item-secondary-size="gridConfig.columnWidth" key-field="musicid"
        v-slot="{ item }">
        <div class="card-wrapper" :style="{ width: `${gridConfig.columnWidth}px`, padding: `${CARD_GAP / 2}px` }">
          <MusicCard :item="item" :matched-indices="item.matchedIndices" />
        </div>
      </RecycleScroller>
    </div>
  </div>

</template>

<style scoped>
.music-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.m3-surface {
  margin: 16px;
  padding: 16px;
  border-radius: 20px;
  background: var(--mdui-color-surface-container-low);
}

.collapsible-filters {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.collapsible-section {
  background: var(--mdui-color-surface-container-highest);
  border-radius: 12px;
  overflow: hidden;
}

.section-header {
  padding: 10px 16px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  font-weight: bold;
}

.section-content {
  padding: 12px;
  border-top: 1px solid var(--mdui-color-outline-variant);
}

.wrap-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.compact {
  max-height: 120px;
  overflow-y: auto;
}

.scroller-container {
  flex: 1;
  /* 自动撑满剩余的所有空间 */
  min-height: 0;
  /* 极其重要！在 Flex 布局中，这允许容器尺寸小于内容 */
  margin: 0 16px;
  position: relative;
}

.music-scroller {
  height: 100% !important;
  /* 强制填满 scroller-container */
  width: 100%;
}

/* 2. 筛选面板：自然高度，如果太长则允许内部微调，但不挤占滚动区 */
.filter-panel {
  flex-shrink: 0;
  margin: 16px;
  padding: 16px;
  background: var(--mdui-color-surface-container-low);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* 操作栏样式 */
.action-bar {
  margin-top: 8px;
  padding-top: 12px;
  border-top: 1px solid var(--mdui-color-outline-variant);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.selection-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.button-group {
  display: flex;
  gap: 8px;
}


</style>
