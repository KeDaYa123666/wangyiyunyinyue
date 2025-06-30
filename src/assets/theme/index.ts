// 定义自定义主题类型
interface CustomTheme {
  color: {
    primary: string
    secondary: string
  }
  size: {}
  mixin: {
    wrapv1: string
    textNowrap: string
  }
}

// 扩展 DefaultTheme 接口
declare module 'styled-components' {
  interface DefaultTheme extends CustomTheme {}
}

const theme: CustomTheme = {
  color: {
    primary: '#C20C0C',
    secondary: ''
  },
  size: {},
  mixin: {
    wrapv1: `
      width: 1100px;
      margin: 0 auto;
    `,
    textNowrap: `
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    `
  }
}

export default theme
