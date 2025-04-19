import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ChevronLeft, 
  ChevronRight, 
  Mail, 
  Plus, 
  Bell, 
  Pencil, 
  Trash 
} from "lucide-react";

export default function TeamSchedulePage() {
  const currentDate = new Date();
  const currentMonthName = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();
  
  // Generate calendar days (simplified for April 2025)
  const daysInMonth = 30; // April has 30 days
  const firstDayOfMonth = 2; // Assuming April 1, 2025 is a Tuesday (0 = Sunday, 1 = Monday, etc.)
  
  const calendarDays = [];
  // Add days from previous month for proper alignment
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push({ 
      day: 30 - firstDayOfMonth + i + 1, 
      isCurrentMonth: false, 
      isToday: false 
    });
  }
  
  // Add days for current month
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({ 
      day: i, 
      isCurrentMonth: true, 
      isToday: i === currentDate.getDate() 
    });
  }
  
  // Add days from next month to complete the grid
  const remainingDays = 42 - calendarDays.length; // 6 weeks × 7 days
  for (let i = 1; i <= remainingDays; i++) {
    calendarDays.push({ 
      day: i, 
      isCurrentMonth: false, 
      isToday: false 
    });
  }

  // Mock team members
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Project Manager",
      status: "available",
      initial: "S",
    },
    {
      name: "Michael Chen",
      role: "UX Designer",
      status: "busy",
      initial: "M",
    },
    {
      name: "Emily Wong",
      role: "Developer",
      status: "available",
      initial: "E",
    },
    {
      name: "Daniel Kim",
      role: "Marketing Specialist",
      status: "unavailable",
      initial: "D",
    },
  ];

  // Mock schedule events
  const scheduleEvents = [
    {
      id: 1,
      title: "Team Stand-up",
      time: "09:00 AM - 09:30 AM",
      type: "meeting",
      attendees: ["Sarah Johnson", "Michael Chen", "Emily Wong", "Daniel Kim"]
    },
    {
      id: 2,
      title: "Design Review",
      time: "11:00 AM - 12:00 PM",
      type: "review",
      attendees: ["Sarah Johnson", "Michael Chen"]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Team Schedule</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar section */}
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{currentMonthName} {currentYear}</h2>
                  <div className="flex items-center space-x-1">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Calendar grid */}
                <div>
                  <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, index) => (
                      <div key={index} className="text-sm font-medium text-muted-foreground">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((day, i) => (
                      <button
                        key={i}
                        className={`
                          text-sm p-2 rounded-md h-12 
                          ${!day.isCurrentMonth ? 'text-muted-foreground opacity-50' : ''}
                          ${day.isToday ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}
                        `}
                        disabled={!day.isCurrentMonth}
                      >
                        {day.day}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Today's schedule */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Today's Schedule</h2>
            <div className="space-y-4">
              {scheduleEvents.map((event) => (
                <Card key={event.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">{event.time}</p>
                        <div className="mt-2 text-sm">
                          {event.attendees.join(", ")}
                        </div>
                      </div>
                      <div>
                        <div className={`
                          px-3 py-1 rounded-full text-xs font-medium
                          ${event.type === 'meeting' ? 'bg-blue-100 text-blue-800' : 
                            event.type === 'review' ? 'bg-green-100 text-green-800' : ''}
                        `}>
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </div>
                        <div className="flex mt-4 space-x-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Team members section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Team Members</h2>
          <div className="space-y-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="p-4 bg-white border rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className={`
                      flex items-center justify-center w-10 h-10 rounded-full 
                      ${member.status === 'available' ? 'bg-green-100 text-green-600' :
                        member.status === 'busy' ? 'bg-orange-100 text-orange-600' :
                        'bg-red-100 text-red-600'}
                    `}>
                      {member.initial}
                    </div>
                    <div>
                      <h3 className="font-medium">{member.name}</h3>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Team Member
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 