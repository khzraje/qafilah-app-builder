
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using MemberApp.Models;
using Newtonsoft.Json;

namespace MemberApp.Services
{
    public class MemberService
    {
        private const string STORAGE_FILE = "members.json";
        
        public List<Member> GetAllMembers()
        {
            if (!File.Exists(STORAGE_FILE))
                return new List<Member>();
                
            string json = File.ReadAllText(STORAGE_FILE);
            return string.IsNullOrEmpty(json) 
                ? new List<Member>() 
                : JsonConvert.DeserializeObject<List<Member>>(json);
        }
        
        public Member AddMember(Member member)
        {
            var members = GetAllMembers();
            member.Id = DateTime.Now.Ticks.ToString();
            members.Add(member);
            SaveMembers(members);
            return member;
        }
        
        public void DeleteMember(string id)
        {
            var members = GetAllMembers();
            var updatedMembers = members.Where(m => m.Id != id).ToList();
            SaveMembers(updatedMembers);
        }
        
        public List<Member> SearchMembers(string query)
        {
            if (string.IsNullOrWhiteSpace(query))
                return GetAllMembers();
                
            var members = GetAllMembers();
            query = query.ToLower();
            
            return members.Where(m => 
                m.Name.ToLower().Contains(query) ||
                m.Email.ToLower().Contains(query) ||
                m.Phone.Contains(query) ||
                m.Department.ToLower().Contains(query) ||
                m.Rank.ToLower().Contains(query)
            ).ToList();
        }
        
        public string ExportMembersToCSV()
        {
            var members = GetAllMembers();
            if (members.Count == 0)
                return string.Empty;
                
            var headers = new[] { "الاسم", "رقم الهاتف", "البريد الإلكتروني", "تاريخ الانضمام", "الرتبة", "القسم" };
            var sb = new StringBuilder();
            
            sb.AppendLine(string.Join(",", headers));
            
            foreach (var member in members)
            {
                sb.AppendLine($"{member.Name},{member.Phone},{member.Email},{member.JoinDate},{member.Rank},{member.Department}");
            }
            
            return sb.ToString();
        }
        
        private void SaveMembers(List<Member> members)
        {
            string json = JsonConvert.SerializeObject(members, Formatting.Indented);
            File.WriteAllText(STORAGE_FILE, json);
        }
    }
}
