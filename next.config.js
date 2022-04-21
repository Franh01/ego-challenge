/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["challenge.agenciaego.tech"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/models",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
