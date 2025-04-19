"use client";

import { useState } from "react";
import { Bell, Search, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "next-themes";

interface HeaderProps {
  userName?: string;
}

export function Header({ userName = "Paul" }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search..."
            className="h-10 rounded-md border border-input bg-background px-9 py-2 text-sm"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
        </Button>
        <div className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            aria-label="Notifications" 
            onClick={toggleNotifications}
          >
            <Bell className="size-5" />
            <span className="absolute top-1 right-1 size-2 rounded-full bg-destructive"></span>
          </Button>

          {isNotificationOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-md border bg-background shadow-lg z-50">
              <div className="flex items-center justify-between p-3 border-b">
                <h3 className="font-medium">Notifications</h3>
                <Button variant="ghost" size="sm">Mark all as read</Button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                <div className="p-3 border-b hover:bg-muted/50 transition-colors">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Michael Chen</span> assigned you a task: "Update project timeline"
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 border-b hover:bg-muted/50 transition-colors bg-muted/20">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-gray-300"></div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Team Standup</span> meeting is starting in 10 minutes
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 border-b hover:bg-muted/50 transition-colors bg-muted/20">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-gray-300"></div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Sarah Johnson</span> commented on "Project proposal"
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-3 text-center">
                <a href="#" className="text-sm text-primary font-medium">View all notifications</a>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="/avatar.png" alt={userName} />
            <AvatarFallback>{userName.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
} 