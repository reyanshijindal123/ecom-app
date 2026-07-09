import AccountSidebar from './components/AccountSidebar';

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <h1 className="text-3xl font-bold mb-8">
        My Account
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* Sidebar */}

        <div>
          <AccountSidebar />
        </div>

        {/* Content */}

        <main className="lg:col-span-3">
          {children}
        </main>

      </div>

    </div>
  );
}