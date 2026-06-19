import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      "footer": {
        "title": "MedScope",
        "empower": "Healthcare Excellence",
        "copyright": "© 2026 MedScope. All rights reserved.",
        "facebook": "Facebook",
        "instagram": "Instagram",
        "twitter": "Twitter",
        "linkedin": "LinkedIn"
      },
      "SuccessModal": {
        "title": "Success!",
        "message": "Operation completed successfully",
        "loginButton": "OK"
      },
      "header": {
        "home": "Home",
        "hospitals": "Hospitals",
        "services": "Services",
        "about": "About",
        "signin": "Sign in",
        "signup": "Sign up",
        "logout": "Logout"
      },
      "sidebar": {
        "hospitals": "Hospitals",
        "admins": "Admins",
        "reports": "Reports",
        "settings": "Settings"
      },
      "superadmin": {
        "hospitals": {
          "title": "Hospital Management",
          "subtitle": "Manage your personal information and settings"
        },
        "admins": {
          "title": "Admin Management",
          "subtitle": "Manage your personal information and settings"
        },
        "reports": {
          "title": "Reports & Analytics",
          "subtitle": "Manage your personal information and settings"
        },
        "settings": {
          "title": "Settings",
          "subtitle": "Manage your personal information and settings"
        }
      },
      "hospital": {
        "add_new": "+ Add New Hospital",
        "search": "Search",
        "filter_status": "Filter by Status",
        "active": "Active",
        "suspended": "Suspended",
        "id": "Hospital ID",
        "name": "Hospital Name",
        "city": "City",
        "admins_count": "Admins Count",
        "status": "Status",
        "actions": "Actions",
        "previous": "Previous",
        "next": "Next",
        "confirm_delete": "Are you sure you want to delete this hospital?",
        "edit": "Edit Hospital",
        "create": "Create New Hospital",
        "email": "Email",
        "phone": "Phone",
        "address": "Address",
        "save": "Save",
        "saving": "Saving...",
        "close": "Close",
        "created_success": "Hospital created successfully",
        "add_another": "Add Another",
        "back_to_list": "Back to hospitals"
      },
      "admin": {
        "create_btn": "+ Create New Admin",
        "employee_id": "Employee ID",
        "name": "Name",
        "email": "Email",
        "hospital": "Hospital",
        "status": "Status",
        "last_login": "Last Login",
        "actions": "Actions",
        "first_name": "First Name",
        "last_name": "Last Name",
        "password": "Password",
        "select_hospital": "Select hospital",
        "save": "Save",
        "saving": "Saving...",
        "close": "Close",
        "filter_hospital": "Filter by Hospital",
        "active": "Active",
        "suspended": "Suspended",
        "created_success": "Admin created successfully",
        "temp_password": "Temporary password",
        "add_another": "Add Another",
        "back_to_list": "Back to Admins",
        "search": "Search"
      },
      "reports": {
        "user_growth": "User Growth",
        "total_patients": "Total No of Patients",
        "patients": "Patients",
        "doctors": "Doctors",
        "no_data": "No data available for this month",
        "export_excel": "Export Excel",
        "export_pdf": "Export Pdf",
        "distribution": "Hospital Distribution by City",
        "no_dist_data": "No distribution data available",
        "previous": "Previous",
        "next": "Next"
      },
      "settings": {
        "personal_info": "Personal Information",
        "full_name": "Full Name",
        "email": "Email",
        "phone": "Phone Number",
        "edit": "Edit",
        "save": "Save",
        "security_settings": "Security Settings",
        "current_password": "Current Password",
        "new_password": "New Password",
        "confirm_password": "Confirm New Password",
        "change_password": "Change Password",
        "changing": "Changing...",
        "notification_preferences": "Notification Preferences",
        "system_errors": "Receive alerts for system errors",
        "security_incidents": "Receive alerts for security incidents",
        "appointment_reminders": "Appointment Reminders",
        "not_set": "Not set"
      },
      "hero": {
        "title": "Your Health,",
        "subtitle": "Our Priority"
      }
    }
  },
  ar: {
    translation: {
      "footer": {
        "title": "ميدسكوب",
        "empower": "التميز في الرعاية الصحية",
        "copyright": "© 2026 ميدسكوب. جميع الحقوق محفوظة.",
        "facebook": "فيسبوك",
        "instagram": "إنستغرام",
        "twitter": "تويتر",
        "linkedin": "لينكد إن"
      },
      "SuccessModal": {
        "title": "نجاح!",
        "message": "تمت العملية بنجاح",
        "loginButton": "موافق"
      },
      "header": {
        "home": "الرئيسية",
        "hospitals": "المستشفيات",
        "services": "الخدمات",
        "about": "من نحن",
        "signin": "تسجيل الدخول",
        "signup": "إنشاء حساب",
        "logout": "تسجيل الخروج"
      },
      "sidebar": {
        "hospitals": "المستشفيات",
        "admins": "المدراء",
        "reports": "التقارير",
        "settings": "الإعدادات"
      },
      "superadmin": {
        "hospitals": {
          "title": "إدارة المستشفيات",
          "subtitle": "إدارة المعلومات الشخصية والإعدادات الخاصة بك"
        },
        "admins": {
          "title": "إدارة المدراء",
          "subtitle": "إدارة المعلومات الشخصية والإعدادات الخاصة بك"
        },
        "reports": {
          "title": "التقارير والتحليلات",
          "subtitle": "إدارة المعلومات الشخصية والإعدادات الخاصة بك"
        },
        "settings": {
          "title": "الإعدادات",
          "subtitle": "إدارة المعلومات الشخصية والإعدادات الخاصة بك"
        }
      },
      "hospital": {
        "add_new": "+ إضافة مستشفى جديد",
        "search": "بحث",
        "filter_status": "تصفية حسب الحالة",
        "active": "نشط",
        "suspended": "معلق",
        "id": "معرف المستشفى",
        "name": "اسم المستشفى",
        "city": "المدينة",
        "admins_count": "عدد المدراء",
        "status": "الحالة",
        "actions": "الإجراءات",
        "previous": "السابق",
        "next": "التالي",
        "confirm_delete": "هل أنت متأكد من حذف هذا المستشفى؟",
        "edit": "تعديل المستشفى",
        "create": "إنشاء مستشفى جديد",
        "email": "البريد الإلكتروني",
        "phone": "الهاتف",
        "address": "العنوان",
        "save": "حفظ",
        "saving": "جاري الحفظ...",
        "close": "إغلاق",
        "created_success": "تم إنشاء المستشفى بنجاح",
        "add_another": "إضافة مستشفى آخر",
        "back_to_list": "العودة للمستشفيات"
      },
      "admin": {
        "create_btn": "+ إنشاء مدير جديد",
        "employee_id": "معرف الموظف",
        "name": "الاسم",
        "email": "البريد الإلكتروني",
        "hospital": "المستشفى",
        "status": "الحالة",
        "last_login": "آخر تسجيل دخول",
        "actions": "الإجراءات",
        "first_name": "الاسم الأول",
        "last_name": "الاسم الأخير",
        "password": "كلمة المرور",
        "select_hospital": "اختر المستشفى",
        "save": "حفظ",
        "saving": "جاري الحفظ...",
        "close": "إغلاق",
        "filter_hospital": "تصفية حسب المستشفى",
        "active": "نشط",
        "suspended": "معلق",
        "created_success": "تم إنشاء المدير بنجاح",
        "temp_password": "كلمة المرور المؤقتة",
        "add_another": "إضافة مدير آخر",
        "back_to_list": "العودة للمدراء",
        "search": "بحث"
      },
      "reports": {
        "user_growth": "نمو المستخدمين",
        "total_patients": "إجمالي عدد المرضى",
        "patients": "المرضى",
        "doctors": "الأطباء",
        "no_data": "لا توجد بيانات متاحة لهذا الشهر",
        "export_excel": "تصدير إكسل",
        "export_pdf": "تصدير PDF",
        "distribution": "توزيع المستشفيات حسب المدينة",
        "no_dist_data": "لا توجد بيانات توزيع متاحة",
        "previous": "السابق",
        "next": "التالي"
      },
      "settings": {
        "personal_info": "المعلومات الشخصية",
        "full_name": "الاسم الكامل",
        "email": "البريد الإلكتروني",
        "phone": "رقم الهاتف",
        "edit": "تعديل",
        "save": "حفظ",
        "security_settings": "إعدادات الأمان",
        "current_password": "كلمة المرور الحالية",
        "new_password": "كلمة المرور الجديدة",
        "confirm_password": "تأكيد كلمة المرور الجديدة",
        "change_password": "تغيير كلمة المرور",
        "changing": "جاري التغيير...",
        "notification_preferences": "تفضيلات الإشعارات",
        "system_errors": "تلقي تنبيهات لأخطاء النظام",
        "security_incidents": "تلقي تنبيهات للحوادث الأمنية",
        "appointment_reminders": "تذكيرات المواعيد",
        "not_set": "لم يحدد"
      },
      "hero": {
        "title": "صحتك،",
        "subtitle": "أولويتنا"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

// Set direction based on language
i18n.on('languageChanged', (lng) => {
  document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lng;
});

// Initialize direction on load
document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
document.documentElement.lang = i18n.language || 'en';

export default i18n;
