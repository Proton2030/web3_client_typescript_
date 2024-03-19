import { useRouter } from "next/router";
import { useEffect } from "react";
import LoadingPage from "../LoadingPage";

export default function Page() {
  const router = useRouter();
  const refLink: any = router.query.id;
  useEffect(() => {
    localStorage.setItem("refLink", refLink);
    const redirectTimeout = setTimeout(() => {
      window.location.href =
        "https://play.google.com/store/apps/details?id=app.vercel.btc_in.twa";
    }, 1000);
    return () => clearTimeout(redirectTimeout);
  }, [refLink]);

  return <LoadingPage />;
}
