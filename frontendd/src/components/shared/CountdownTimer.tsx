import { resetBoard } from "@/features/private/boards/boardSlice";
import { resetUser } from "@/features/private/user/userSlice";
import { useAppDispatch } from "@/network/hooks";
import { useState, useEffect } from "react";


function CountdownTimer() {
    const dispatch = useAppDispatch();
    const [seconds, setSeconds] = useState(() => {
        if (typeof window !== "undefined") {
            const savedSeconds = localStorage.getItem("log_auth");
            return savedSeconds ? parseInt(savedSeconds) : 20 * 60 * 60;
        } else {
            return 20 * 60 * 60;
        }
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prevSeconds) => {
                const updatedSeconds = prevSeconds - 1;
                if (typeof window !== "undefined") {
                    localStorage.setItem("log_auth", updatedSeconds as any);
                }
                return updatedSeconds;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (seconds === 0) {
            localStorage.removeItem('authToken');
            window.location.href = '/auth/login';
            dispatch(resetUser())
            dispatch(resetBoard())
            localStorage.removeItem('log_auth')
            console.log("User logged out!");
        }
    }, [dispatch, seconds]);

    // Convert seconds to hours, minutes, and seconds
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    // const html = `Time remaining: ${hours}h ${minutes}m ${remainingSeconds}s`;

    // return <div dangerouslySetInnerHTML={{ __html: html }} />;
    return <span></span>
}

export default CountdownTimer;