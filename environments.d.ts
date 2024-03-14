declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PUBLIC_HOST_URL: string;
      MONGO_URI: string;
      JWT_SECRET: string;
      ALCHEMY_API_KEY: string;
      SEPOLIA_PRIVATE_KEY: string;
      ETHER_SCAN_KEY: string;
    }
  }
}
export {};
