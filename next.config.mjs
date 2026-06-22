/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: "C:/xampp/htdocs/BS/sales-daily",
  outputFileTracingIncludes: {
    "/**": ["./app/_og/*.ttf"],
  },
};
export default nextConfig;
