'use client'
import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { NotAccountType } from "@/type/global";

function NotAccount() {
    const [notAccountType, setIsNotAccountType] = useState<NotAccountType>('login');
    return ( 
        <>
            {notAccountType === 'login' ? <Login setIsNotAccountType={setIsNotAccountType} /> : <Register setIsNotAccountType={setIsNotAccountType} /> }
        </>
    );
}

export default NotAccount;