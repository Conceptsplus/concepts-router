import { useLoaderData } from '@remix-run/react';
import { json, LoaderFunction } from '@remix-run/node';
import { Card } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { requireAuth } from '~/middleware/auth.server';

export const loader: LoaderFunction = async ({ request }) => {
  await requireAuth(request);
  return json({});
};

export default function ChatterPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Chatter</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Conversations</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                JD
              </div>
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-gray-500">Hey, how's it going?</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                AS
              </div>
              <div>
                <p className="font-medium">Alice Smith</p>
                <p className="text-sm text-gray-500">Project meeting at 3 PM</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Active Users</h2>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>John Doe</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Alice Smith</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <span>Bob Wilson</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Button className="w-full">New Chat</Button>
            <Button variant="outline" className="w-full">Join Room</Button>
            <Button variant="outline" className="w-full">Create Room</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
