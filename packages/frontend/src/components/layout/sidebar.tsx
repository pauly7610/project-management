import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  BarChart2, 
  Calendar, 
  ListTodo, 
  FileSpreadsheet, 
  Users, 
  User, 
  FileText, 
  Calculator, 
  Settings 
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: BarChart2,
  },
  {
    title: "Agenda",
    href: "/agenda",
    icon: FileSpreadsheet,
  },
  {
    title: "Calendar",
    href: "/calendar",
    icon: Calendar,
  },
  {
    title: "My Tasks",
    href: "/my-tasks",
    icon: ListTodo,
  },
  {
    title: "All Tasks",
    href: "/all-tasks",
    icon: ListTodo,
  },
  {
    title: "All Projects",
    href: "/all-projects",
    icon: FileSpreadsheet,
  },
  {
    title: "Team Schedule",
    href: "/team-schedule",
    icon: Calendar,
  },
  {
    title: "Team Management",
    href: "/team-management",
    icon: Users,
  },
  {
    title: "AI Meeting Notes",
    href: "/ai-meeting-notes",
    icon: FileText,
  },
  {
    title: "ROI Calculator",
    href: "/roi-calculator",
    icon: Calculator,
  },
  {
    title: "User Retention",
    href: "/user-retention",
    icon: User,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className={cn("flex flex-col h-screen w-64 bg-blue-950 text-white", className)}>
      <div className="flex items-center px-4 py-5 bg-blue-800">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-6 mr-2"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
        <h1 className="text-xl font-bold">Motion Magic</h1>
      </div>
      
      <div className="flex-1 overflow-auto py-2">
        <nav className="space-y-1 px-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive 
                    ? "bg-blue-700 text-white" 
                    : "text-blue-100 hover:bg-blue-800 hover:text-white"
                )}
              >
                <item.icon className="size-5 mr-3" />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
} 