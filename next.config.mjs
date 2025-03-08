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
            icon: true,
            svgo: false
          },
        },
      ],
    })

    return config
  },
}

export default nextConfig
