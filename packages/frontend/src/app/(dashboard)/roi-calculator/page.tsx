"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download } from "lucide-react";

export default function ROICalculatorPage() {
  const [activeTab, setActiveTab] = useState("calculator");

  // Initial values for the calculator
  const [teamSize, setTeamSize] = useState(5);
  const [hourlyRate, setHourlyRate] = useState(50);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [efficiencyGain, setEfficiencyGain] = useState(30);

  // Calculate ROI metrics
  const weeklyHoursSaved = (teamSize * hoursPerWeek * efficiencyGain) / 100;
  const monthlyCostSavings = weeklyHoursSaved * hourlyRate * 4; // 4 weeks in a month
  const annualCostSavings = monthlyCostSavings * 12;
  
  // Assuming annual subscription cost of $2,000
  const annualSubscriptionCost = 2000;
  const roi = ((annualCostSavings - annualSubscriptionCost) / annualSubscriptionCost) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">ROI Dashboard + Value Calculator</h1>
        <p className="text-muted-foreground">Quantify the benefits of Motion Magic for your team</p>
      </div>

      <Tabs defaultValue="calculator" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="comparisons">Comparisons</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Input Parameters */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-lg font-semibold">Input Parameters</h2>
                    <p className="text-sm text-muted-foreground">
                      Adjust the parameters to see how Motion Magic impacts your team
                    </p>
                  </div>

                  {/* Team Size Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Team Size</label>
                      <span className="text-sm">{teamSize} people</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="50" 
                      value={teamSize} 
                      onChange={(e) => setTeamSize(parseInt(e.target.value))}
                      className="w-full" 
                    />
                  </div>

                  {/* Hourly Rate */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Average Hourly Rate ($)</label>
                    <input 
                      type="number" 
                      value={hourlyRate} 
                      onChange={(e) => setHourlyRate(parseInt(e.target.value) || 0)}
                      className="w-full border rounded-md px-3 py-2 text-sm" 
                    />
                  </div>

                  {/* Hours Per Week Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Hours Per Week</label>
                      <span className="text-sm">{hoursPerWeek} hours</span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="60" 
                      value={hoursPerWeek} 
                      onChange={(e) => setHoursPerWeek(parseInt(e.target.value))}
                      className="w-full" 
                    />
                  </div>

                  {/* Efficiency Gain Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Efficiency Gain</label>
                      <span className="text-sm">{efficiencyGain}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="5" 
                      max="50" 
                      value={efficiencyGain} 
                      onChange={(e) => setEfficiencyGain(parseInt(e.target.value))}
                      className="w-full" 
                    />
                  </div>

                  <Button className="w-full" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export Calculations
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Value Summary */}
            <Card className="lg:col-span-2">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold">Value Summary</h2>
                    <p className="text-sm text-muted-foreground">
                      Your estimated savings and return on investment
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium text-muted-foreground">Weekly Hours Saved</h3>
                      <div className="text-3xl font-bold">{weeklyHoursSaved.toFixed(0)} hours</div>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-sm font-medium text-muted-foreground">Monthly Cost Savings</h3>
                      <div className="text-3xl font-bold">${monthlyCostSavings.toLocaleString()}</div>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-sm font-medium text-muted-foreground">Annual Cost Savings</h3>
                      <div className="text-3xl font-bold">${annualCostSavings.toLocaleString()}</div>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-sm font-medium text-muted-foreground">Return on Investment</h3>
                      <div className="text-3xl font-bold">{roi.toFixed(0)}%</div>
                    </div>
                  </div>

                  {/* Donut chart representation */}
                  <div className="grid place-items-center py-8">
                    <div className="relative w-48 h-48">
                      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        {/* Background circle */}
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="45" 
                          fill="none" 
                          stroke="#e5e7eb" 
                          strokeWidth="10" 
                        />
                        {/* Arc representing time saved */}
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="45" 
                          fill="none" 
                          stroke="#7c3aed" 
                          strokeWidth="10" 
                          strokeDasharray={`${efficiencyGain * 2.83} 283`} 
                          strokeDashoffset="0" 
                          transform="rotate(-90 50 50)" 
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <div className="text-sm text-muted-foreground">Time Saved: {efficiencyGain}%</div>
                        <div className="text-sm text-muted-foreground mt-1">Time Spent: {100 - efficiencyGain}%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">Reports Coming Soon</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  We're working on detailed ROI reports that will help you visualize and share your team's productivity gains.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparisons" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">Comparisons Coming Soon</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  We're building tools to help you compare your productivity with industry benchmarks and similar teams.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 