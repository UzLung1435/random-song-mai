<template>
  <div class="settings-page">
    <div class="m3-surface section-card">
      <div class="section-title">比赛配置</div>

      <div class="setting-row">
        <div class="label-group">
          <mdui-icon name="people"></mdui-icon>
          <span>玩家人数</span>
        </div>
        <div class="number-stepper">
          <mdui-button-icon icon="remove" @click="adjustPlayerCount(-1)"></mdui-button-icon>
          <mdui-text-field
            type="number"
            v-model.number="matchStore.settings.playerCount"
            class="compact-input"
            text-align="center"
            @change="syncPlayerNames"
          ></mdui-text-field>
          <mdui-button-icon icon="add" @click="adjustPlayerCount(1)"></mdui-button-icon>
        </div>
      </div>

      <div class="setting-row">
        <div class="label-group">
          <mdui-icon name="queue_music"></mdui-icon>
          <span>每场乐曲数量</span>
        </div>
        <div class="number-stepper">
          <mdui-button-icon icon="remove" @click="adjustSongCount(-1)"></mdui-button-icon>
          <mdui-text-field
            type="number"
            v-model.number="matchStore.settings.songCount"
            class="compact-input"
            text-align="center"
          ></mdui-text-field>
          <mdui-button-icon icon="add" @click="adjustSongCount(1)"></mdui-button-icon>
        </div>
      </div>
    </div>

    <div class="m3-surface section-card">
      <div class="section-title">选手名单</div>
      <div class="player-grid">
        <mdui-text-field
          v-for="i in matchStore.settings.playerCount"
          :key="i"
          v-model="matchStore.settings.playerNames[i-1]"
          :label="'选手 ' + i"
          icon="person_outline"
        ></mdui-text-field>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMatchStore } from '@/stores/match';

const matchStore = useMatchStore();

const adjustPlayerCount = (delta: number) => {
  const newVal = matchStore.settings.playerCount + delta;
  if (newVal >= 1 && newVal <= 16) {
    matchStore.settings.playerCount = newVal;
    syncPlayerNames();
  }
};

const adjustSongCount = (delta: number) => {
  const newVal = matchStore.settings.songCount + delta;
  if (newVal >= 1 && newVal <= 20) {
    matchStore.settings.songCount = newVal;
  }
};

const syncPlayerNames = () => {
  const current = matchStore.settings.playerNames;
  const count = matchStore.settings.playerCount;
  if (current.length < count) {
    for (let i = current.length; i < count; i++) {
      current.push(`玩家 ${i + 1}`);
    }
  } else if (current.length > count) {
    matchStore.settings.playerNames = current.slice(0, count);
  }
};
</script>

<style scoped>
.settings-page { max-width: 800px; margin: 0 auto; padding: 16px; display: flex; flex-direction: column; gap: 16px; }
.section-card { padding: 20px; border-radius: 24px; background: var(--mdui-color-surface-container-low); }
.section-title { font-size: 18px; font-weight: bold; margin-bottom: 20px; color: var(--mdui-color-primary); }

.setting-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.label-group { display: flex; align-items: center; gap: 12px; font-weight: 500; }

.number-stepper { display: flex; align-items: center; gap: 4px; }
.compact-input { width: 80px; --mdui-color-surface-container: transparent; }
.compact-input::part(input) { text-align: center; }

.player-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 12px; }
</style>
