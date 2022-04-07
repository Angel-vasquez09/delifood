import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import Credentials from "next-auth/providers/credentials";
import { dbUsers } from "database";

export default NextAuth({
  // Configure one or more authentication providers
    providers: [
        // ...add more providers here
        Credentials({
            // ...configure more providers here
            name: 'Custom Login',
            credentials: {
              email: { label: 'Email', type: 'email', placeholder: 'Email' },
              password: { label: 'Password', type: 'password', placeholder: 'Password' },
            },
            async authorize(credentials){
              // Verificamos si el usuario existe en la base de datos
              // Si todo es correcto lo guardamos en la sesion que nos proporciona nextAuth
              return await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password);
            }

        }),
        FacebookProvider({
          clientId    : `${process.env.FACEBOOK_CLIENT_ID}`,
          clientSecret: `${process.env.FACEBOOK_CLIENT_SECRET}`
        })
    ],

    // Custom Pages
    pages: {
      signIn: '/auth/login',
      newUser: '/auth/register',
    },

    jwt: {

    },

    session: { // Duracion de la sesion del token
      maxAge: 2592000, // 30 days
      strategy: 'jwt',
      updateAge: 86400, // 1 day
    },

    // Configure callback
    callbacks: {
      async jwt({ token, account, user }){
        if(account){
          token.accessToken = account.access_token;
          switch (account.type) {
            case 'credentials':
              token.user = user
            break;

            case 'oauth':
              token.user = await dbUsers.createToDbUser(user?.email || '', user?.name || '');
            break;

            default:
              break;
          }

        }
        return token;
      },
      async session({ session, token, user }){

        session.accessToken = token.accessToken;
        session.user = token.user as any;
        return session;
      }
    }
})