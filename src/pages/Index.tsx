
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MembersTable from "@/components/MembersTable";
import { useEffect, useState } from "react";
import { Member } from "@/models/Member";
import { memberService } from "@/services/MemberService";
import { Button } from "@/components/ui/button";
import { Download, FilePlus, Search, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import AddMemberDialog from "@/components/AddMemberDialog";

const Index = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);

  const loadMembers = () => {
    setMembers(memberService.getAllMembers());
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setMembers(memberService.searchMembers(query));
  };

  const exportMembers = () => {
    const csv = memberService.exportMembersToCSV();
    if (!csv) {
      toast.error("لا يوجد أعضاء لتصديرهم");
      return;
    }

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "أعضاء_المنظمة.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    loadMembers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50" dir="rtl">
      <div className="container max-w-7xl mx-auto py-8 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-qafilah-primary mb-3">نظام تسجيل الأعضاء</h1>
          <p className="text-gray-600 text-lg">سجل وأدر أعضاء منظمتك بكل سهولة</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <div className="flex items-center gap-4">
              <Button 
                onClick={() => setIsAddMemberOpen(true)}
                className="bg-qafilah-primary hover:bg-qafilah-hover flex items-center gap-2"
              >
                <FilePlus size={18} />
                إضافة عضو جديد
              </Button>

              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={exportMembers}
              >
                <Download size={18} />
                تصدير الأعضاء
              </Button>
            </div>

            <div className="relative w-full sm:w-auto">
              <Search size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="بحث عن عضو..."
                value={searchQuery}
                onChange={handleSearch}
                className="pr-10 w-full sm:w-64"
              />
            </div>
          </div>

          <MembersTable members={members} onMemberDeleted={loadMembers} />
        </div>

        <AddMemberDialog 
          open={isAddMemberOpen}
          onClose={() => setIsAddMemberOpen(false)}
          onMemberAdded={loadMembers}
        />
      </div>
    </div>
  );
};

export default Index;
