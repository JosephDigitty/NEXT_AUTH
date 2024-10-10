import  authConfig  from "@/auth.config"
import NextAuth from "next-auth" 
import {publicRoutes,authRoutes,apiAuthPrefix,DEFAULT_LOGIN_REDIRECT,} from "@/routes"

const {auth} = NextAuth(authConfig)
 
export default auth((req) => {
    const {nextUrl} = req 
    const isLoggedIn = !!req.auth

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const ispublicRoutes = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoutes = authRoutes.includes(nextUrl.pathname)


    if(isApiAuthRoute) {
      return null
    }

    if(isAuthRoutes) {
      if(isLoggedIn) {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
      }
      return null 
    }

    if(!isLoggedIn && !ispublicRoutes) {
      return Response.redirect(new URL("/auth/login", nextUrl))
    }

    return null

})
 
// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}