import { useTranslation } from "react-i18next";
import "../styles/SmartAssistant.css";

function SmartAssistant() {
  const { t } = useTranslation();

  return (
    <div className="smart-assistant-page">

      <h2>{t('patient.smartAssistant')}</h2>

      <iframe
        src="https://www.chatbase.co/chatbot-iframe/R6TLm3ER5j0XAJ46ll2wO"
        width="100%"
        style={{
          height: "700px",
          border: "none",
          borderRadius: "15px",
        }}
        frameBorder="0"
        title={t('patient.smartAssistant')}
      />

    </div>
  );
}

export default SmartAssistant;