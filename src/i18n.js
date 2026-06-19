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
