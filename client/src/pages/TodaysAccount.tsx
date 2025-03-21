import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import AccountTableTitle from "@/components/AccountTableTittle";

interface AccountEntry {
  id: string;
  customername: string;
  itemAmount: number;
  itemPrice: number;
  totalPrice: number;
  createdAt: string;
}

export default function TodaysAccount() {
  const [entries, setEntries] = useState<AccountEntry[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [itemAmount, setItemAmount] = useState("");
  const [itemPrice, setItemPrice] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/account-create",
        {
          customername: customerName,
          itemAmount: Number(itemAmount),
          itemPrice: Number(itemPrice),
        }
      );

      const newEntry = response.data;
      setEntries((prev) => [newEntry, ...prev]);

      // Clear form
      setCustomerName("");
      setItemAmount("");
      setItemPrice("");
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  useEffect(() => {
    const fetchTodayAccounts = async () => {
      try {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        const todayDate = `${year}-${month}-${day}`;

        const response = await axios.get(
          `http://localhost:8080/api/${todayDate}/accounts`
        );

        setEntries(response.data);
        // setEntries(response.data);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchTodayAccounts();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <Link
        to="/"
        className="mb-4 inline-flex items-center text-primary hover:text-primary/80"
      >
        <span>← হোমে ফিরে যান</span>
      </Link>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>নতুন হিসাব যোগ করুন</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                placeholder="গ্রাহকের নাম দিন"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                type="number"
                placeholder="পণ্যের পরিমাণ দিন"
                value={itemAmount}
                onChange={(e) => setItemAmount(e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                type="number"
                placeholder="পণ্যের দাম দিন"
                value={itemPrice}
                onChange={(e) => setItemPrice(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              সংযোগ করুন
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>আজকের হিসাব</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              <AccountTableTitle />
              {entries.map((entry) => (
                <Card key={entry.id}>
                  <CardContent className="flex justify-between items-center p-2 md:p-4 hover:bg-accent">
                    <div className="text-xs md:text-base w-1/4 text-center">
                      {entry.customername}
                    </div>
                    <div className="text-xs md:text-base w-1/4 text-center">
                      {entry.itemAmount}
                    </div>
                    <div className="text-xs md:text-base w-1/4 text-center">
                      {entry.itemPrice}
                    </div>
                    <div className="text-xs md:text-base w-1/4 text-center relative">
                      {entry.totalPrice}
                      <span className="text-xs text-muted-foreground mt-1 absolute end-0 top-7">
                        Last updated: {moment(entry.createdAt).calendar()}
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
  );
}
