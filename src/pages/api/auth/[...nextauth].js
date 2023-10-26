import { signIn, signInWithGoogle } from "@/lib/firebase/services";
import { compare } from "bcrypt";
import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

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
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || ""
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
        if(account?.provider === "google") {
          console.log(user);
          const data = {
            email: user.email,
            fullname: user.name,
            image: user.image,
            type: "google"
          }
          console.log(data);

          await signInWithGoogle(data, (result) => {
            console.log("ini dijalanin")
            console.log(result);
            if(result.status) {
              token.email = result.data.email
              token.fullname = result.data.fullname
              token.image = result.data.image
              token.type = result.data.type
              token.role = result.data.role
            }
          })

          
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
        if("image" in token) {
          session.user.image = token.image
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