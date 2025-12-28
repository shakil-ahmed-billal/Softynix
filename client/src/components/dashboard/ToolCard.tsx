import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreativeTool } from "@/lib/dashboard-data";
import { Download, FileText, Calendar } from "lucide-react";

interface ToolCardProps {
  tool: CreativeTool;
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{tool.toolName}</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">{tool.licenseType}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground">
              File Size
            </label>
            <p className="text-sm font-medium mt-1">{tool.fileSize}</p>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">
              Last Update
            </label>
            <div className="flex items-center gap-1 mt-1">
              <Calendar className="h-3 w-3 text-muted-foreground" />
              <p className="text-sm font-medium">
                {new Date(tool.lastUpdate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-2 border-t">
          <Button className="flex-1" asChild>
            <a href={tool.downloadUrl}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </a>
          </Button>
          {tool.usageGuideUrl && (
            <Button variant="outline" asChild>
              <a href={tool.usageGuideUrl}>
                <FileText className="h-4 w-4 mr-2" />
                Guide
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

