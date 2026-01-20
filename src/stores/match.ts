import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useMatchStore = defineStore('match', () => {
  // 1. 定义默认结构
  const defaultSettings = {
    playerCount: 4,
    songCount: 3,
    playerNames: ['玩家 1', '玩家 2', '玩家 3', '玩家 4'],
    currentMatchSongs: [] as any[],
    drawnIndices: [] as number[],
    matchHistory: []as Array<{ songId: string, songName: string, scores: number[] }>,
  };

  const settings = ref({ ...defaultSettings });

  // 2. 安全加载：合并默认值与本地存储
  const savedSettings = localStorage.getItem('match_settings');
  if (savedSettings) {
    try {
      const parsed = JSON.parse(savedSettings);
      // 使用扩展运算符确保所有字段都存在，即便本地存储是旧版本的
      settings.value = { ...defaultSettings, ...parsed };
    } catch (e) {
      console.error("解析本地配置失败:", e);
    }
  }

  watch(settings, (val) => {
    localStorage.setItem('match_settings', JSON.stringify(val));
  }, { deep: true });

  // 3. 计分板：初始长度应与 playerCount 挂钩
  const scores = ref(Array(settings.value.playerCount).fill(0));

  const resetMatch = () => {
    settings.value.drawnIndices = [];
    settings.value.matchHistory = [];
    // 重置分数
    scores.value = Array(settings.value.playerCount).fill(0);
  };

  const customPool = ref<any[]>([]);

  return { settings, scores, resetMatch, customPool };
});
