
using System;
using System.Linq;
using System.Windows;
using MemberApp.Models;

namespace MemberApp
{
    public partial class AddMemberDialog : Window
    {
        public Member MemberResult { get; private set; }
        
        public AddMemberDialog()
        {
            InitializeComponent();
            
            // Load ranks and departments
            RankComboBox.ItemsSource = MemberConstants.Ranks;
            DepartmentComboBox.ItemsSource = MemberConstants.Departments;
            
            // Set default date to today
            JoinDatePicker.SelectedDate = DateTime.Today;
        }
        
        private void AddMemberButton_Click(object sender, RoutedEventArgs e)
        {
            if (ValidateForm())
            {
                MemberResult = new Member
                {
                    Name = NameTextBox.Text,
                    Phone = PhoneTextBox.Text,
                    Email = EmailTextBox.Text,
                    JoinDate = JoinDatePicker.SelectedDate?.ToString("yyyy-MM-dd") ?? DateTime.Today.ToString("yyyy-MM-dd"),
                    Rank = RankComboBox.SelectedItem?.ToString() ?? "",
                    Department = DepartmentComboBox.SelectedItem?.ToString() ?? ""
                };
                
                DialogResult = true;
                Close();
            }
        }
        
        private void CancelButton_Click(object sender, RoutedEventArgs e)
        {
            DialogResult = false;
            Close();
        }
        
        private bool ValidateForm()
        {
            if (string.IsNullOrWhiteSpace(NameTextBox.Text))
            {
                MessageBox.Show("يرجى إدخال اسم العضو", "خطأ", MessageBoxButton.OK, MessageBoxImage.Error);
                return false;
            }
            
            if (string.IsNullOrWhiteSpace(PhoneTextBox.Text))
            {
                MessageBox.Show("يرجى إدخال رقم الهاتف", "خطأ", MessageBoxButton.OK, MessageBoxImage.Error);
                return false;
            }
            
            if (string.IsNullOrWhiteSpace(EmailTextBox.Text))
            {
                MessageBox.Show("يرجى إدخال البريد الإلكتروني", "خطأ", MessageBoxButton.OK, MessageBoxImage.Error);
                return false;
            }
            
            if (RankComboBox.SelectedItem == null)
            {
                MessageBox.Show("يرجى اختيار الرتبة", "خطأ", MessageBoxButton.OK, MessageBoxImage.Error);
                return false;
            }
            
            if (DepartmentComboBox.SelectedItem == null)
            {
                MessageBox.Show("يرجى اختيار القسم", "خطأ", MessageBoxButton.OK, MessageBoxImage.Error);
                return false;
            }
            
            if (JoinDatePicker.SelectedDate == null)
            {
                MessageBox.Show("يرجى اختيار تاريخ الانضمام", "خطأ", MessageBoxButton.OK, MessageBoxImage.Error);
                return false;
            }
            
            return true;
        }
    }
}
