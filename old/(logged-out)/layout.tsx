type LoggedOutLayoutProps = Readonly<{
  children?: React.ReactNode;
}>;

export default function LoggedOutLayout({ children }: LoggedOutLayoutProps) {
  return (
    <>
      <div className="flex flex-col gap-4 min-h-screen items-center justify-center p-6 md:p-24 w-full max-w-md md:max-w-lg mx-auto">
        {children}
      </div>
    </>
  );
}