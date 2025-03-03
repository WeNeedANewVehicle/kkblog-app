/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack(config) {
    // 기존 svg 로더 제거
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg')
    )

    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/
    }

    // svgr 설정 추가
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  // 추가
                  name: 'prefixIds', // id에 고유한 prefix를 붙여주기 위한 플러그인
                  params: {
                    prefix: () => `${Math.random().toString(36).slice(2)}`, // 랜덤한 id를 생성
                    delim: '-', // 구분자
                    prefixIds: true, // id prefix 여부
                    prefixClassNames: false, // 클래스에는 prefix 를 사용하지 않음
                  },
                },
              ],
            },
          },
        },
      ],
    })

    return config
  },
}

export default nextConfig
