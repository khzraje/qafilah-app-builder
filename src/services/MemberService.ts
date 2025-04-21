
import { Member } from "@/models/Member";

// محاكاة لقاعدة بيانات محلية باستخدام localStorage
class MemberService {
  private readonly STORAGE_KEY = 'members';

  // جلب جميع الأعضاء
  getAllMembers(): Member[] {
    const members = localStorage.getItem(this.STORAGE_KEY);
    return members ? JSON.parse(members) : [];
  }

  // إضافة عضو جديد
  addMember(member: Omit<Member, 'id'>): Member {
    const members = this.getAllMembers();
    const newMember = {
      ...member,
      id: Date.now().toString()
    };
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify([...members, newMember]));
    return newMember;
  }

  // حذف عضو
  deleteMember(id: string): void {
    const members = this.getAllMembers();
    const updatedMembers = members.filter(member => member.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedMembers));
  }

  // البحث عن أعضاء
  searchMembers(query: string): Member[] {
    if (!query.trim()) return this.getAllMembers();
    
    const members = this.getAllMembers();
    const lowercaseQuery = query.toLowerCase();
    
    return members.filter(member => 
      member.name.toLowerCase().includes(lowercaseQuery) ||
      member.email.toLowerCase().includes(lowercaseQuery) ||
      member.phone.includes(query) ||
      member.department.toLowerCase().includes(lowercaseQuery) ||
      member.rank.toLowerCase().includes(lowercaseQuery)
    );
  }

  // تصدير الأعضاء إلى ملف CSV
  exportMembersToCSV(): string {
    const members = this.getAllMembers();
    if (members.length === 0) return '';
    
    const headers = ['الاسم', 'رقم الهاتف', 'البريد الإلكتروني', 'تاريخ الانضمام', 'الرتبة', 'القسم'];
    const csvRows = [
      headers.join(','),
      ...members.map(member => [
        member.name,
        member.phone,
        member.email,
        member.joinDate,
        member.rank,
        member.department
      ].join(','))
    ];
    
    return csvRows.join('\n');
  }
}

export const memberService = new MemberService();
