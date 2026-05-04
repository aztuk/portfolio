import { LoginForm } from "@/components/shared/LoginForm";

type LoginPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ from?: string | string[] }>;
};

const LoginPage = async ({ params, searchParams }: LoginPageProps) => {
  const { locale } = await params;
  const { from } = await searchParams;
  const rawFrom = Array.isArray(from) ? from[0] : from;
  const safeRedirect = rawFrom?.startsWith("/") && !rawFrom.startsWith("//") && !rawFrom.includes("://") ? rawFrom : `/${locale}`;

  return (
    <div className="relative flex min-h-[100svh] items-center justify-center px-4 py-16 lg:min-h-screen">
      <div className="w-full max-w-sm">
        <div className="rounded-[24px] border border-dark-smooth bg-dark/60 p-6 shadow-elevation-2 backdrop-blur-md sm:p-8 lg:rounded-[30px]">
          <LoginForm locale={locale} redirectTo={safeRedirect} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
