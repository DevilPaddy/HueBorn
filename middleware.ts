import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    
    authorized: ({ token }) => {
      return true; 
    },
  },
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};