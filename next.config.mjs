/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // Bug fix: image.pollinations.ai is the old domain and was never whitelisted anyway.
        // Both text and image generation now go through gen.pollinations.ai — this is the only entry needed.
        protocol: 'https',
        hostname: 'gen.pollinations.ai',
      },
    ],
  },
};

export default nextConfig;

