import SigninClient from "./SigninClient";

export default async function SigninPage({ searchParams }) {
  const params = await searchParams;
  const message = params.message || "";

  return <SigninClient initialMessage={message} />;
}
