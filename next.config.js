/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/orphanage/MTIzNDU2",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
