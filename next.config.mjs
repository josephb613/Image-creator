

// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "replicate.com",
//       },
//       {
//         protocol: "https",
//         hostname: "replicate.delivery",
//       },
//     ],
//   },
//   distDir: 'dist',  
// };

// export default nextConfig;


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
  distDir: 'dist',  // Spécifiez le répertoire de sortie ici
  experimental: {
    appDir: true, // Activez le support du dossier `app`
  },
};

export default nextConfig;
