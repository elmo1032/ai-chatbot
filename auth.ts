// Import NextAuth and the GitHub provider from the next-auth package
import NextAuth, { type DefaultSession } from 'next-auth'
import GitHub from 'next-auth/providers/github'

// Extend the Session interface to include a user object with an id property
declare module 'next-auth' {
  interface Session {
    user: {
      // The user's id
      id: string
    } & DefaultSession['user']
  }
}

// Initialize NextAuth with the providers and callbacks options
export const {
  handlers: { GET, POST },
  auth
} = NextAuth({
  // Use the GitHub provider for authentication
  providers: [GitHub],
  // Define callbacks for handling the JWT, session, and authorization
  callbacks: {
    jwt({ token, profile }) {
      // If a profile is available, update the token with the user's id and image
      if (profile) {
        token.id = profile.id
        token.image = profile.avatar_url || profile.picture
      }
      // Return the updated token
      return token
    },
    session: ({ session, token }) => {
      // If there is a user and an id in the token, update the session user object with the id
      if (session?.user && token?.id) {
        session.user.id = String(token.id)
      }
      // Return the updated session
      return session
    },
    authorized({ auth }) {
      // Return true if there is a logged in user for every request
      return !!auth?.user
    }
  },
  // Override the default sign-in page
  pages: {
    signIn: '/sign-in'
  }
})

