import { LoginForm } from "@/components/shared/LoginForm";

type LoginPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ from?: string }>;
};

const LoginPage = async ({ params, searchParams }: LoginPageProps) => {
  const { locale } = await params;
  const { from } = await searchParams;

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="rounded-[30px] border border-dark-smooth bg-dark/60 p-8 shadow-elevation-2 backdrop-blur-md">
          <LoginForm locale={locale} redirectTo={from ?? `/${locale}`} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
