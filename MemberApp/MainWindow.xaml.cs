
using System;
using System.Collections.ObjectModel;
using System.IO;
using System.Windows;
using System.Windows.Controls;
using MemberApp.Models;
using MemberApp.Services;
using Microsoft.Win32;

namespace MemberApp
{
    public partial class MainWindow : Window
    {
        private readonly MemberService _memberService;
        private ObservableCollection<Member> _members;
        
        public MainWindow()
        {
            InitializeComponent();
            _memberService = new MemberService();
            LoadMembers();
        }
        
        private void LoadMembers()
        {
            var members = _memberService.GetAllMembers();
            _members = new ObservableCollection<Member>(members);
            MembersDataGrid.ItemsSource = _members;
        }
        
        private void AddMemberButton_Click(object sender, RoutedEventArgs e)
        {
            var addMemberDialog = new AddMemberDialog();
            if (addMemberDialog.ShowDialog() == true)
            {
                Member newMember = addMemberDialog.MemberResult;
                _memberService.AddMember(newMember);
                LoadMembers();
                ShowToast("تم إضافة العضو بنجاح");
            }
        }
        
        private void ExportMembersButton_Click(object sender, RoutedEventArgs e)
        {
            var csv = _memberService.ExportMembersToCSV();
            
            if (string.IsNullOrEmpty(csv))
            {
                MessageBox.Show("لا يوجد أعضاء لتصديرهم", "تنبيه", MessageBoxButton.OK, MessageBoxImage.Information);
                return;
            }
            
            SaveFileDialog saveFileDialog = new SaveFileDialog
            {
                Filter = "CSV files (*.csv)|*.csv",
                FileName = "أعضاء_المنظمة.csv"
            };
            
            if (saveFileDialog.ShowDialog() == true)
            {
                File.WriteAllText(saveFileDialog.FileName, csv);
                ShowToast("تم تصدير الأعضاء بنجاح");
            }
        }
        
        private void SearchBox_TextChanged(object sender, TextChangedEventArgs e)
        {
            string query = SearchBox.Text;
            var filteredMembers = _memberService.SearchMembers(query);
            _members = new ObservableCollection<Member>(filteredMembers);
            MembersDataGrid.ItemsSource = _members;
        }
        
        private void DeleteMember_Click(object sender, RoutedEventArgs e)
        {
            if (sender is Button button && button.Tag is string memberId)
            {
                var result = MessageBox.Show("هل أنت متأكد من رغبتك في حذف هذا العضو؟", "تأكيد الحذف", 
                                            MessageBoxButton.YesNo, MessageBoxImage.Question);
                
                if (result == MessageBoxResult.Yes)
                {
                    _memberService.DeleteMember(memberId);
                    LoadMembers();
                    ShowToast("تم حذف العضو بنجاح");
                }
            }
        }
        
        private void ShowToast(string message)
        {
            var toast = new ToastNotification(message);
            toast.Show();
        }
    }
}
