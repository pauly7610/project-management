"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Pencil, Trash, UserPlus } from "lucide-react";

// Mock team members data
const teamMembers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "Admin",
    status: "Active",
    initials: "SA"
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@example.com",
    role: "Member",
    status: "Active",
    initials: "MI"
  },
  {
    id: 3,
    name: "Emily Wong",
    email: "emily.wong@example.com",
    role: "Member",
    status: "Active",
    initials: "EM"
  },
  {
    id: 4,
    name: "Daniel Kim",
    email: "daniel.kim@example.com",
    role: "Viewer",
    status: "Inactive",
    initials: "DA"
  }
];

// Mock pending invites
const pendingInvites: any[] = [];

export default function TeamManagementPage() {
  // eslint-disable-next-line no-unused-vars
  const [activeTab, setActiveTab] = useState("members");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Team Management</h1>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Invite Team Member
        </Button>
      </div>

      <Tabs defaultValue="team-members" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="team-members">Team Members ({teamMembers.length})</TabsTrigger>
          <TabsTrigger value="pending-invites">Pending Invites ({pendingInvites.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="team-members" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl font-semibold">Team Members</h2>
                  <p className="text-muted-foreground text-sm">
                    Manage your team members and their permissions.
                  </p>
                </div>

                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <div 
                      key={member.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{member.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{member.name}</h3>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium 
                          ${member.role === "Admin" ? "bg-purple-100 text-purple-800" : 
                            member.role === "Member" ? "bg-orange-100 text-orange-800" : 
                            "bg-blue-100 text-blue-800"}`}
                        >
                          {member.role}
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium 
                          ${member.status === "Active" ? "bg-green-100 text-green-800" : 
                            "bg-gray-100 text-gray-800"}`}
                        >
                          {member.status}
                        </div>
                        <div className="flex items-center">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending-invites" className="mt-6">
          <Card>
            <CardContent className="py-10">
              <div className="text-center">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    className="h-6 w-6 text-gray-500"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">No pending invites</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  You don't have any pending invites. Invite team members to collaborate.
                </p>
                <Button className="mt-4">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Invite Team Member
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 