// this is the list of routes that are acceseble by the public
// these routes do not require authentication


export const publicRoutes = [
    "/",
    "/auth/new-verification"
]
// this is the list of routes that are used for authentication
// these orutes will redirect loggedIn users to /settings

export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    '/auth/reset'
]
// The prefix for API authentication routes 
// Routes that start with this prefix are used for API authentication purposes
export const apiAuthPrefix = "/api/auth"


//the default path after logging in
export const DEFAULT_LOGIN_REDIRECT = "/settings"