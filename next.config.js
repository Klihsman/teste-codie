const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    return config;
  },
  publicRuntimeConfig: {
    staticFolder: '/static',
  },
}

module.exports = nextConfig
