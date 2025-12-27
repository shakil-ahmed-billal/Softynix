"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Download, Trash2, Plus } from "lucide-react";

const savedCards = [
  {
    id: "1",
    type: "Visa",
    last4: "4242",
    expiry: "12/25",
    isDefault: true,
  },
  {
    id: "2",
    type: "Mastercard",
    last4: "8888",
    expiry: "06/26",
    isDefault: false,
  },
];

const invoices = [
  {
    id: "INV-001",
    date: "2024-01-15",
    amount: "৳1,100",
    status: "paid",
  },
  {
    id: "INV-002",
    date: "2024-01-10",
    amount: "৳1,299",
    status: "paid",
  },
  {
    id: "INV-003",
    date: "2024-01-05",
    amount: "৳899",
    status: "paid",
  },
];

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Billing & Cards</h1>
        <p className="text-muted-foreground">
          Manage your payment methods and view invoices
        </p>
      </div>

      {/* Saved Cards */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Saved Cards</CardTitle>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Card
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {savedCards.map((card) => (
            <div
              key={card.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-16 bg-muted rounded flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">
                      {card.type} •••• {card.last4}
                    </p>
                    {card.isDefault && (
                      <Badge variant="secondary" className="text-xs">
                        Default
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Expires {card.expiry}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                {!card.isDefault && (
                  <Button variant="outline" size="sm">
                    Set Default
                  </Button>
                )}
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Invoices */}
      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <p className="font-medium">{invoice.id}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(invoice.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-semibold">{invoice.amount}</p>
                  <Badge variant="default">{invoice.status}</Badge>
                  <Button variant="outline" size="sm" asChild>
                    <a href="#">
                      <Download className="h-4 w-4 mr-2" />
                      PDF
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

