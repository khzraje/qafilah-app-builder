
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { departments, ranks } from "@/models/Member";
import { memberService } from "@/services/MemberService";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface AddMemberFormProps {
  onMemberAdded: () => void;
}

const AddMemberForm = ({ onMemberAdded }: AddMemberFormProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [rank, setRank] = useState("");
  const [department, setDepartment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !phone || !email || !joinDate || !rank || !department) {
      toast.error("يرجى تعبئة جميع الحقول المطلوبة");
      return;
    }

    memberService.addMember({
      name,
      phone,
      email,
      joinDate,
      rank,
      department
    });

    // تنظيف الحقول
    setName("");
    setPhone("");
    setEmail("");
    setJoinDate("");
    setRank("");
    setDepartment("");
    
    toast.success("تم إضافة العضو بنجاح");
    onMemberAdded();
  };

  return (
    <Card className="w-full shadow-none">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-right block">الاسم</Label>
            <Input
              dir="rtl"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-right block">رقم الهاتف</Label>
            <Input
              dir="rtl"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-right block">البريد الإلكتروني</Label>
            <Input
              dir="rtl"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="rank" className="text-right block">الرتبة</Label>
            <Select 
              value={rank} 
              onValueChange={setRank}
            >
              <SelectTrigger dir="rtl" className="mt-1">
                <SelectValue placeholder="اختر الرتبة" />
              </SelectTrigger>
              <SelectContent>
                {ranks.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="department" className="text-right block">القسم</Label>
            <Select 
              value={department} 
              onValueChange={setDepartment}
            >
              <SelectTrigger dir="rtl" className="mt-1">
                <SelectValue placeholder="اختر القسم" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="joinDate" className="text-right block">تاريخ الانضمام</Label>
            <div className="relative">
              <Input
                dir="rtl"
                type="date"
                id="joinDate"
                value={joinDate}
                onChange={(e) => setJoinDate(e.target.value)}
                className="mt-1"
              />
              <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-qafilah-primary hover:bg-qafilah-hover"
          >
            إضافة عضو جديد
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddMemberForm;
