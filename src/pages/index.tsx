import { SignIn, SignInButton, useUser } from "@clerk/clerk-react";
import Head from "next/head";
import { api } from "~/utils/api";

const ProfileWrapper = () => {
  const { user } = useUser();
  if (!user) return null;

  return (
    <div className="flex w-full gap-3">
      <img
        className="block h-16 w-16 max-w-xs rounded-full"
        src={user.profileImageUrl}
        alt="Profile Image"
      />
      <input
        placeholder="Type post"
        className="grow bg-transparent outline-none"
      />
    </div>
  );
};
export default function Home() {
  const { data } = api.posts.getAll.useQuery();
  const user = useUser();

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div>{!user.isSignedIn && <SignInButton />}</div>
        <div>{!!user.isSignedIn && <ProfileWrapper />}</div>
        <SignIn />
        <div>
          {data?.map(({ post, author }) => (
            <div key={post.id}>{post.content}</div>
          ))}
        </div>
      </main>
    </>
  );
}
