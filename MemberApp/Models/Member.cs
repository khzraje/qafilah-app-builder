
using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace MemberApp.Models
{
    public class Member : INotifyPropertyChanged
    {
        private string _id;
        private string _name;
        private string _phone;
        private string _email;
        private string _joinDate;
        private string _rank;
        private string _department;

        public string Id 
        { 
            get => _id; 
            set 
            { 
                _id = value; 
                OnPropertyChanged(nameof(Id)); 
            } 
        }

        public string Name 
        { 
            get => _name; 
            set 
            { 
                _name = value; 
                OnPropertyChanged(nameof(Name)); 
            } 
        }

        public string Phone 
        { 
            get => _phone; 
            set 
            { 
                _phone = value; 
                OnPropertyChanged(nameof(Phone)); 
            } 
        }

        public string Email 
        { 
            get => _email; 
            set 
            { 
                _email = value; 
                OnPropertyChanged(nameof(Email)); 
            } 
        }

        public string JoinDate 
        { 
            get => _joinDate; 
            set 
            { 
                _joinDate = value; 
                OnPropertyChanged(nameof(JoinDate)); 
            } 
        }

        public string Rank 
        { 
            get => _rank; 
            set 
            { 
                _rank = value; 
                OnPropertyChanged(nameof(Rank)); 
            } 
        }

        public string Department 
        { 
            get => _department; 
            set 
            { 
                _department = value; 
                OnPropertyChanged(nameof(Department)); 
            } 
        }

        public event PropertyChangedEventHandler PropertyChanged;

        protected void OnPropertyChanged(string propertyName)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }
    }

    public static class MemberConstants
    {
        public static readonly List<string> Ranks = new List<string>
        {
            "متطوع",
            "عضو",
            "رئيس قسم",
            "نائب مدير",
            "مدير"
        };

        public static readonly List<string> Departments = new List<string>
        {
            "الإدارة",
            "التطوع",
            "العلاقات العامة",
            "الإعلام",
            "البرامج",
            "التسويق"
        };
    }
}
