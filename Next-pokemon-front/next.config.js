/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains: ['raw.githubusercontent.com']
  },
  // webpack: (config, _) => ({
  //   ...config,
  //   watchOptions: {
  //     ...config.watchOptions,
  //     poll: 800,
  //     aggregateTimeout: 300,
  //   },
  // }),
}

module.exports = nextConfig
