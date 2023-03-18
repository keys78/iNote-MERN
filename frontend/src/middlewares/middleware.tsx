import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextPage, NextPageContext } from 'next';

export function withAuth<P extends {}>(Component: NextPage<P>) {
  const Auth = (props: P) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');

      if (!token) {
        router.replace('/login');
      }
    }, []);

    return <Component {...props} />;
  };

  Auth.getInitialProps = async (ctx: NextPageContext) => {
    let pageProps: any = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { ...pageProps };
  };

  return Auth;
}