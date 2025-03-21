import { Card, CardContent } from "@/components/ui/card";

export default function AccountTableTitle() {
  return (
    <Card>
      <CardContent className="flex justify-between items-center p-2 md:p-4">
        <div className="text-xs md:text-base font-medium w-1/4 text-center">
          নাম
        </div>
        <div className="text-xs md:text-base font-medium w-1/4 text-center">
          পরিমাণ
        </div>
        <div className="text-xs md:text-base font-medium w-1/4 text-center">
          দাম
        </div>
        <div className="text-xs md:text-base font-medium w-1/4 text-center">
          মোট টাকা
        </div>
      </CardContent>
    </Card>
  );
}
