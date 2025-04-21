
import { Member } from "@/models/Member";
import { memberService } from "@/services/MemberService";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

interface MembersTableProps {
  members: Member[];
  onMemberDeleted: () => void;
}

const MembersTable = ({ members, onMemberDeleted }: MembersTableProps) => {
  const handleDeleteMember = (id: string) => {
    if (confirm("هل أنت متأكد من رغبتك في حذف هذا العضو؟")) {
      memberService.deleteMember(id);
      toast.success("تم حذف العضو بنجاح");
      onMemberDeleted();
    }
  };

  return (
    <div className="overflow-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="py-3 px-4 text-right">الاسم</th>
            <th className="py-3 px-4 text-right">رقم الهاتف</th>
            <th className="py-3 px-4 text-right">البريد الإلكتروني</th>
            <th className="py-3 px-4 text-right">تاريخ الانضمام</th>
            <th className="py-3 px-4 text-right">الرتبة</th>
            <th className="py-3 px-4 text-right">القسم</th>
            <th className="py-3 px-4 text-center">إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {members.length === 0 ? (
            <tr>
              <td colSpan={7} className="py-8 text-center text-gray-500">
                لا يوجد أعضاء حالياً
              </td>
            </tr>
          ) : (
            members.map((member) => (
              <tr key={member.id} className="border-b border-gray-100">
                <td className="py-3 px-4 text-right">{member.name}</td>
                <td className="py-3 px-4 text-right">{member.phone}</td>
                <td className="py-3 px-4 text-right">{member.email}</td>
                <td className="py-3 px-4 text-right">{member.joinDate}</td>
                <td className="py-3 px-4 text-right">{member.rank}</td>
                <td className="py-3 px-4 text-right">{member.department}</td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => handleDeleteMember(member.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MembersTable;
