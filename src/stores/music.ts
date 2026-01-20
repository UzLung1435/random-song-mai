import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { MusicItem } from '@/types/music';

export const useMusicStore = defineStore('music', () => {
  const selectedCharts = ref<string[]>([]); // 格式: "musicid_index"

  // 1. 切换单个谱面
  const toggleChart = (musicid: string, index: number) => {
    const key = `${musicid}_${index}`;
    const i = selectedCharts.value.indexOf(key);
    if (i > -1) {
      selectedCharts.value.splice(i, 1);
    } else {
      selectedCharts.value.push(key);
    }
  };

  // 2. 切换整首歌的所有谱面 (点击曲绘时调用)
  const toggleFullSong = (item: MusicItem) => {
    // 获取该歌曲现有的所有有效谱面 Key (排除 level 为 '-' 的)
    const allKeys = item.info.levelList
      .map((lv, idx) => lv !== '-' ? `${item.musicid}_${idx}` : null)
      .filter(k => k !== null) as string[];

    // 检查是否已经全部选中
    const isAllSelected = allKeys.every(k => selectedCharts.value.includes(k));

    if (isAllSelected) {
      // 如果已全选，则清空该歌曲的所有选中
      selectedCharts.value = selectedCharts.value.filter(k => !allKeys.includes(k));
    } else {
      // 否则，补齐未选中的谱面
      allKeys.forEach(k => {
        if (!selectedCharts.value.includes(k)) selectedCharts.value.push(k);
      });
    }
  };

  const isChartSelected = (musicid: string, index: number) =>
    selectedCharts.value.includes(`${musicid}_${index}`);

  const isSongPartiallySelected = (musicid: string) =>
    selectedCharts.value.some(k => k.startsWith(`${musicid}_`));

  const clearAll = () => selectedCharts.value = [];

  return {
    selectedCharts, toggleChart, toggleFullSong,
    isChartSelected, isSongPartiallySelected, clearAll
  };
});
