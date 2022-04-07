// Se ejecutara antes de cargar los componentes de la pagina de checkout

import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server"
import { jwt } from "utils";

export async function middleware(req: NextRequest | any, ev: NextFetchEvent){

    const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if(!session){
        const url = req.nextUrl.clone()
        url.pathname = `/`
        return NextResponse.rewrite(url)
    }


    const validRole = ['admin','super-user','SEO'];

    if(!validRole.includes(session.user.role)){
        const url = req.nextUrl.clone()
        url.pathname = `/`
        return NextResponse.rewrite(url)
    }
    return NextResponse.next();


}