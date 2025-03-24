import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import AccountTableTitle from "@/components/AccountTableTittle";

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
  const [isOpen, setIsOpen] = useState(true);

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
      <aside
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-200 ease-in-out w-64 border-r bg-sidebar p-6`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden absolute right-4 top-4 text-sidebar-foreground"
        >
          {isOpen ? "X" : "≡"}
        </button>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-sidebar-foreground">
            ড্যাসবোর্ড
          </h2>
          <nav className="space-y-2">
            <Link
              to="/"
              className="flex items-center space-x-2 rounded-lg bg-sidebar-accent px-3 py-2 text-sidebar-accent-foreground"
            >
              <span>হোম</span>
            </Link>
            <Link
              to="/accounts"
              className="flex items-center space-x-2 rounded-lg px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <span>হিসাবসমূহ </span>
            </Link>
            <Link
              to="/accounts"
              className="flex items-center space-x-2 rounded-lg px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <span>লেনদেন </span>
            </Link>
            <Link
              to="/settings"
              className="flex items-center space-x-2 rounded-lg px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <span>সেটিং</span>
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">
              আপনার ব্যবসার উন্নতি কামনা করছি
            </h1>
            <Link to="/new-account">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                নতুন হিসাব খুলুন
              </Button>
            </Link>
          </div>

          {/* Recent Accounts */}
          <Card>
            <CardHeader>
              <CardTitle>সাম্প্রতিক হিসাব সমূহ</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  <AccountTableTitle />
                  {accounts.map((account) => (
                    <Card key={account.id}>
                      <CardContent className="flex justify-between items-center p-2 md:p-4 hover:bg-accent">
                        <div className="text-xs md:text-base w-1/4 text-center">
                          {account.customername}
                        </div>
                        <div className="text-xs md:text-base w-1/4 text-center">
                          {account.itemAmount}
                        </div>
                        <div className="text-xs md:text-base w-1/4 text-center">
                          {account.itemPrice}
                        </div>
                        <div className="text-xs md:text-base w-1/4 text-center relative">
                          {account.totalPrice}
                          <span className="text-xs text-muted-foreground mt-1 absolute end-0 top-7">
                            সময়: {moment(account.updatedAt).fromNow()}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
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
