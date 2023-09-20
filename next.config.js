/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/orphanage/12345",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
