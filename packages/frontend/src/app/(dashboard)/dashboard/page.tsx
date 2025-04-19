import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  CheckCircle, 
  Clock, 
  Calendar, 
  Users, 
  AlertTriangle 
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Good evening, Paul!</h1>
          <p className="text-muted-foreground">Welcome to Motion Magic. Here's your productivity overview.</p>
        </div>
        <Button>Get Started</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tasks Completed</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <div className="mr-4 rounded-full bg-green-100 p-2">
              <CheckCircle className="size-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Time Saved</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <div className="mr-4 rounded-full bg-purple-100 p-2">
              <Clock className="size-6 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">5.5 hours</div>
              <p className="text-xs text-muted-foreground">Through automation</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <div className="mr-4 rounded-full bg-blue-100 p-2">
              <Calendar className="size-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">In the next 24h</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Team Availability</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <div className="mr-4 rounded-full bg-green-100 p-2">
              <Users className="size-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">75%</div>
              <p className="text-xs text-muted-foreground">Team members available</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex">
          <AlertTriangle className="size-5 text-amber-500 mr-2" />
          <h3 className="font-medium">Complete Your Setup</h3>
        </div>
        <p className="mt-1 text-sm">You have 5 tools that need to be authorized to fully set up your dashboard.</p>
        <div className="mt-3 flex gap-2 flex-wrap">
          <div className="bg-white text-xs px-3 py-1 rounded border">Notion</div>
          <div className="bg-white text-xs px-3 py-1 rounded border">Asana</div>
          <div className="bg-white text-xs px-3 py-1 rounded border">Slack</div>
          <div className="bg-white text-xs px-3 py-1 rounded border">Google Workspace</div>
          <div className="bg-white text-xs px-3 py-1 rounded border">Microsoft Office</div>
        </div>
        <Button className="mt-3" size="sm" variant="outline">
          Complete Setup
        </Button>
      </div>

      {/* Overdue Tasks Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Overdue Tasks</h2>
          <Button variant="ghost" size="sm" className="text-primary">
            View All
          </Button>
        </div>
        
        <div className="space-y-3">
          <Card className="border-l-4 border-l-red-500">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-medium">Prepare team meeting agenda</h3>
                  <p className="text-sm text-muted-foreground">Mar 30, 2024</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs font-medium bg-red-100 text-red-700 px-2 py-0.5 rounded">
                    Overdue
                  </div>
                  <div className="text-xs font-medium bg-red-100 text-red-700 px-2 py-0.5 rounded">
                    High
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-red-500">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-medium">Send client follow-up emails</h3>
                  <p className="text-sm text-muted-foreground">Apr 20, 2024</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs font-medium bg-red-100 text-red-700 px-2 py-0.5 rounded">
                    Overdue
                  </div>
                  <div className="text-xs font-medium bg-red-100 text-red-700 px-2 py-0.5 rounded">
                    High
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 