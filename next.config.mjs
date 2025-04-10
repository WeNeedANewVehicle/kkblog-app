/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        hostname: 'pub-708a35c7c33c409db2888a28ce5ad813.r2.dev',
      },
    ],
  },

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
            svgo: false,
          },
        },
      ],
    })

    return config
  },
}

export default nextConfig
