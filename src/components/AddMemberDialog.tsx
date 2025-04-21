
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { departments, ranks } from "@/models/Member";
import { memberService } from "@/services/MemberService";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface AddMemberDialogProps {
  open: boolean;
  onClose: () => void;
  onMemberAdded: () => void;
}

const AddMemberDialog = ({ open, onClose, onMemberAdded }: AddMemberDialogProps) => {
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
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4 text-qafilah-primary">
            إضافة عضو جديد
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-right block">الاسم</Label>
              <Input
                dir="rtl"
                id="name"
                placeholder="أدخل الاسم الكامل"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-right block">رقم الهاتف</Label>
              <Input
                dir="rtl"
                id="phone"
                placeholder="05xxxxxxxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-right block">البريد الإلكتروني</Label>
              <Input
                dir="rtl"
                type="email"
                id="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rank" className="text-right block">الرتبة</Label>
              <Select value={rank} onValueChange={setRank}>
                <SelectTrigger dir="rtl">
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

            <div className="space-y-2">
              <Label htmlFor="department" className="text-right block">القسم</Label>
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger dir="rtl">
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

            <div className="space-y-2">
              <Label htmlFor="joinDate" className="text-right block">تاريخ الانضمام</Label>
              <div className="relative">
                <Input
                  dir="rtl"
                  type="date"
                  id="joinDate"
                  value={joinDate}
                  onChange={(e) => setJoinDate(e.target.value)}
                />
                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 rtl:space-x-reverse">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              إلغاء
            </Button>
            <Button 
              type="submit"
              className="bg-qafilah-primary hover:bg-qafilah-hover"
            >
              إضافة عضو
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMemberDialog;
