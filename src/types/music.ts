export interface MusicInfo {
  name: string;
  artistName: string;
  bpm: string;
  addVersion: string;
  // 数组长度通常固定为 5 (Bas, Adv, Exp, Mas, Rem)
  levelList: string[];         // 例如 ["7", "9", "12", "13+", "-"]
  levelDecimalList: string[];  // 例如 ["0", "7", "2", "7", "0"]
  noteDesignerList: string[];  // 对应难度的谱师名
}

export interface MusicItem {
  musicid: string;
  info: MusicInfo;
  // 扩展属性：由 MusicListView 计算得出
  matchedIndices?: number[];
}

export function getDefaultMusicItem(): MusicItem {
  return {
    musicid: '0',
    info: {
      name: 'Dummy',
      artistName: '',
      bpm: '099',
      addVersion: 'Dummy',
      levelList: ['1', '2', '3', '4', '5'],
      levelDecimalList: ['0', '0', '0', '0', '0'],
      noteDesignerList: ['Dummy1', 'Dummy2', 'Dummy3', 'Dummy4', 'Dummy5'],
    },
  };
}
