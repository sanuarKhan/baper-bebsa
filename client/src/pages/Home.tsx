import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

interface Account {
  id: number;
  customername: string;
  itemAmount: number;
  itemPrice: number;
  totalPrice: number;
  updatedAt: string;
}

export default function Home() {
  const [accounts, setAccounts] = useState<Account[]>([]);

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const todayDate = `${year}-${month}-${day}`;

  useEffect(() => {
    const fetchAccountDate = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/${todayDate}/accounts`
        );

        setAccounts(response.data);
      } catch (error) {
        console.error("Error fetching account date:", error);
      }
    };

    fetchAccountDate();
  }, [todayDate]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-sidebar p-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-sidebar-foreground">
            Dashboard
          </h2>
          <nav className="space-y-2">
            <Link
              to="/"
              className="flex items-center space-x-2 rounded-lg bg-sidebar-accent px-3 py-2 text-sidebar-accent-foreground"
            >
              <span>Home</span>
            </Link>
            <Link
              to="/accounts"
              className="flex items-center space-x-2 rounded-lg px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <span>Accounts</span>
            </Link>
            <Link
              to="/settings"
              className="flex items-center space-x-2 rounded-lg px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <span>Settings</span>
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
            <Link to="/new-account">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Create New Account
              </Button>
            </Link>
          </div>

          {/* Recent Accounts */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Accounts</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {accounts.map((account) => (
                    <div
                      key={account.id}
                      className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent"
                    >
                      <div>
                        <h3 className="font-medium">{account.customername}</h3>
                        <p className="text-sm text-muted-foreground">
                          Last updated: {moment(account.updatedAt).fromNow()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{account.totalPrice}</p>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
