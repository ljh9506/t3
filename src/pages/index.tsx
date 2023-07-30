/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { SignIn, SignInButton, useUser } from "@clerk/clerk-react";
import dayjs from "dayjs";
import Head from "next/head";
import Image from "next/image";
import { type RouterOutputs, api } from "~/utils/api";

const ProfileWrapper = () => {
  const { user } = useUser();
  if (!user) return null;

  return (
    <div className="flex w-full gap-3 p-6">
      <Image
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

type PostWithUser = RouterOutputs["posts"]["getAll"][number];

const PostView = (props: PostWithUser) => {
  const { post, author } = props;
  return (
    <div
      key={post.id}
      className="flex items-center gap-x-3 border-b border-slate-400 p-8"
    >
      <Image
        className="h-14 w-14 rounded-full"
        src={author?.profileImageUrl}
        alt={"author img"}
      />
      <div>
        <span className="font-thin">{`${dayjs(post.createdAt)}`}</span>
      </div>
      {post.content}
    </div>
  );
};

export default function Home() {
  const { data, isLoading, isError } = api.posts.getAll.useQuery();
  const user = useUser();

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center">
        <div>{!user.isSignedIn && <SignInButton />}</div>
        <div className="w-full">{!!user.isSignedIn && <ProfileWrapper />}</div>
        <SignIn />
        <div className="w-full">
          {data?.map((v) => (
            <PostView key={v.post.id} {...v} />
          ))}
        </div>
      </main>
    </>
  );
}
