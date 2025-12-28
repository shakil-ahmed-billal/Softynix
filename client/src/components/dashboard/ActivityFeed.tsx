import { Activity } from "@/lib/dashboard-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, RefreshCw, Download, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityFeedProps {
  activities: Activity[];
}

const activityIcons = {
  purchase: ShoppingBag,
  renewal: RefreshCw,
  download: Download,
  expiry: AlertCircle,
};

const activityColors = {
  purchase: "text-blue-600 bg-blue-50",
  renewal: "text-green-600 bg-green-50",
  download: "text-purple-600 bg-purple-50",
  expiry: "text-red-600 bg-red-50",
};

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activityIcons[activity.type];
            const colorClass = activityColors[activity.type];
            return (
              <div
                key={activity.id}
                className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div
                  className={cn(
                    "h-10 w-10 rounded-full flex items-center justify-center shrink-0",
                    colorClass
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(activity.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                {activity.amount && (
                  <div className="text-sm font-semibold">{activity.amount}</div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

