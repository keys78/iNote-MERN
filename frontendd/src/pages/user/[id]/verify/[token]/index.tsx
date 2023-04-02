/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from 'next/router'
import Loader from "../../../../../components/Loader";

const VerifyEmail = () => {
  const [isValidUrl, setValidUrl] = useState<boolean>(false);
  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState<boolean>(true);

  const verifyEmailUrl = async () => {
    try {
      await axios.post(`http://localhost:3000/user/${router.query.id}/verify/${router.query.token}`);
      setValidUrl(true);
    } catch (error) {
      console.log(error);
      setValidUrl(false);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      verifyEmailUrl();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  useEffect(() => {
    setTimeout(function () {
      setIsAnimating(!isAnimating)
    }, 4500);
  }, []);

  const successMessage = (
    <div className="veri-board">
      <div>
        {isAnimating && <img className="animated-gif" src="/assets/fp.gif" alt="gif" />}
        {!isAnimating && (
          <>
            <img className="animated-gif" src="/assets/veri_green.jpg" alt="png" />
            <h1>Email verified successfully </h1>
            <Link href="/signin"><span className='btn-class-form new-btn' >Login</span></Link>
          </>
        )}
      </div>
    </div>
  );

  const notFound = (
    <div className="veri-false">
      <div>
        <img src="/assets/f_o_f.gif" alt="not found" />
        <h1> 404 | Page Not Found</h1>
      </div>
    </div>
  );

  return (
    <>
      {router.isReady ?
        <>
          {isValidUrl && successMessage}
          {!isValidUrl && notFound}
        </> :
        <Loader />
      }
    </>
  );
};

export default VerifyEmail;
