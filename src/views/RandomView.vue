<template>
  <div class="match-container">
    <div class="match-header m3-surface">
      <div class="header-actions">
        <mdui-button variant="tonal" @click="triggerFile">导入曲库</mdui-button>
        <mdui-button variant="text" @click="handleReset">重置</mdui-button>
      </div>

      <div class="track-info" v-if="matchStore.customPool?.length">
        <span class="label">TRACK</span>
        <span class="current">{{ matchStore.settings.drawnIndices?.length || 0 }}</span>
        <span class="total">曲库共{{ matchStore.customPool.length }}</span>
      </div>

      <mdui-button variant="filled" color-scheme="primary" :disabled="!currentSong"
        @click="saveCurrentRound">保存本轮分数</mdui-button>
    </div>

    <div class="match-main">
      <div class="players-side">
        <div v-for="i in leftPlayers" :key="i" class="player-card m3-surface">
          <div class="p-name">{{ matchStore.settings.playerNames[i] }}</div>
          <mdui-text-field type="number" v-model.number="matchStore.scores[i]" step="0.0001" min="0" max="101.0000"
            suffix="%" label="达成率" variant="outlined"></mdui-text-field>
        </div>
      </div>

      <div class="draw-stage" @click="drawNextSong">
        <transition name="scale-fade" mode="out-in">
          <div v-if="currentSong" :key="currentSong.musicid" class="card-focus">
            <MusicCard :item="currentSong" :matched-indices="currentChartDiff" class="match-card-large" />
          </div>
          <div v-else class="draw-prompt m3-surface">
            <mdui-icon name="casino"></mdui-icon>
            <p>点击此处抽取曲目</p>
          </div>
        </transition>
      </div>

      <div class="players-side">
        <div v-for="i in rightPlayers" :key="i" class="player-card m3-surface">
          <div class="p-name">{{ matchStore.settings.playerNames[i] }}</div>
          <mdui-text-field type="number" v-model.number="matchStore.scores[i]" step="0.0001" min="0" max="101.0000"
            suffix="%" label="达成率" variant="outlined"></mdui-text-field>
        </div>
      </div>
    </div>

    <input type="file" ref="fileInput" hidden @change="handleFile" accept=".json" />
  </div>
  <div class="history-table-container m3-surface" v-if="matchStore.settings.matchHistory?.length">
    <div class="table-header">
      <mdui-icon name="history"></mdui-icon>
      <span>比赛成绩记录</span>
    </div>

    <div class="table-scroll-wrapper">
      <table class="match-results-table">
        <thead>
          <tr>
            <th></th>
            <th>总计</th>
            <th v-for="(name, idx) in matchStore.settings.playerNames" :key="'total-' + idx" class="total-score-cell">
              <div class="total-value">{{ calculateTotal(idx) }}%</div>
              <div class="rank-badge" v-if="getRank(idx) > 0">#{{ getRank(idx) }}</div>
            </th>
          </tr>
          <tr>
            <th>轮次</th>
            <th>曲目信息</th>
            <th v-for="(name, idx) in matchStore.settings.playerNames" :key="idx">
              {{ name }}
            </th>
          </tr>

        </thead>
        <tbody>
          <tr v-for="(record, rIdx) in matchStore.settings.matchHistory" :key="rIdx">
            <td class="round-col">{{ rIdx + 1 }}</td>
            <td class="song-col">
              <div class="song-cell">
                <img :src="getCoverUrl(record.songId)" class="tiny-cover" />
                <div class="song-text">
                  <div class="s-name">{{ record.songName }}</div>
                </div>
              </div>
            </td>
            <td v-for="(score, pIdx) in record.scores" :key="pIdx" class="score-col">
              <span :class="getScoreClass(record.scores, score)">
                {{ typeof score === 'number' ? score.toFixed(4) : '0.0000' }}%
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useMatchStore } from '@/stores/match';
import MusicCard from '@/components/MusicCard.vue';

const matchStore = useMatchStore();
const allMusic = ref<any[]>([]);
const fileInput = ref();
const triggerFile = () => fileInput.value.click();

onMounted(async () => {
  const res = await fetch('/music_info.json');
  allMusic.value = await res.json();
});

// 计算当前曲目的难度索引
const currentChartDiff = computed(() => {
  // 1. 使用可选链检查 settings 和 drawnIndices 是否存在
  const drawn = matchStore.settings?.drawnIndices;
  if (!drawn || drawn.length === 0) return [];

  // 2. 获取最后一个索引
  const lastIndex = drawn[drawn.length - 1];
  if (lastIndex === undefined) return [];

  // 3. 检查 pool 是否存在且包含该索引
  const pool = matchStore.customPool;
  if (!pool || !pool[lastIndex]) return [];

  const rawData = pool[lastIndex];

  // 4. 解析难度
  return typeof rawData === 'string'
    ? [parseInt(rawData.split('_')[1] || '0')]
    : rawData.info.levelList.map((lv: string, idx: number) => lv !== '-' ? idx : -1).filter((idx: number) => idx !== -1);
});

// 分配左右玩家列表 (根据 playerCount 动态分配)
const leftPlayers = computed(() => {
  const count = matchStore.settings.playerCount;
  return Array.from({ length: Math.ceil(count / 2) }, (_, i) => i);
});
const rightPlayers = computed(() => {
  const count = matchStore.settings.playerCount;
  const leftCount = Math.ceil(count / 2);
  return Array.from({ length: count - leftCount }, (_, i) => i + leftCount);
});

const getScoreClass = (allScores: number[], currentScore: number) => {
  if (!allScores || allScores.length === 0) return 'normal-score';

  // 找出本轮最高分
  const max = Math.max(...allScores);

  // 如果当前分等于最高分且不为0，返回 winner-score 类名
  return currentScore === max && max > 0 ? 'winner-score' : 'normal-score';
};


const getCoverUrl = (musicid: string) => {
  if (!musicid) return '';
  const id = (Number(musicid) % 10000).toString().padStart(6, '0');
  return `/musicbg/${id}_s.png`;
};

const numberToArray = (num: number) => Array.from({ length: num }, (_, i) => i);

// 当前展示的歌曲
const currentSong = computed(() => {
  // 1. 使用可选链检查 settings 和 drawnIndices 是否存在
  const drawn = matchStore.settings?.drawnIndices;
  if (!drawn || drawn.length === 0) return null;

  // 2. 获取最后一个索引
  const lastIndex = drawn[drawn.length - 1];
  if (lastIndex === undefined) return null;

  // 3. 检查 pool 是否存在且包含该索引
  const pool = matchStore.customPool;
  if (!pool || !pool[lastIndex]) return null;

  const rawData = pool[lastIndex];

  // 4. 解析 musicId
  const musicId = typeof rawData === 'string'
    ? rawData.split('_')[0]
    : rawData.musicid;

  // 5. 从全量库中查找并返回对象
  return allMusic.value.find(m => m.musicid === musicId) || null;
});

const handleReset = () => {
  if (confirm('确定要重置所有分数和抽选记录吗？')) {
    matchStore.resetMatch();
  }
};

const handleFile = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const data = JSON.parse(event.target?.result as string);
      // 兼容 MusicListView 导出的格式
      const pool = data.selectedCharts || (Array.isArray(data) ? data : []);

      if (pool.length > 0) {
        matchStore.customPool = pool;
        alert(`成功加载曲库：${pool.length} 首歌曲`);
      }
    } catch (err) {
      alert('JSON 格式错误');
    }
  };
  reader.readAsText(file);
};

// 结算本轮
const saveCurrentRound = () => {
  if (!currentSong.value) return;

  // 记录历史
  matchStore.settings.matchHistory.push({
    songId: currentSong.value.musicid,
    songName: currentSong.value.info.name,
    scores: [...matchStore.scores]
  });

  // 结算后，我们将 drawnIndices 的最后一个锁定（实际上抽选时已经锁定了）
  // 只要 drawnIndices 里有这个索引，drawNextSong 的 while 循环就会跳过它
  alert('本轮得分已存档，该曲目已移出奖池');

  // 重置分数框为 0
  matchStore.scores = Array(matchStore.settings.playerCount).fill(0);
};

// 抽选逻辑（保持不重复）
const drawNextSong = () => {
  const pool = matchStore.customPool || [];
  const drawn = matchStore.settings.drawnIndices || [];

  if (pool.length === 0) return alert('请先导入曲库');
  if (drawn.length >= pool.length) return alert('曲库已抽完');
  alert('确定抽选吗？');
  let nextIdx: number;
  do {
    nextIdx = Math.floor(Math.random() * pool.length);
  } while (drawn.includes(nextIdx));

  // 这里的 push 绝不会报错，因为上面 Store 保证了 drawnIndices 是数组
  matchStore.settings.drawnIndices.push(nextIdx);
};

// 计算某位选手的总得分（达成率累加）
const calculateTotal = (playerIdx: number) => {
  const history = matchStore.settings.matchHistory || [];
  if (history.length === 0) return "0.0000";

  const sum = history.reduce((acc, record) => {
    const score = record.scores[playerIdx] || 0;
    return acc + score;
  }, 0);

  return sum.toFixed(4);
};

// 计算排名
const getRank = (playerIdx: number): number => {
  const history = matchStore.settings.matchHistory || [];
  if (history.length === 0) return 0;

  // 1. 明确声明类型为 number[]，并处理可能存在的 undefined
  const allTotals: number[] = matchStore.settings.playerNames.map((_, idx) => {
    return history.reduce((acc, rec) => {
      // 使用 ?? 确保如果 score 是 undefined 则取 0
      const score = rec.scores[idx] ?? 0;
      return acc + score;
    }, 0);
  });

  // 2. 排序并计算排名
  const sorted = [...allTotals].sort((a, b) => b - a);
  // indexOf 可能会返回 -1，加 1 后变为 0（代表未找到，虽然理论上不会发生）
  return sorted.indexOf(allTotals[playerIdx] ?? 0) + 1;
};

</script>
<style scoped>
/* 容器基础布局 */
.match-container {
  min-height: auto;
  display: flex;
  flex-direction: column;
  padding: 24px;
  background: var(--mdui-color-background);
  color: var(--mdui-color-on-background);
  gap: 24px;
}

/* 顶部工具栏 - 玻璃拟态效果 */
.match-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  border-radius: 24px;
  background: var(--mdui-color-surface-container-low);
  border: 1px solid var(--mdui-color-outline-variant);
  box-shadow: var(--mdui-shadow-1);
}

.header-actions {
  display: flex;
  gap: 12px;
}

/* TRACK 计数器美化 */
.track-info {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 4px 24px;
  background: var(--mdui-color-surface-container-highest);
  border-radius: 40px;
}

.track-info .label {
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 2px;
  opacity: 0.7;
}

.track-info .current {
  font-size: 36px;
  font-weight: 900;
  font-family: 'Roboto Mono', monospace;
  color: var(--mdui-color-primary);
  text-shadow: 0 0 12px var(--mdui-color-primary-container);
}

.track-info .total {
  font-size: 18px;
  opacity: 0.5;
  font-family: 'Roboto Mono', monospace;
}

/* 比赛核心区域 */
.match-main {
  display: grid;
  grid-template-columns: 280px 1fr 280px;
  gap: 40px;
  align-items: start;
  /* 顶部对齐防止由于卡片高度不一产生的跳动 */
}

/* 选手卡片美化 */
.players-side {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.player-card {
  padding: 20px;
  border-radius: 24px;
  background: var(--mdui-color-surface-container);
  border: 1px solid transparent;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.player-card:focus-within {
  border-color: var(--mdui-color-primary);
  background: var(--mdui-color-surface-container-high);
  transform: translateY(-4px);
  box-shadow: var(--mdui-shadow-2);
}

.p-name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 12px;
  color: var(--mdui-color-on-surface-variant);
}

/* 中间抽选区：增加仪式感 */
.draw-stage {
  cursor: pointer;
  display: flex;
  justify-content: center;
  position: relative;
  transition: transform 0.2s ease;
}

.draw-stage:active {
  transform: scale(0.98);
}

.draw-prompt {
  width: 100%;
  max-width: 400px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  border-radius: 32px;
  border: 3px dashed var(--mdui-color-outline-variant);
  background: var(--mdui-color-surface-container-low);
  transition: all 0.3s;
}

.draw-prompt:hover {
  background: var(--mdui-color-secondary-container);
  border-color: var(--mdui-color-secondary);
  color: var(--mdui-color-on-secondary-container);
}

.draw-prompt mdui-icon {
  font-size: 64px;
}

/* MusicCard 容器与标签 */
.card-focus {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.round-tag {
  background: var(--mdui-color-primary);
  color: var(--mdui-color-on-primary);
  padding: 6px 24px;
  border-radius: 12px;
  font-weight: 900;
  font-size: 18px;
  margin-bottom: -12px;
  /* 压在卡片上方 */
  z-index: 2;
  box-shadow: var(--mdui-shadow-3);
  letter-spacing: 1px;
}

.match-card-large :deep(.maimai-card) {
  width: 100% !important;
  max-width: 400px;
  height: 520px !important;
  border-radius: 28px !important;
  box-shadow: var(--mdui-shadow-4);
  background: var(--mdui-color-surface-container-highest) !important;
  pointer-events: none;
}

/* 历史成绩表格美化 */
.history-table-container {
  margin-top: 12px;
  padding: 24px;
  border-radius: 28px;
  background: var(--mdui-color-surface-container-low);
  border: 1px solid var(--mdui-color-outline-variant);
}

.table-header {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}

.match-results-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 8px;
  /* 行间距 */
}

.match-results-table th {
  padding: 12px 16px;
  text-align: left;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--mdui-color-on-surface-variant);
  opacity: 0.8;
}

.match-results-table tbody tr {
  background: var(--mdui-color-surface-container-high);
  transition: transform 0.2s;
}

.match-results-table tbody tr:hover {
  transform: scale(1.005);
  background: var(--mdui-color-surface-container-highest);
}

.match-results-table td {
  padding: 12px 16px;
}

.match-results-table td:first-child {
  border-radius: 12px 0 0 12px;
}

.match-results-table td:last-child {
  border-radius: 0 12px 12px 0;
}

.round-col {
  font-weight: 900;
  color: var(--mdui-color-primary);
  font-family: 'Roboto Mono', monospace;
}

.song-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.tiny-cover {
  width: 44px;
  height: 44px;
  border-radius: 8px;
  box-shadow: var(--mdui-shadow-1);
}

.s-name {
  font-weight: bold;
  font-size: 14px;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.score-col {
  font-family: 'Roboto Mono', 'Courier New', monospace;
  /* 等宽字体对齐小数点 */
  font-size: 15px;
  min-width: 110px;
  text-align: right;
  /* 右对齐更易比较大小 */
  padding-right: 24px !important;
}

.winner-score {
  color: var(--mdui-color-primary);
  font-weight: bold;
  position: relative;
}

.winner-score::after {
  content: '★';
  position: absolute;
  top: -6px;
  right: -14px;
  font-size: 10px;
  color: var(--mdui-color-primary);
}

.normal-score {
  opacity: 0.8;
}

/* 动画效果 */
.scale-fade-enter-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.scale-fade-enter-from {
  opacity: 0;
  transform: scale(0.8) translateY(20px);
}
</style>
