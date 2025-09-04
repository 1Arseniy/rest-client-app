import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('sign-in', 'routes/sign-in/sign-in.tsx'),
  route('sign-up', 'routes/sign-up/sign-up.tsx'),
] satisfies RouteConfig;
