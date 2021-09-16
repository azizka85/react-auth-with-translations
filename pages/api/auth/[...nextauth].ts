import NextAuth from "next-auth"
import Providers from 'next-auth/providers'

export default NextAuth({
  session: {
    jwt: true,
    maxAge: 30*24*60*60
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials: {email: string, password: string}) {
        const email = credentials.email
        const password = credentials.password

        if(email !== 'next@auth.pwa' || password !== 'lock') {
          throw new Error('Auth error')
        }

        return { 
          email,
          isNextUser: true 
        }
      }
    })
  ],
})
