/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // tailwind css 파일을 여러 곳에서 나눠서 관리하고 global.css 에서 import해 사용하기 위해 필요한 설정
    'postcss-import': {},
    tailwindcss: {},
  },
}

export default config
