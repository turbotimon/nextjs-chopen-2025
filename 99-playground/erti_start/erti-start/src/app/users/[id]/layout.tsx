export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <h1>User Layout</h1>
      {children} {/* Here the page.tsx is rendered */}
    </div>
  );
}
