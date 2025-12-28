// create a dashboard admin layout

export default function DashboardAdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <h1>Dashboard Admin</h1>
            {children}
        </div>
    )
}