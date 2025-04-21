"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "next-themes";
import { 
  BellRing,
  Calendar,
  FileText,
  Globe,
  HardDrive,
  Key,
  LayoutGrid,
  Mail,
  Shield,
  Workflow,
  Upload,
  Download
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const { theme, setTheme } = useTheme();

  const tabs = [
    { id: "general", label: "General", icon: LayoutGrid },
    { id: "preferences", label: "Preferences", icon: Workflow },
    { id: "notifications", label: "Notifications", icon: BellRing },
    { id: "meeting-alerts", label: "Meeting Alerts", icon: Calendar },
    { id: "email", label: "Email", icon: Mail },
    { id: "integrations", label: "Integrations", icon: Globe },
    { id: "data", label: "Data", icon: HardDrive },
    { id: "api", label: "API", icon: Key },
    { id: "security", label: "Security", icon: Shield }
  ];

  // Switch toggle component
  interface ToggleProps {
    label: string;
    description?: string;
    defaultChecked?: boolean;
  }

  const Toggle = ({ label, description, defaultChecked = false }: ToggleProps) => (
    <div className="flex items-center justify-between py-2">
      <div>
        <div className="font-medium text-sm">{label}</div>
        {description && <div className="text-xs text-muted-foreground">{description}</div>}
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" defaultChecked={defaultChecked} />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary peer-focus:ring-2 peer-focus:ring-primary"></div>
      </label>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and settings</p>
      </div>

      <div className="hidden md:flex space-x-2 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-3 py-2 text-sm font-medium transition-colors border-b-2 ${
              activeTab === tab.id 
                ? "border-primary text-primary" 
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <tab.icon className="mr-2 h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="md:hidden">
        <select 
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-sm"
        >
          {tabs.map((tab) => (
            <option key={tab.id} value={tab.id}>{tab.label}</option>
          ))}
        </select>
      </div>

      <div>
        {/* General Settings */}
        {activeTab === "general" && (
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold">General Settings</h2>
                  <p className="text-sm text-muted-foreground">
                    Manage your account information and preferences
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <input 
                      type="text" 
                      defaultValue="Sarah Thompson" 
                      className="w-full border rounded-md px-3 py-2 text-sm" 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <input 
                      type="email" 
                      defaultValue="sarah@example.com" 
                      className="w-full border rounded-md px-3 py-2 text-sm" 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Company</label>
                    <input 
                      type="text" 
                      defaultValue="Acme Inc." 
                      className="w-full border rounded-md px-3 py-2 text-sm" 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Job Title</label>
                    <input 
                      type="text" 
                      defaultValue="Project Manager" 
                      className="w-full border rounded-md px-3 py-2 text-sm" 
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-md font-medium">Preferences</h3>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Time Zone</label>
                    <select className="w-full border rounded-md px-3 py-2 text-sm">
                      <option>America/New_York</option>
                      <option>America/Chicago</option>
                      <option>America/Denver</option>
                      <option>America/Los_Angeles</option>
                      <option>Europe/London</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date Format</label>
                    <select className="w-full border rounded-md px-3 py-2 text-sm">
                      <option>MM/DD/YYYY</option>
                      <option>DD/MM/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Language</label>
                    <select className="w-full border rounded-md px-3 py-2 text-sm">
                      <option>en-US</option>
                      <option>es-ES</option>
                      <option>fr-FR</option>
                      <option>de-DE</option>
                      <option>ja-JP</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-md font-medium">Privacy</h3>
                  
                  <Toggle 
                    label="Usage Analytics" 
                    description="Allow us to collect usage data to improve your experience"
                    defaultChecked={true}
                  />

                  <Toggle 
                    label="Marketing Emails" 
                    description="Receive emails about new features and tips"
                    defaultChecked={true}
                  />
                </div>

                <div className="pt-4 flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Preferences */}
        {activeTab === "preferences" && (
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold">Dashboard Preferences</h2>
                  <p className="text-sm text-muted-foreground">
                    Customize how your dashboard looks and behaves
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-md font-medium">Theme Settings</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="radio" id="light" name="theme" className="mr-2" onChange={() => setTheme("light")} checked={theme === "light"} />
                      <label htmlFor="light" className="text-sm font-medium">Light</label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" id="dark" name="theme" className="mr-2" onChange={() => setTheme("dark")} checked={theme === "dark"} />
                      <label htmlFor="dark" className="text-sm font-medium">Dark</label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" id="system" name="theme" className="mr-2" onChange={() => setTheme("system")} checked={theme === "system"} />
                      <label htmlFor="system" className="text-sm font-medium">System</label>
                    </div>
                  </div>

                  <h3 className="text-md font-medium">Dashboard Layout</h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="radio" id="compact" name="layout" className="mr-2" />
                      <label htmlFor="compact" className="text-sm font-medium">Compact - More items, less detail</label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" id="standard" name="layout" className="mr-2" defaultChecked />
                      <label htmlFor="standard" className="text-sm font-medium">Standard - Balanced view</label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" id="expanded" name="layout" className="mr-2" />
                      <label htmlFor="expanded" className="text-sm font-medium">Expanded - Fewer items, more detail</label>
                    </div>
                  </div>

                  <h3 className="text-md font-medium">Default Dashboard Tab</h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="radio" id="overview" name="defaultTab" className="mr-2" defaultChecked />
                      <label htmlFor="overview" className="text-sm font-medium">Overview</label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" id="tasks" name="defaultTab" className="mr-2" />
                      <label htmlFor="tasks" className="text-sm font-medium">My Tasks</label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" id="schedule" name="defaultTab" className="mr-2" />
                      <label htmlFor="schedule" className="text-sm font-medium">Today's Schedule</label>
                    </div>
                  </div>

                  <h3 className="text-md font-medium">Card Color Scheme</h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="radio" id="default" name="colorScheme" className="mr-2" defaultChecked />
                      <label htmlFor="default" className="text-sm font-medium">Default</label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" id="vibrant" name="colorScheme" className="mr-2" />
                      <label htmlFor="vibrant" className="text-sm font-medium">Vibrant</label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" id="subtle" name="colorScheme" className="mr-2" />
                      <label htmlFor="subtle" className="text-sm font-medium">Subtle</label>
                    </div>
                  </div>

                  <div className="pt-4 space-y-4">
                    <Toggle 
                      label="Show Completed Tasks" 
                      description="Display completed tasks in task lists"
                      defaultChecked={true}
                    />

                    <Toggle 
                      label="Task Reminder Notifications" 
                      description="Receive notifications for task reminders"
                      defaultChecked={true}
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <Button>Save Preferences</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Notifications */}
        {activeTab === "notifications" && (
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold">Notification Settings</h2>
                  <p className="text-sm text-muted-foreground">
                    Configure how and when you receive notifications
                  </p>
                </div>

                <div className="space-y-6">
                  <h3 className="text-md font-medium">Email Notifications</h3>
                  
                  <div className="space-y-4">
                    <Toggle 
                      label="Product Updates" 
                      description="New features and improvements"
                      defaultChecked={true}
                    />

                    <Toggle 
                      label="Team Activity" 
                      description="When team members take actions"
                      defaultChecked={true}
                    />

                    <Toggle 
                      label="Project Alerts" 
                      description="Important updates to your projects"
                      defaultChecked={true}
                    />

                    <Toggle 
                      label="Security Alerts" 
                      description="Important security-related notifications"
                      defaultChecked={true}
                    />
                  </div>

                  <h3 className="text-md font-medium">In-App Notifications</h3>
                  
                  <div className="space-y-4">
                    <Toggle 
                      label="Task Assignments" 
                      description="When tasks are assigned to you"
                      defaultChecked={true}
                    />

                    <Toggle 
                      label="Task Updates" 
                      description="When tasks are updated or completed"
                      defaultChecked={true}
                    />

                    <Toggle 
                      label="Mentions" 
                      description="When you are mentioned in comments"
                      defaultChecked={true}
                    />

                    <Toggle 
                      label="Reminders" 
                      description="Task and deadline reminders"
                      defaultChecked={true}
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <Button>Save Preferences</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Meeting Alerts */}
        {activeTab === "meeting-alerts" && (
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold">Meeting Notifications</h2>
                  <p className="text-sm text-muted-foreground">
                    Control how you receive notifications about upcoming meetings and generated notes
                  </p>
                </div>

                <div className="space-y-6">
                  <h3 className="text-md font-medium">Upcoming Meetings</h3>
                  
                  <div className="space-y-4">
                    <Toggle 
                      label="Email reminders" 
                      description="Receive email reminders before scheduled meetings"
                      defaultChecked={false}
                    />

                    <Toggle 
                      label="Browser notifications" 
                      description="Show browser notifications 5 minutes before meetings"
                      defaultChecked={false}
                    />
                  </div>

                  <h3 className="text-md font-medium">Meeting Summaries</h3>
                  
                  <div className="space-y-4">
                    <Toggle 
                      label="Email summaries" 
                      description="Send meeting notes and summaries to your email"
                      defaultChecked={false}
                    />

                    <Toggle 
                      label="Slack notifications" 
                      description="Send meeting summaries to your Slack workspace"
                      defaultChecked={false}
                    />

                    <Toggle 
                      label="Action items to task list" 
                      description="Automatically add action items to your task list"
                      defaultChecked={false}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Email */}
        {activeTab === "email" && (
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold">Email Notifications</h2>
                  <p className="text-sm text-muted-foreground">
                    Manage which emails you receive
                  </p>
                </div>

                <div className="space-y-4">
                  <Toggle 
                    label="Task Due Reminders" 
                    description="Receive an email when a task is approaching its due date"
                    defaultChecked={true}
                  />

                  <Toggle 
                    label="Task Assignments" 
                    description="Receive an email when a task is assigned to you"
                    defaultChecked={true}
                  />

                  <Toggle 
                    label="Task Status Updates" 
                    description="Receive an email when the status of your task changes"
                    defaultChecked={false}
                  />

                  <Toggle 
                    label="Weekly Digest" 
                    description="Receive a weekly summary of your tasks and activities"
                    defaultChecked={true}
                  />

                  <Toggle 
                    label="Daily Reminders" 
                    description="Receive a daily email with your tasks for the day"
                    defaultChecked={false}
                  />

                  <Toggle 
                    label="Meeting Notifications" 
                    description="Receive an email when a meeting is scheduled or changed"
                    defaultChecked={true}
                  />

                  <Toggle 
                    label="Meeting Summary" 
                    description="Receive an email with a summary after a meeting is completed"
                    defaultChecked={true}
                  />
                </div>

                <div className="pt-4 flex justify-end">
                  <Button>Save Notification Settings</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Integrations */}
        {activeTab === "integrations" && (
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold">Integrations</h2>
                  <p className="text-sm text-muted-foreground">
                    Connect Motion Magic with your other tools and services
                  </p>
                </div>

                <div className="space-y-6">
                  <h3 className="text-md font-medium">Connected Services</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-md mr-3">
                          <Calendar className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Google Calendar</h4>
                          <p className="text-xs text-muted-foreground">Connected as sarah@example.com</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Disconnect</Button>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center">
                        <div className="bg-purple-100 p-2 rounded-md mr-3">
                          <div className="h-5 w-5 text-purple-600">#</div>
                        </div>
                        <div>
                          <h4 className="font-medium">Slack</h4>
                          <p className="text-xs text-muted-foreground">Connected to Acme Inc. workspace</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Disconnect</Button>
                    </div>
                  </div>

                  <h3 className="text-md font-medium pt-4">Available Integrations</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-md mr-3">
                          <div className="h-5 w-5 text-blue-600">A</div>
                        </div>
                        <div>
                          <h4 className="font-medium">Asana</h4>
                          <p className="text-xs text-muted-foreground">Connect to your Asana projects</p>
                        </div>
                      </div>
                      <Button variant="default" size="sm">Connect</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Data */}
        {activeTab === "data" && (
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold">Import & Export</h2>
                  <p className="text-sm text-muted-foreground">
                    Manage your data
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-md p-4 flex flex-col items-center">
                    <FileText className="h-8 w-8 text-gray-500 mb-2" />
                    <h3 className="font-medium">Export as CSV</h3>
                    <p className="text-xs text-muted-foreground text-center mb-4">
                      Download your tasks and projects as a spreadsheet
                    </p>
                    <Button variant="outline" className="w-full">Export as CSV</Button>
                  </div>

                  <div className="border rounded-md p-4 flex flex-col items-center">
                    <div className="h-8 w-8 text-gray-500 mb-2">
                      <Download className="h-5 w-5 text-gray-500" />
                    </div>
                    <h3 className="font-medium">Export as JSON</h3>
                    <p className="text-xs text-muted-foreground text-center mb-4">
                      Download your data in JSON format
                    </p>
                    <Button variant="outline" className="w-full">Export as JSON</Button>
                  </div>
                </div>

                <div className="bg-blue-950 rounded-md p-4 mt-6 flex items-center justify-between">
                  <div className="flex items-center">
                    <Upload className="h-5 w-5 text-white mr-3" />
                    <div>
                      <h3 className="font-medium text-white">Import Tasks</h3>
                      <p className="text-xs text-blue-200">
                        Supports JSON format only. Make sure your file follows the correct format.
                      </p>
                    </div>
                  </div>
                  <Button className="bg-white text-blue-950 hover:bg-gray-100">Import</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* API */}
        {activeTab === "api" && (
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold">API Settings</h2>
                  <p className="text-sm text-muted-foreground">
                    Manage your API keys and access permissions
                  </p>
                </div>

                <div className="space-y-6">
                  <h3 className="text-md font-medium">API Keys</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="text-sm font-medium">Production Key</h4>
                          <p className="text-xs text-muted-foreground">Last used 2 days ago</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Copy</Button>
                          <Button variant="outline" size="sm">Regenerate</Button>
                        </div>
                      </div>
                      <div className="bg-gray-100 p-2 rounded text-sm font-mono">••••••••••••••••••••••••</div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="text-sm font-medium">Development Key</h4>
                          <p className="text-xs text-muted-foreground">Last used 5 hours ago</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Copy</Button>
                          <Button variant="outline" size="sm">Regenerate</Button>
                        </div>
                      </div>
                      <div className="bg-gray-100 p-2 rounded text-sm font-mono">••••••••••••••••••••••••</div>
                    </div>
                  </div>

                  <h3 className="text-md font-medium mt-6">API Permissions</h3>
                  
                  <div className="space-y-4">
                    <Toggle 
                      label="Read Access" 
                      description="Allow reading data from your account"
                      defaultChecked={true}
                    />

                    <Toggle 
                      label="Write Access" 
                      description="Allow creating and updating data"
                      defaultChecked={true}
                    />

                    <Toggle 
                      label="Delete Access" 
                      description="Allow deleting data from your account"
                      defaultChecked={false}
                    />
                  </div>

                  <h3 className="text-md font-medium mt-6">Webhooks</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Configure webhooks to receive real-time notifications
                  </p>
                  <Button variant="outline">Configure Webhooks</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Security */}
        {activeTab === "security" && (
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold">Enable Two-Factor Authentication</h2>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>

                <p className="text-sm">
                  Two-factor authentication adds an additional security layer to your account. Once enabled, you'll need both your password and a verification code from your authenticator app to sign in.
                </p>

                <div className="pt-4 flex justify-center">
                  <Button className="bg-blue-950 hover:bg-blue-900">Setup Two-Factor Authentication</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 