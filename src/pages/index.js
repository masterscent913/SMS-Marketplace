import { usePageView } from "src/hooks/use-page-view";
import { paths } from "src/paths";
import { Seo } from "src/components/seo";
import { useRouter } from "src/hooks/use-router";
import { useAuth } from "src/hooks/use-auth";

const Page = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  console.log(" >>> Index >>> ", isAuthenticated);
  // if (isAuthenticated) {
  //   router.push(paths.auth.register);
  // } else {
  //   router.push(paths.auth.login);
  // }

  // usePageView();

  return (
    <>
      <Seo />
      <main>asfasfas</main>
    </>
  );
};

export default Page;
