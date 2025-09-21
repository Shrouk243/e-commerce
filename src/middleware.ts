import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware (request : NextRequest){

const token = await getToken({req: request})

if (token) {


if (request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/register" ||  request.nextUrl.pathname === "/forgotpassword" ||          // صفحة نسيت الباسورد
      request.nextUrl.pathname === "/verifyreset" ||    
      request.nextUrl.pathname === "/resetpassword"  ){
    return NextResponse.redirect(new URL('/' , request.url))

}else{
  return NextResponse.next()
}


}
else {
  if (request.nextUrl.pathname === "/cart"){
    return NextResponse.redirect(new URL('/login' , request.url))

  }
  else {
      return NextResponse.next()
  }
}

}

export const config = {
  matcher: ["/cart" , "/login" , "/register", 
    "/forgotpassword",
    "/verifyreset",
    "/resetpassword" ],
}