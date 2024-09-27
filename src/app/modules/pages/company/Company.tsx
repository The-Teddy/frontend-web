import { useContext, useState } from "react";
import { Context } from "../../auth/AuthContext";
import CategorySelectModal from "../../partials/modals/category-select-modal/CategorySelectModal";
import { Load } from "../../partials/Spinner";
import "./Company.scss";
import DefaultQuestionIcon from "../../partials/default-question-icon/DefaultQuestionIcon";
import HelpDetailModal from "../../partials/modals/help-detail-modal/HelpDetailModal";
import ContentIdentity from "../../partials/tabs-content/ContentIdentity";
import ContentProfile from "../../partials/tabs-content/ContentProfile";
import ContentHours from "../../partials/tabs-content/ContentHours";

const Company = () => {
  const { token } = useContext(Context);
  const [loading, setLoading] = useState<boolean>(false);

  const tabs = [
    { id: "identity", label: "Identidade", content: <ContentIdentity /> },
    { id: "profile", label: "Perfil", content: <ContentProfile /> },
    { id: "hours", label: "Horários", content: <ContentHours /> },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleTabClick = (id: string) => {
    setActiveTab(id);
  };

  // function handleViewTabs(
  //   event: React.MouseEvent<HTMLButtonElement>,
  //   id: string
  // ) {
  //   const activeButton = document.querySelector(".active-tab");
  //   if (activeButton) {
  //     activeButton?.classList.remove("active-tab");
  //   }

  //   const target = event.currentTarget as HTMLElement;
  //   target.classList.add("active-tab");

  //   const activeContent = document.getElementById(
  //     idContentActive
  //   ) as HTMLElement;
  //   if (activeContent) {
  //     activeContent.style.display = "none";
  //   }

  //   setIdContentActive(id);

  //   const activateContent = document.getElementById(id) as HTMLElement;
  //   if (activateContent) {
  //     activateContent.style.display = "block";
  //   }
  // }
  return (
    <div id="company" className="background-default">
      <p className="title">Gerenciar Empresa</p>

      {loading ? (
        <div className="load-center">
          <Load />
        </div>
      ) : (
        <>
          <nav aria-label="Navegação de configurações" id="tab-nav">
            {tabs.map((item, index) => (
              <button
                key={index}
                className={`tab-button ${
                  activeTab === item.id ? "active-tab" : ""
                }`}
                onClick={() => handleTabClick(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>
          {tabs.map((item) => (
            <div
              className={`tab-content ${activeTab === item.id ? "active" : ""}`} // Aplica a classe active
              key={item.id}
              style={{ display: activeTab === item.id ? "block" : "none" }}
            >
              {item.content}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Company;
