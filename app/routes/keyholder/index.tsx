import { useLoaderData } from '@remix-run/react';
import { json, LoaderFunction } from '@remix-run/node';
import { Card } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Table } from '~/components/ui/table';
import { requireKeyholder } from '~/middleware/auth.server';

export const loader: LoaderFunction = async ({ request }) => {
  await requireKeyholder(request);
  return json({
    stats: {
      activeKeys: 24,
      pendingRequests: 5,
      recentActivity: 12
    }
  });
};

export default function KeyholderPage() {
  const { stats } = useLoaderData<typeof loader>();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Keyholder Dashboard</h1>
        <Button>Add New Key</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Active Keys</h3>
          <div className="text-3xl font-bold text-green-600">{stats.activeKeys}</div>
          <p className="text-gray-600">Currently active keys</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Pending Requests</h3>
          <div className="text-3xl font-bold text-yellow-600">{stats.pendingRequests}</div>
          <p className="text-gray-600">Awaiting approval</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
          <div className="text-3xl font-bold text-blue-600">{stats.recentActivity}</div>
          <p className="text-gray-600">Actions in last 24h</p>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Key Management</h2>
        <div className="overflow-x-auto">
          <Table>
            <thead>
              <tr>
                <th>Key ID</th>
                <th>Owner</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>KEY-001</td>
                <td>John Doe</td>
                <td>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    Active
                  </span>
                </td>
                <td>2025-01-02</td>
                <td>
                  <Button variant="outline" size="sm">Manage</Button>
                </td>
              </tr>
              <tr>
                <td>KEY-002</td>
                <td>Alice Smith</td>
                <td>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                    Pending
                  </span>
                </td>
                <td>2025-01-02</td>
                <td>
                  <Button variant="outline" size="sm">Review</Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium">New key issued to John Doe</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium">Key request from Alice Smith</p>
              <p className="text-xs text-gray-500">5 hours ago</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
