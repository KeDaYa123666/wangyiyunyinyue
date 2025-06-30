import type { IRootState } from '@/store'
import { ILyric, parseLyric } from '@/utils/parse-lyric'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getSongDetail, getSongLyric } from '../service/player'

interface IThunkState {
  state: IRootState
}
export const fetchCurrentSongAction = createAsyncThunk<
  void,
  number,
  IThunkState
>('currentSong', (id: number, { dispatch, getState }) => {
  // 准备播放某一首歌曲时, 分成两种情况
  // 1.从列表尝试是否可以获取到这首歌
  const playSongList = getState().player.playSongList
  const findIndex = playSongList.findIndex((item) => item.id === id)
  if (findIndex === -1) {
    // 没有找到相同的
    // 1.获取歌曲信息
    getSongDetail(id).then((res) => {
      // 1.获取song
      if (!res.songs.length) return
      const song = res.songs[0]

      // 2.将song放到currentSong中
      const newPlaySongList = [...playSongList]
      newPlaySongList.push(song)
      dispatch(changeCurrentSongAction(song))
      dispatch(changePlaySongListAction(newPlaySongList))
      dispatch(changePlaySongIndexAction(newPlaySongList.length - 1))
    })
  } else {
    // 找到了相同的item
    const song = playSongList[findIndex]
    dispatch(changeCurrentSongAction(song))
    dispatch(changePlaySongIndexAction(findIndex))
  }

  // 2.获取歌词数据
  getSongLyric(id).then((res) => {
    // 1.获取歌词的字符串
    const lyricString = res.lrc.lyric
    // 2.对歌词进行解析(一个个对象)
    const lyrics = parseLyric(lyricString)
    // 3.将歌词放到state中
    dispatch(changeLyricsAction(lyrics))
  })
})

export const changeMusicAction = createAsyncThunk<void, boolean, IThunkState>(
  'changemuisc',
  (isNext, { dispatch, getState }) => {
    // 1.获取state中的数据
    const player = getState().player
    const playMode = player.playMode
    const songIndex = player.playSongIndex
    const songList = player.playSongList

    // 2.根据不同的模式计算不同的下一首歌曲的索引
    let newIndex = songIndex
    if (playMode === 1) {
      // 随机播放
      newIndex = Math.floor(Math.random() * songList.length)
    } else {
      // 单曲顺序和顺序播放
      newIndex = isNext ? songIndex + 1 : songIndex - 1
      if (newIndex > songList.length - 1) newIndex = 0
      if (newIndex < 0) newIndex = songList.length - 1
    }

    // 3.获取当前的歌曲
    const song = songList[newIndex]
    dispatch(changeCurrentSongAction(song))
    dispatch(changePlaySongIndexAction(newIndex))

    // 4.请求新的歌词
    getSongLyric(song.id).then((res) => {
      // 1.获取歌词的字符串
      const lyricString = res.lrc.lyric
      // 2.对歌词进行解析(一个个对象)
      const lyrics = parseLyric(lyricString)
      // 3.将歌词放到state中
      dispatch(changeLyricsAction(lyrics))
    })
  }
)

interface IPlayerState {
  currentSong: any
  lyrics: ILyric[]
  lyricIndex: number
  playSongList: any[]
  playSongIndex: number
  playMode: number
}
const initialState: IPlayerState = {
  currentSong: {
    name: 'SWERVE SWERVE (中环)',
    mainTitle: 'SWERVE SWERVE ',
    additionalTitle: '(中环)',
    id: 2717625844,
    pst: 0,
    t: 0,
    ar: [
      {
        id: 33072389,
        name: 'Dove鸽子',
        tns: [],
        alias: []
      },
      {
        id: 12914544,
        name: '马伯骞Victor Ma',
        tns: [],
        alias: []
      }
    ],
    alia: [],
    pop: 100,
    st: 0,
    rt: '',
    fee: 8,
    v: 38,
    crbt: null,
    cf: '',
    al: {
      id: 275833877,
      name: 'DOV3',
      picUrl:
        'https://p2.music.126.net/1qHZshgRFKhgl82P_fb9jw==/109951171336993202.jpg',
      tns: [],
      pic_str: '109951171336993202',
      pic: 109951171336993200
    },
    dt: 172444,
    h: {
      br: 320000,
      fid: 0,
      size: 6900525,
      vd: -57079,
      sr: 48000
    },
    m: {
      br: 192000,
      fid: 0,
      size: 4140333,
      vd: -54531,
      sr: 48000
    },
    l: {
      br: 128000,
      fid: 0,
      size: 2760237,
      vd: -53076,
      sr: 48000
    },
    sq: {
      br: 943377,
      fid: 0,
      size: 20338215,
      vd: -57054,
      sr: 48000
    },
    hr: {
      br: 1711494,
      fid: 0,
      size: 36895403,
      vd: -57054,
      sr: 48000
    },
    a: null,
    cd: '01',
    no: 3,
    rtUrl: null,
    ftype: 0,
    rtUrls: [],
    djId: 0,
    copyright: 1,
    s_id: 0,
    mark: 536879104,
    originCoverType: 0,
    originSongSimpleData: null,
    tagPicList: null,
    resourceState: true,
    version: 4,
    songJumpInfo: null,
    entertainmentTags: null,
    awardTags: null,
    displayTags: null,
    single: 0,
    noCopyrightRcmd: null,
    rtype: 0,
    rurl: null,
    mst: 9,
    cp: 7003,
    mv: 0,
    publishTime: 1750435200000
  },
  lyrics: [],
  lyricIndex: -1,
  playSongList: [
    {
      name: '主角',
      mainTitle: null,
      additionalTitle: null,
      id: 2718562172,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 59888486,
          name: '世界之外',
          tns: [],
          alias: []
        }
      ],
      alia: ['《世界之外》「如星璀璨」版本主题歌'],
      pop: 100,
      st: 0,
      rt: '',
      fee: 8,
      v: 38,
      crbt: null,
      cf: '',
      al: {
        id: 276058452,
        name: '世界之外「如星璀璨」主题专辑',
        picUrl:
          'https://p2.music.126.net/ErGPWafrXcoDNhazsPCcmQ==/109951171353637366.jpg',
        tns: [],
        pic_str: '109951171353637366',
        pic: 109951171353637360
      },
      dt: 297931,
      h: {
        br: 320000,
        fid: 0,
        size: 11919405,
        vd: -53809,
        sr: 48000
      },
      m: {
        br: 192000,
        fid: 0,
        size: 7151661,
        vd: -51182,
        sr: 48000
      },
      l: {
        br: 128000,
        fid: 0,
        size: 4767789,
        vd: -49395,
        sr: 48000
      },
      sq: {
        br: 884356,
        fid: 0,
        size: 32940109,
        vd: -53808,
        sr: 48000
      },
      hr: {
        br: 1647880,
        fid: 0,
        size: 61374798,
        vd: -53808,
        sr: 48000
      },
      a: null,
      cd: '01',
      no: 1,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 0,
      s_id: 0,
      mark: 17716748288,
      originCoverType: 0,
      originSongSimpleData: null,
      tagPicList: null,
      resourceState: true,
      version: 4,
      songJumpInfo: null,
      entertainmentTags: null,
      awardTags: null,
      displayTags: null,
      single: 0,
      noCopyrightRcmd: null,
      mv: 0,
      rtype: 0,
      rurl: null,
      mst: 9,
      cp: 0,
      publishTime: 0
    },
    {
      name: '敖嫩河畔/ONON RIVERSIDE',
      mainTitle: null,
      additionalTitle: null,
      id: 2082546171,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 58445023,
          name: '戈壁计划',
          tns: [],
          alias: []
        },
        {
          id: 54411357,
          name: '海木',
          tns: [],
          alias: []
        }
      ],
      alia: [],
      pop: 100,
      st: 0,
      rt: '',
      fee: 8,
      v: 76,
      crbt: null,
      cf: '',
      al: {
        id: 253462667,
        name: '来自戈壁/FROM THE GOBI',
        picUrl:
          'https://p1.music.126.net/GCCEdODm9mv8WIrOCV8mgw==/109951168918507028.jpg',
        tns: [],
        pic_str: '109951170141749434',
        pic: 109951170141749440
      },
      dt: 392000,
      h: {
        br: 320001,
        fid: 0,
        size: 15682605,
        vd: -38762,
        sr: 48000
      },
      m: {
        br: 192001,
        fid: 0,
        size: 9409581,
        vd: -36148,
        sr: 48000
      },
      l: {
        br: 128001,
        fid: 0,
        size: 6273069,
        vd: -34434,
        sr: 48000
      },
      sq: {
        br: 950206,
        fid: 0,
        size: 46560117,
        vd: -39020,
        sr: 48000
      },
      hr: null,
      a: null,
      cd: '01',
      no: 7,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 0,
      s_id: 0,
      mark: 270336,
      originCoverType: 1,
      originSongSimpleData: null,
      tagPicList: null,
      resourceState: true,
      version: 42,
      songJumpInfo: null,
      entertainmentTags: null,
      awardTags: null,
      displayTags: null,
      single: 0,
      noCopyrightRcmd: null,
      mv: 0,
      rtype: 0,
      rurl: null,
      mst: 9,
      cp: 0,
      publishTime: 1694880000000
    }
  ],
  playSongIndex: -1,

  playMode: 0 // 0:顺序播放 1:随机播放 2:单曲循环
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    changeCurrentSongAction(state, { payload }) {
      state.currentSong = payload
    },
    changeLyricsAction(state, { payload }) {
      state.lyrics = payload
    },
    changeLyricIndexAction(state, { payload }) {
      state.lyricIndex = payload
    },
    changePlaySongIndexAction(state, { payload }) {
      state.playSongIndex = payload
    },
    changePlaySongListAction(state, { payload }) {
      state.playSongList = payload
    },
    changePlayModeAction(state, { payload }) {
      state.playMode = payload
    }
  }
})

export const {
  changeCurrentSongAction,
  changeLyricsAction,
  changeLyricIndexAction,
  changePlaySongIndexAction,
  changePlaySongListAction,
  changePlayModeAction
} = playerSlice.actions
export default playerSlice.reducer
