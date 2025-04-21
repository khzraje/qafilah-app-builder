
# نظام تسجيل الأعضاء

تطبيق ويب لتسجيل وإدارة أعضاء المنظمات الخيرية والتطوعية. يمكن تحويل هذا التطبيق إلى تطبيق سطح مكتب (Desktop Application) باستخدام لغة C#.

## ميزات التطبيق

- إضافة أعضاء جدد
- عرض قائمة الأعضاء
- البحث عن أعضاء
- تصدير قائمة الأعضاء بصيغة CSV
- واجهة مستخدم باللغة العربية

## تقنيات التطبيق الحالي

- React.js
- TypeScript
- Tailwind CSS
- shadcn/ui

## تحويل التطبيق إلى تطبيق سطح مكتب باستخدام C#

### الخيار 1: استخدام WebView في تطبيق WPF

1. قم بإنشاء مشروع WPF في Visual Studio
2. قم بإضافة حزمة `Microsoft.Web.WebView2`
3. إنشاء واجهة WPF تحتوي على عنصر WebView2 يعرض التطبيق
4. بناء API ببرمجة C# للتعامل مع قاعدة البيانات

مثال على الكود:

```csharp
using Microsoft.Web.WebView2.Core;
using Microsoft.Web.WebView2.Wpf;
using System.Windows;

namespace MemberRegistrationApp
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            InitializeAsync();
        }

        async void InitializeAsync()
        {
            await webView.EnsureCoreWebView2Async(null);
            webView.CoreWebView2.Navigate("http://localhost:8080"); // أو استخدم ملفات HTML محلية
            
            // إضافة قنوات اتصال بين JavaScript و C#
            webView.CoreWebView2.AddHostObjectToScript("appHost", new AppHost());
        }
    }

    // فئة للتواصل مع JavaScript
    [System.Runtime.InteropServices.ComVisible(true)]
    public class AppHost
    {
        public string GetMembers()
        {
            // قراءة من قاعدة البيانات
            return "JSON data";
        }
        
        public void SaveMember(string data)
        {
            // حفظ في قاعدة البيانات
        }
    }
}
```

### الخيار 2: إعادة بناء الواجهة بالكامل باستخدام WPF مع الحفاظ على البنية ونموذج البيانات

1. إنشاء مشروع WPF في Visual Studio
2. إعادة بناء واجهة المستخدم باستخدام XAML
3. استخدام نمط MVVM
4. استخدام نموذج بيانات مماثل لما تم استخدامه في التطبيق الحالي

مثال على الكود:

```csharp
// نموذج البيانات
public class Member
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Phone { get; set; }
    public string Email { get; set; }
    public DateTime JoinDate { get; set; }
    public string Rank { get; set; }
    public string Department { get; set; }
}

// سيرفس لإدارة البيانات
public class MemberService
{
    private readonly string connectionString;
    
    public MemberService(string connectionString)
    {
        this.connectionString = connectionString;
    }
    
    public List<Member> GetAllMembers()
    {
        // استخدام ADO.NET أو Entity Framework لقراءة البيانات
    }
    
    public void AddMember(Member member)
    {
        // إضافة عضو إلى قاعدة البيانات
    }
    
    // ... باقي الطرق
}

// نموذج العرض
public class MemberViewModel : INotifyPropertyChanged
{
    private readonly MemberService _service;
    private ObservableCollection<Member> _members;
    
    public ObservableCollection<Member> Members
    {
        get => _members;
        set
        {
            _members = value;
            OnPropertyChanged(nameof(Members));
        }
    }
    
    // ... باقي الخصائص والأوامر
    
    public event PropertyChangedEventHandler PropertyChanged;
    protected void OnPropertyChanged(string propertyName)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}
```

### الخيار 3: استخدام Electron.NET

1. استخدم Electron.NET لتحويل التطبيق الحالي إلى تطبيق سطح مكتب
2. إنشاء واجهة خلفية (Backend) باستخدام ASP.NET Core
3. استخدام React للواجهة الأمامية (Frontend) كما هو

## بنية قاعدة البيانات المقترحة (SQL Server)

```sql
CREATE TABLE Members (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Phone NVARCHAR(20) NOT NULL,
    Email NVARCHAR(100) NOT NULL,
    JoinDate DATE NOT NULL,
    Rank NVARCHAR(50) NOT NULL,
    Department NVARCHAR(50) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE()
);

CREATE TABLE Departments (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(50) NOT NULL,
    Description NVARCHAR(200)
);

CREATE TABLE Ranks (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(50) NOT NULL,
    Level INT NOT NULL
);
```

## متطلبات التطوير للتحويل إلى تطبيق سطح مكتب

1. Visual Studio 2022 مع .NET 7 أو أحدث
2. SQL Server (أو SQL Server Express)
3. معرفة بلغة C# وتقنية WPF
4. معرفة بقواعد البيانات SQL Server
