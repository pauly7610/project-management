import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AgendaPage() {
  // This would typically come from an API
  const scheduleItems = [
    {
      time: "09:00 AM",
      title: "Team Standup",
      duration: "30m",
      type: "meeting"
    },
    {
      time: "10:00 AM",
      title: "Project Planning",
      duration: "1h",
      type: "meeting"
    },
    {
      time: "12:00 PM",
      title: "Lunch Break",
      duration: "1h",
      type: "break"
    },
    {
      time: "01:00 PM",
      title: "Client Call",
      duration: "45m",
      type: "call"
    },
    {
      time: "02:00 PM",
      title: "Design Review",
      duration: "1h",
      type: "review"
    },
    {
      time: "04:00 PM",
      title: "Weekly Wrap-up",
      duration: "30m",
      type: "meeting"
    }
  ];

  // Get current month for calendar display
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();
  
  // Generate calendar days (simplified)
  const calendarDays = Array.from({ length: 35 }, (_, i) => {
    const day = i - currentDate.getDay() + 1;
    return { 
      day,
      isCurrentMonth: day > 0 && day <= 30,
      isToday: day === currentDate.getDate()
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Today's Agenda</h1>
        <Button variant="outline">Add Item</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Schedule Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold">Schedule</h2>
            </div>
            <div className="divide-y">
              {scheduleItems.map((item) => (
                <div key={item.time + item.title} className="p-4 flex items-center">
                  <div className="w-24 text-sm font-medium">{item.time}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span 
                        className={`text-xs px-2 py-0.5 rounded-full font-medium
                          ${item.type === 'meeting' ? 'bg-blue-100 text-blue-800' : ''}
                          ${item.type === 'break' ? 'bg-amber-100 text-amber-800' : ''}
                          ${item.type === 'call' ? 'bg-orange-100 text-orange-800' : ''}
                          ${item.type === 'review' ? 'bg-green-100 text-green-800' : ''}
                        `}
                      >
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </span>
                      <h3 className="font-medium">{item.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">Duration: {item.duration}</p>
                  </div>
                  <Button size="sm" variant="ghost">Details</Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Calendar Section */}
        <div className="bg-white rounded-lg border shadow-sm">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-xl font-semibold">Calendar</h2>
            <div className="flex items-center space-x-1">
              <Button size="icon" variant="outline" className="size-8">
                <ChevronLeft className="size-4" />
              </Button>
              <Button size="icon" variant="outline" className="size-8">
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
          
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">{currentMonth} {currentYear}</h3>
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div key={day} className="text-sm font-medium text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, i) => (
                <button
                  key={i}
                  className={`
                    text-sm p-2 rounded-full 
                    ${!day.isCurrentMonth ? 'text-muted-foreground opacity-50' : ''}
                    ${day.isToday ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}
                  `}
                  disabled={!day.isCurrentMonth}
                >
                  {day.day > 0 ? day.day : day.day + 30}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 