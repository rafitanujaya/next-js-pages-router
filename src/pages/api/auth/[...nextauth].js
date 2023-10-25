import { signIn } from "@/lib/firebase/services";
import { compare } from "bcrypt";
import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

const authOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        fullname: {label: "Fullname", type: "text"},
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const {email,password} = credentials

        const user = await signIn({ email })
        console.log(user);
        if(user) {
          const passwordConfirm = await compare(password, user.password)
          console.log(password);
          if (passwordConfirm) {
            return user
          }
          return null
        } 

        return null
      }
    }),
  ],
  callbacks: {
     async jwt({token, account, user}) {
        console.log({token, account, user});
        if(account?.provider === "credentials") {
            token.email = user.email
            token.fullname = user.fullname
            token.role = user.role;
        }
        console.log({token, user, account});
        return token;
    },

    async session({ session, token, user }) {
      console.log(token);
        if ("email" in token) {
            session.user.email = token.email;
        }
        if ("fullname" in token) {
          session.user.fullname = token.fullname
        }
        if ("role" in token) {
          session.user.role = token.role
        }
        console.log(session);
        return session
    }
  },
  pages: {
    signIn: "/auth/login"
  }
};

export default nextAuth(authOptions)