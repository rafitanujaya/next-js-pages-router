import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const onlyAdmin = ["/admin"]

export default function withAuth(middleware, requireAuth = []) {
  return async (req, next) => {
    const pathname = req.nextUrl.pathname;
    console.log(pathname);
    if (requireAuth.includes(pathname)) {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });
      console.log(token);
      if (!token) {
        const url = new URL("/auth/login", req.url);
        url.searchParams.set("callback", encodeURI(req.url))
        console.log( url.searchParams.get("callback"));
        console.log(url);
        return NextResponse.redirect(url);
    }
    if (token.role !== "admin" && onlyAdmin.includes(pathname)) {
      return NextResponse.redirect(new URL('/', req.url))
    } 
    }
    return middleware(req, next);
  };
}