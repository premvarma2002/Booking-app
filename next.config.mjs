/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        instrumentationHook:true,
    },
    env:{
        NEXT_PUBLIC_DOMAIN:"http://localhost:3000",
    },
    images:{
        remotePatterns:[
            {hostname:"imgcld.yatra.com"}
        ]
    }
};

export default nextConfig;
