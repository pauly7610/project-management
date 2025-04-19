import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus,
  Calendar as CalendarIcon
} from "lucide-react";

export default function CalendarPage() {
  // Get current month for display
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();

  // Generate a 5-week calendar grid (simplified for April 2025)
  const daysInMonth = 30; // April has 30 days
  const firstDayOfMonth = 2; // Assuming April 1, 2025 is a Tuesday (0 = Sunday, 1 = Monday, etc.)
  
  const days = [];
  // Add empty cells for days before the 1st of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push({ day: null, isCurrentMonth: false });
  }
  
  // Add days of the current month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ 
      day: i, 
      isCurrentMonth: true,
      events: i === 10 ? [
        { title: "Team Standup", time: "09:00 AM", type: "meeting" },
        { title: "Design Review", time: "02:00 PM", type: "review" }
      ] : i === 15 ? [
        { title: "Client Meeting", time: "11:00 AM", type: "meeting" }
      ] : i === 20 ? [
        { title: "Project Deadline", time: "All Day", type: "deadline" }
      ] : []
    });
  }
  
  // Add empty cells for days after the last day of the month to complete the grid
  const remainingCells = 35 - days.length; // To make a 5-week grid
  for (let i = 0; i < remainingCells; i++) {
    days.push({ day: null, isCurrentMonth: false });
  }

  // Group days into weeks
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Calendar</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>

      <div className="bg-white border rounded-lg">
        {/* Calendar Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">{currentMonth} {currentYear}</h2>
            <div className="flex">
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-r-none">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-l-none border-l-0">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline" size="sm" className="h-8">
              Today
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-8">Month</Button>
            <Button variant="outline" size="sm" className="h-8">Week</Button>
            <Button variant="outline" size="sm" className="h-8">Day</Button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div>
          {/* Day names header */}
          <div className="grid grid-cols-7 border-b">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
              <div 
                key={index} 
                className="py-2 text-center text-sm font-medium text-muted-foreground"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div>
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-cols-7 border-b last:border-b-0">
                {week.map((day, dayIndex) => (
                  <div 
                    key={dayIndex} 
                    className={`min-h-[120px] p-2 border-r last:border-r-0 ${
                      !day.isCurrentMonth ? 'bg-gray-50' : ''
                    } ${
                      day.day === currentDate.getDate() ? 'bg-blue-50' : ''
                    }`}
                  >
                    {day.day && (
                      <>
                        <div className="text-sm font-medium mb-1">{day.day}</div>
                        <div className="space-y-1">
                          {day.events && day.events.map((event, eventIndex) => (
                            <div 
                              key={eventIndex}
                              className={`text-xs p-1 rounded truncate ${
                                event.type === 'meeting' ? 'bg-blue-100 text-blue-800' : 
                                event.type === 'review' ? 'bg-green-100 text-green-800' :
                                'bg-orange-100 text-orange-800'
                              }`}
                            >
                              <div className="font-medium">{event.title}</div>
                              <div>{event.time}</div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 