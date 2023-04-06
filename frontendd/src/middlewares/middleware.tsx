import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextPage, NextPageContext } from 'next';
import LoadingScreen from '@/components/LoadingScreen';

export function withAuth<P extends {}>(Component: NextPage<P>) {
  const Auth = (props: P) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const token = localStorage.getItem('authToken');

      if (!token) {
        router.replace('/auth/login');
      } else {
        setIsLoading(false);
      }
    }, [router]);

    if (isLoading) {
      return <LoadingScreen />
    }

    return <Component {...props} />;
  };

  // Auth.getInitialProps = async (ctx: NextPageContext) => {
  //   let pageProps: any = {};

  //   if (Component.getInitialProps) {
  //     pageProps = await Component.getInitialProps(ctx);
  //   }

  //   return { ...pageProps };
  // };

  Auth.getInitialProps = async (ctx: NextPageContext) => {
    let pageProps: any = {};
  
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
  
    return pageProps;
  };
  

  return Auth;
}
