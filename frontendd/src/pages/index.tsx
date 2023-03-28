import { Inter } from 'next/font/google'
import Button from '@/components/Button'
import Link from 'next/link'
import Logo from '@/components/Logo'
// const inter = Inter({ subsets: ['latin'] })
import type { NextPageWithLayout } from './_app'
import { useAppSelector } from '@/network/hooks'
import Loader from '@/components/Loader'

const Page: NextPageWithLayout = () => {
  return (
    <>
      <Loader />
      <div className='flex items-center justify-center h-[100vh]'>
        <div className='text-center'>
          <Logo />
          <h1 className='pt-4 pb-3'>Welcome to iNote</h1>
          <div>
            <h3>Log in with your iNote account to continue</h3>
            <div className='flex items-center justify-center space-x-3 mt-3'>
              <Link href={'/auth/login'}>
                <Button text={'Log in'} />
              </Link>
              <Link href={'/auth/signup'}>
                <Button text={'Sign up'} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default Page
