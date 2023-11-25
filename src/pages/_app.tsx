import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import Topbar from "@/components/topbar/Topbar";
import Sidebar from "@/components/sidebar/Sidebar";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {TokenStorageService} from "@/service/auth/TokenStorageService";
import Head from 'next/head';
import config from "../../config";

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const tokenStorageService = new TokenStorageService();
  const token = tokenStorageService.getToken();
  const isPublicRoute = config.publicRoutes.includes(router.pathname);

  useEffect(() => {
    if (!token && !isPublicRoute) {
      router.push('/login');
    } else if (token && isPublicRoute) {
      router.push('/dashboard');
    }
  }, [token, isPublicRoute, router]);

  const head = (
    <Head>
      <title>{config.title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );

  if (token || isPublicRoute) {
    if (isPublicRoute) {
      return (
        <>
          {head}
          <Component {...pageProps} />
        </>
      );
    } else {
      return (
        <>
          {head}
          <Topbar />
          <div className="app">
            <Sidebar />
            <Component {...pageProps} />
          </div>
        </>
      );
    }
  }
  return null;
};

export default App;