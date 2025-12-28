import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Mail, Phone, HelpCircle } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Support</h1>
        <p className="text-muted-foreground">
          Get help and contact our support team
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>Live Chat</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Chat with our support team
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Start Chat</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>Email Support</CardTitle>
                <p className="text-sm text-muted-foreground">
                  support@softynix.com
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" asChild>
              <a href="mailto:support@softynix.com">Send Email</a>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>Phone Support</CardTitle>
                <p className="text-sm text-muted-foreground">
                  +880 1234 567890
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" asChild>
              <a href="tel:+8801234567890">Call Now</a>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <HelpCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>Help Center</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Browse documentation
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              View Docs
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

