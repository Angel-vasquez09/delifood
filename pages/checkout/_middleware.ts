// Se ejecutara antes de cargar los componentes de la pagina de checkout

import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server"
import { jwt } from "utils";

export async function middleware(req: NextRequest | any, ev: NextFetchEvent){

    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if(!session){
        const url = req.nextUrl.clone()
        const direction = req.page.name;
        url.pathname = `/auth/login`
        url.search = `?p=${direction}`
        return NextResponse.rewrite(url)
    }


    return NextResponse.next();

    /*
    RECUPERAR EL TOKEN DE LAS COOKIES PARA VALIDARLO
    const { token = '' } = req.cookies;

    try {
        await jwt.isValidToken(token);
        return NextResponse.next();
    } catch (error) {
        const url = req.nextUrl.clone()
        const direction = req.page.name;
        url.pathname = `/auth/login`
        url.search = `?p=${direction}`
        return NextResponse.rewrite(url)
    } */

}