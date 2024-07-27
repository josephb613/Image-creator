// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

// const nextConfig = {
//     reactStrictMode: true,
//     images: {
//       remotePatterns: [
//         {
//           protocol: "https",
//           hostname: "replicate.com",
//         },
//         {
//           protocol: "https",
//           hostname: "replicate.delivery",
//         },
//       ],
//     },
//   };
  
//   export default nextConfig;


const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "replicate.com",
      },
      {
        protocol: "https",
        hostname: "replicate.delivery",
      },
    ],
  },
  distDir: 'dist',  // Ajout de cette ligne
};

export default nextConfig;