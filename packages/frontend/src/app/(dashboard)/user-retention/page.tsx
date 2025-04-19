import { Card, CardContent } from "@/components/ui/card";

export default function UserRetentionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Your Productivity Journey</h1>
        <p className="text-muted-foreground">Track your progress and discover new ways to boost your productivity</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={<CheckCircleIcon className="h-6 w-6 text-green-600" />}
          iconBg="bg-green-100"
          title="Tasks Completed"
          value="32/47"
          subtitle="68% completion rate"
        />

        <MetricCard
          icon={<ClockIcon className="h-6 w-6 text-blue-600" />}
          iconBg="bg-blue-100"
          title="Time Saved"
          value="6.5 hours"
          subtitle="Through automation & features"
        />

        <MetricCard
          icon={<FlameIcon className="h-6 w-6 text-purple-600" />}
          iconBg="bg-purple-100"
          title="Current Streak"
          value="4 days"
          subtitle="Keep it going!"
        />

        <MetricCard
          icon={<BarChartIcon className="h-6 w-6 text-yellow-600" />}
          iconBg="bg-yellow-100"
          title="Productivity Score"
          value="78/100"
          subtitle="Great"
        />
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <a 
            href="#" 
            className="border-primary text-primary border-b-2 py-2 px-1 text-sm font-medium"
          >
            Personal Insights
          </a>
          <a 
            href="#" 
            className="border-transparent text-muted-foreground hover:text-primary hover:border-primary border-b-2 py-2 px-1 text-sm font-medium"
          >
            Achievements
          </a>
          <a 
            href="#" 
            className="border-transparent text-muted-foreground hover:text-primary hover:border-primary border-b-2 py-2 px-1 text-sm font-medium"
          >
            Feature Highlights
          </a>
          <a 
            href="#" 
            className="border-transparent text-muted-foreground hover:text-primary hover:border-primary border-b-2 py-2 px-1 text-sm font-medium"
          >
            Learning Resources
          </a>
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Engagement Chart */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-1 mb-4">
              <h2 className="text-lg font-semibold">Your Activity</h2>
              <p className="text-sm text-muted-foreground">
                Track how your engagement affects your productivity
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-md font-medium">User Engagement Overview</h3>
              <p className="text-sm text-muted-foreground">Active vs. at-risk users over time</p>
              
              {/* Chart (simplified representation) */}
              <div className="h-64 border rounded-md flex items-end justify-between p-4">
                {[1200, 1350, 1450, 1700, 1850, 2000, 2250, 2600].map((value, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div 
                      className="w-8 bg-primary rounded-t" 
                      style={{ height: `${(value / 2600) * 100}%` }}
                    ></div>
                    <div className="w-8 bg-red-400 rounded-t" style={{ height: "10%" }}></div>
                    <div className="text-xs text-muted-foreground">
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'][i]}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-center space-x-6 text-xs">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-primary rounded-full mr-2"></div>
                  <span>Active Users</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
                  <span>At-Risk Users</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Productivity Tips */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-1 mb-6">
              <h2 className="text-lg font-semibold">Productivity Tips</h2>
              <p className="text-sm text-muted-foreground">
                Personalized suggestions to boost your workflow
              </p>
            </div>
            
            <div className="space-y-4">
              <TipCard 
                icon={<LightbulbIcon className="h-5 w-5" />}
                title="Try task batching"
                description="Based on your work patterns, grouping similar tasks could save you up to 45 minutes per day."
                actionLabel="Learn more"
              />
              
              <TipCard 
                icon={<ClockIcon className="h-5 w-5" />}
                title="Your most productive time"
                description="You complete 40% more tasks between 10am-12pm. Consider scheduling your most important work during this window."
                actionLabel="View time analysis"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({ icon, iconBg, title, value, subtitle }: any) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center">
          <div className={`mr-4 rounded-full p-2 ${iconBg}`}>
            {icon}
          </div>
          <div>
            <h3 className="text-sm text-muted-foreground font-medium">{title}</h3>
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TipCard({ icon, title, description, actionLabel }: any) {
  return (
    <div className="p-4 border rounded-lg bg-muted/30">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          {icon}
        </div>
        <div className="flex-grow">
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
          <a href="#" className="text-sm text-primary font-medium mt-2 inline-block">
            {actionLabel}
          </a>
        </div>
      </div>
    </div>
  );
}

// Icons (simplified for demo purposes)
function CheckCircleIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function ClockIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function FlameIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}

function BarChartIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  );
}

function LightbulbIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 18h6M10 22h4M12 2v1M12 7v1M4.93 4.93l.7.7M18.36 4.93l-.7.7M2 12h1M21 12h1M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
    </svg>
  );
} 