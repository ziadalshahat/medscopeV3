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
