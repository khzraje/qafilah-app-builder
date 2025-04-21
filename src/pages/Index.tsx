
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddMemberForm from "@/components/AddMemberForm";
import MembersTable from "@/components/MembersTable";
import { useEffect, useState } from "react";
import { Member } from "@/models/Member";
import { memberService } from "@/services/MemberService";
import { Button } from "@/components/ui/button";
import { Download, FilePlus, Search, Users } from "lucide-react";
import { Input } from "@/components/ui/input";

const Index = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("members");

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
      alert("لا يوجد أعضاء لتصديرهم");
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
    <div className="min-h-screen bg-white" dir="rtl">
      <div className="container max-w-7xl mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-qafilah-primary">نظام تسجيل الأعضاء</h1>
          <p className="text-gray-600 mt-2">سجل وأدر أعضاء منظمتك الخيرية بسهولة</p>
        </div>

        <div className="flex justify-end mb-4">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={exportMembers}
          >
            <Download size={18} />
            استيراد الأعضاء
          </Button>
        </div>

        <Tabs 
          defaultValue="members" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="bg-white rounded-lg shadow-sm border"
        >
          <div className="flex justify-between items-center p-4 border-b">
            <TabsList className="bg-qafilah-light">
              <TabsTrigger value="members" className="flex items-center gap-2">
                <Users size={18} />
                قائمة الأعضاء
              </TabsTrigger>
              <TabsTrigger value="add" className="flex items-center gap-2">
                <FilePlus size={18} />
                إضافة عضو جديد
              </TabsTrigger>
            </TabsList>

            {activeTab === "members" && (
              <div className="relative">
                <Search size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="بحث عن عضو..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="pr-10 w-64"
                />
              </div>
            )}
          </div>

          <TabsContent value="members" className="px-4 py-6">
            <MembersTable members={members} onMemberDeleted={loadMembers} />
          </TabsContent>

          <TabsContent value="add" className="px-4 py-6">
            <div className="max-w-md mx-auto">
              <AddMemberForm onMemberAdded={() => {
                loadMembers();
                setActiveTab("members");
              }} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
