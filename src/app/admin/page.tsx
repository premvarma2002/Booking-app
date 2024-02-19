"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react'

const Admin = () => {
    const router = useRouter(); 
    useEffect(() => { 
        //we want it to take at admin/dasboard not admin/ which was by default
        router.push("/admin/dashboard");
    }, [router]);
  return null;
};

export default Admin;