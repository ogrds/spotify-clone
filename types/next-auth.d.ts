import { DefaultUser, Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'

/** Example on how to extend the built-in session types */
declare module 'next-auth' {
  interface UserDefault extends DefaultUser {
    accessToken: string
    refreshToken: string
    username: string
  }

  interface Session {
    /** This is an example. You can find me in types/next-auth.d.ts */
    user: UserDefault
  }
}

/** Example on how to extend the built-in types for JWT */
declare module 'next-auth/jwt' {
  interface JWT {
    /** This is an example. You can find me in types/next-auth.d.ts */
    accessToken: string
    refreshToken: string
    username: string
    accessTokenExpires: number
    error?: string
  }
}
