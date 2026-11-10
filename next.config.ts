import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Дозволяє відкривати dev-сервер з телефона в домашній мережі (http://192.168.x.x:3000).
  // Без цього Next блокує свої скрипти для «чужої» адреси — сторінка видно, але кнопки не працюють.
  allowedDevOrigins: ["192.168.*.*"],
  // стара адреса сторінки послуг веде на нову
  async redirects() {
    return [{ source: "/naprawy", destination: "/uslugi", permanent: true }];
  },
};

export default nextConfig;
