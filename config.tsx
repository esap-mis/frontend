const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  title: 'ЕСАП',
  publicRoutes: ['/login', '/register', '/password/reset'],
};
console.log(config)

export default config;
