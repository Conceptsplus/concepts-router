import { useLoaderData } from '@remix-run/react';
import { json, LoaderFunction } from '@remix-run/node';
import { Card } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { requireAuth } from '~/middleware/auth.server';

export const loader: LoaderFunction = async ({ request }) => {
  await requireAuth(request);
  return json({});
};

export default function ProjePage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Button>New Project</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-2">Project Management</h3>
          <p className="text-gray-600 mb-4">Track and manage your projects efficiently</p>
          <div className="space-y-3">
            <Button variant="outline" className="w-full">View Projects</Button>
            <Button variant="outline" className="w-full">Create Task</Button>
            <Button variant="outline" className="w-full">Project Timeline</Button>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
          <p className="text-gray-600 mb-4">Work together with your team members</p>
          <div className="space-y-3">
            <Button variant="outline" className="w-full">Team Dashboard</Button>
            <Button variant="outline" className="w-full">Team Chat</Button>
            <Button variant="outline" className="w-full">Share Files</Button>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-2">Analytics</h3>
          <p className="text-gray-600 mb-4">Track project progress and performance</p>
          <div className="space-y-3">
            <Button variant="outline" className="w-full">View Reports</Button>
            <Button variant="outline" className="w-full">Export Data</Button>
            <Button variant="outline" className="w-full">Team Performance</Button>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Recent Projects</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium">Website Redesign</h4>
              <p className="text-sm text-gray-500">Due in 5 days</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                <div className="w-8 h-8 bg-yellow-500 rounded-full"></div>
              </div>
              <Button size="sm">View</Button>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium">Mobile App Development</h4>
              <p className="text-sm text-gray-500">Due in 2 weeks</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
                <div className="w-8 h-8 bg-pink-500 rounded-full"></div>
              </div>
              <Button size="sm">View</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
