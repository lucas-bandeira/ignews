import {query as q} from 'faunadb'

import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

import {fauna} from '../../../services/fauna'

export const authOptions = {
  providers: [
    GithubProvider({
      //@ts-ignore
      clientId: process.env.GITHUB_CLIENT_ID,
      //@ts-ignore
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: 'read:user'
    }),
  ],
  callbacks: {
    // @ts-ignore
    async signIn({user}) {
      const { email } = user;

      try{
        await fauna.query(
          q.If(
            q.Not(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(user.email)
              )
            ),
            q.Create(
              q.Collection('users'),
              {data: { email }}
            ),
            q.Get(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(user.email)
              )
            )
          )
        )
        return true
      }catch(e) {
        console.log('e: ',e)
        return true
      }
    }
  }
}
export default NextAuth(authOptions)