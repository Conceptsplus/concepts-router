import { useLoaderData } from '@remix-run/react';
import { json, LoaderFunction } from '@remix-run/node';
import { Card } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Table } from '~/components/ui/table';
import { requireAdmin } from '~/middleware/auth.server';

export const loader: LoaderFunction = async ({ request }) => {
  await requireAdmin(request);
  return json({ stats: {
    totalUsers: 1234,
    newUsers: 56,
    pendingApprovals: 23,
    systemStatus: 'Healthy'
  }});
};

export default function AdminDashboard() {
  const { stats } = useLoaderData<typeof loader>();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Total Users</h3>
          <div className="text-3xl font-bold text-blue-600">{stats.totalUsers}</div>
          <p className="text-gray-600">Active accounts</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">New Users</h3>
          <div className="text-3xl font-bold text-green-600">{stats.newUsers}</div>
          <p className="text-gray-600">Last 7 days</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Pending Approvals</h3>
          <div className="text-3xl font-bold text-yellow-600">{stats.pendingApprovals}</div>
          <p className="text-gray-600">Awaiting review</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">System Status</h3>
          <div className="text-3xl font-bold text-green-600">{stats.systemStatus}</div>
          <p className="text-gray-600">All systems operational</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Users</h2>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <Table>
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>john@example.com</td>
                <td>User</td>
                <td>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    Active
                  </span>
                </td>
                <td>
                  <Button variant="outline" size="sm">Manage</Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">System Logs</h2>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium">System Update Completed</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium">Backup Process Started</p>
                <p className="text-xs text-gray-500">5 hours ago</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
