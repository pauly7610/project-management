import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Cog, FileText, Plus, Search } from "lucide-react";

export default function AIMeetingNotesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">AI Meeting Notes</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Cog className="h-4 w-4" />
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Meeting Notes
          </Button>
        </div>
      </div>

      {/* Search bar */}
      <div className="flex max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search All Meetings"
            className="w-full pl-10 pr-4 py-2 rounded-md border"
          />
        </div>
      </div>

      {/* Calendar connection section */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">Connect your calendars</h2>
              <p className="text-muted-foreground text-sm">
                Connect your calendar accounts to automatically detect and join meetings
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <p className="text-sm">
                You haven't connected any calendars yet. Connect your Google Calendar, Microsoft Outlook, or other calendar services to enable automated meeting assistance.
              </p>
            </div>

            <Button className="flex items-center justify-center w-full sm:w-auto">
              <CalendarDays className="mr-2 h-4 w-4" />
              Connect Calendar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* No meeting notes yet */}
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 bg-gray-100 rounded-full p-4">
          <FileText className="h-12 w-12 text-gray-400" />
        </div>
        <h2 className="text-xl font-semibold mb-2">No meeting notes found</h2>
        <p className="text-muted-foreground max-w-md mb-6">
          Create your first meeting note to get started
        </p>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Meeting Note
        </Button>
      </div>

      {/* How it works section */}
      <div className="border-t pt-8">
        <h2 className="text-xl font-semibold mb-6">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-muted/30 p-5 rounded-lg">
            <div className="bg-primary-foreground text-primary rounded-full w-8 h-8 flex items-center justify-center mb-4">1</div>
            <h3 className="font-medium mb-2">Connect Your Calendar</h3>
            <p className="text-sm text-muted-foreground">
              Sync with Google Calendar, Microsoft Outlook, or other calendar services.
            </p>
          </div>
          
          <div className="bg-muted/30 p-5 rounded-lg">
            <div className="bg-primary-foreground text-primary rounded-full w-8 h-8 flex items-center justify-center mb-4">2</div>
            <h3 className="font-medium mb-2">Join Meetings</h3>
            <p className="text-sm text-muted-foreground">
              Our AI assistant automatically joins your meetings and takes detailed notes.
            </p>
          </div>
          
          <div className="bg-muted/30 p-5 rounded-lg">
            <div className="bg-primary-foreground text-primary rounded-full w-8 h-8 flex items-center justify-center mb-4">3</div>
            <h3 className="font-medium mb-2">Review and Share</h3>
            <p className="text-sm text-muted-foreground">
              Access AI-generated meeting summaries, action items, and key decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 