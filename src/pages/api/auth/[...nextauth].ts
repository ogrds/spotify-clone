import NextAuth, { Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import SpotifyProvider from 'next-auth/providers/spotify'
import spotifyApi, { LOGIN_URL } from '../../../services/spotify'

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    spotifyApi.setAccessToken(token.accessToken)
    spotifyApi.setRefreshToken(token.refreshToken)

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken()
    console.log('REFRESHED TOKEN IS', refreshedToken)

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      refreshToken: String(refreshedToken.refresh_token ?? token.refresh_token),
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
    }
  } catch (err) {
    console.error(err)

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID || '',
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET || '',
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, account, user }): Promise<JWT> {
      // initial signIn
      if (account && user) {
        return {
          ...token,
          accessToken: String(account.access_token),
          refreshToken: String(account.refresh_token),
          username: account.providerAccountId,
          accessTokenExpires: Number(account.expires_at) * 1000,
        }
      }

      // Return previous token if access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        console.log('EXISTING ACCESS TOKEN IS VALID')
        return token
      }

      console.log('ACCESS TOKEN HAS EXPIRED, REFRESHING...')

      return await refreshAccessToken(token)
    },

    async session({ session, token }): Promise<Session> {
      session.user.accessToken = token.accessToken
      session.user.refreshToken = token.refreshToken
      session.user.username = token.username
      session.error = token.error

      return session
    },
  },
})
