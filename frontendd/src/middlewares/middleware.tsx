import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextPage, NextPageContext } from 'next';
import Router from 'next/router';

export function withAuth<P extends {}>(Component: NextPage<P>) {
  const Auth = (props: P) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('authToken');

      if (!token) {
        router.replace('/auth/login');
      }
    }, []);

    return <Component {...props} />;
  };

  // Auth.getInitialProps = async (ctx: NextPageContext) => {
  //   let pageProps: any = {};

  //   if (Component.getInitialProps) {
  //     pageProps = await Component.getInitialProps(ctx);
  //   }

  //   return { ...pageProps };
  // };

  // Auth.getInitialProps = async (ctx: NextPageContext) => {
  //   let pageProps: any = {};

  //   // Check if the user is authenticated
  //   const isAuthenticated: boolean = await checkAuthentication(ctx);

  //   // If the user is not authenticated, redirect to the login page
  //   if (!isAuthenticated) {
  //     redirectUser(ctx, '/auth/login');
  //     return {};
  //   }

  //   if (Component.getInitialProps) {
  //     pageProps = await Component.getInitialProps(ctx);
  //   }

  //   return { ...pageProps };
  // };

  // // Function to check if the user is authenticated
  // const checkAuthentication = async (ctx: NextPageContext): Promise<boolean> => {
  //   const token = localStorage.getItem('authToken');
  //   if (!token) {
  //     return false
  //   } else {
  //     return true
  //   }
  // };

  // // Function to redirect the user to another page
  // const redirectUser = (ctx: NextPageContext, location: string) => {
  //   if (ctx.res) {
  //     // Server-side rendering
  //     ctx.res.writeHead(302, { Location: location });
  //     ctx.res.end();
  //   } else {
  //     // Client-side rendering
  //     Router.push(location);
  //   }
  // };



  return Auth;
}
