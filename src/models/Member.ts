
export interface Member {
  id: string;
  name: string;
  phone: string;
  email: string;
  joinDate: string;
  rank: string;
  department: string;
}

export const ranks = [
  "متطوع",
  "عضو",
  "رئيس قسم",
  "نائب مدير",
  "مدير"
];

export const departments = [
  "الإدارة",
  "التطوع",
  "العلاقات العامة",
  "الإعلام",
  "البرامج",
  "التسويق"
];
