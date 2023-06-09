/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["res.cloudinary.com","lh3.googleusercontent.com", "avatars.githubusercontent.com","via.placeholder.com","i.ibb.co"],
    },
};

module.exports = nextConfig;
