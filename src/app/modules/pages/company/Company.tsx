import { useContext, useEffect, useState } from "react";
import { Context } from "../../auth/AuthContext";
import { Load } from "../../partials/Spinner";
import "./Company.scss";
import ContentIdentity from "../../partials/tabs-content/ContentIdentity";
import ContentProfile from "../../partials/tabs-content/content-profile/ContentProfile";
import ContentHours from "../../partials/tabs-content/ContentHours";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "react-router-dom";

const Company = () => {
  const { user } = useContext(Context);
  const [searchParams, setSearchParams] = useSearchParams();

  const tabs = [
    {
      id: "identity",
      label: "Identidade",
      content: (
        <ContentIdentity setTabView={(tab: string) => setActiveTab(tab)} />
      ),
    },
    { id: "profile", label: "Perfil", content: <ContentProfile /> },
    // { id: "hours", label: "Horários", content: <ContentHours /> },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleTabClick = (id: string) => {
    if (user?.business) {
      setActiveTab(id);
    } else {
      toast.warning(
        "Complete as informações na aba 'Identidade' para acessar as demais configurações"
      );
    }
  };

  useEffect(() => {
    const searchTab = searchParams.get("tab");

    const existingTab = tabs.some((tab) => tab.id === searchTab);
    if (existingTab && searchTab) {
      setActiveTab(searchTab);
      setSearchParams({});
    }
  }, [searchParams.get("tab")]);

  return (
    <div id="company" className="background-default max-width-default">
      <p className="title">Gerenciar Empresa</p>

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
            {!user?.business && item.id !== "identity" ? (
              <FontAwesomeIcon icon={faLock} />
            ) : null}
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
    </div>
  );
};

export default Company;
