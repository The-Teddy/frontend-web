import React, { useEffect, useState, useContext } from "react";
import "./TopBar.scss";
import { Context } from "../../auth/AuthContext";
import ProfileMenuModal from "../../partials/modals/profile-menu-modal/ProfileMenuModal";

const Topbar: React.FC = () => {
  const [viewSideBar, setViewSideBar] = useState<boolean>(false);
  const { user } = useContext(Context);
  const [openModal, setOpenModal] = useState(false);

  function handleViewSideBarAndContent() {
    const sideBar = document.querySelector("#side-bar");
    const appContent = document.querySelector("#app-content");
    if (viewSideBar) {
      sideBar?.classList.add("view-side-bar");
      appContent?.classList.add("show-content");
    } else {
      sideBar?.classList.remove("view-side-bar");
      appContent?.classList.remove("show-content");
    }
  }
  useEffect(() => {
    handleViewSideBarAndContent();
  }, [viewSideBar]);
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 992) {
        setViewSideBar(false);
      }
      handleViewSideBarAndContent();
    });
    return () =>
      window.removeEventListener("resize", handleViewSideBarAndContent);
  }, []);

  const handleClickOutside = (event: any) => {
    if (!event.target.closest(".dont-close")) {
      setViewSideBar(false);
    }
  };
  const handleClickOutsideProfileMenu = (event: any) => {
    if (!event.target.closest("#profile-menu-modal")) {
      setOpenModal(false);
    }
  };

  useEffect(() => {
    if (viewSideBar) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    document.addEventListener("mousedown", handleClickOutsideProfileMenu);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mousedown", handleClickOutsideProfileMenu);
    };
  }, [viewSideBar]);

  return (
    <div id="top-bar">
      <div className="top-bar-content">
        <div className="top-bar-box-icon dont-close">
          <i
            className={`fa-solid fa-bars ${
              viewSideBar ? "hide-icon-menu" : ""
            }`}
            onClick={() => {
              setViewSideBar(true);
            }}
          ></i>
        </div>
        <div className="top-bar-right">
          <img
            crossOrigin="anonymous"
            onClick={() => setOpenModal(true)}
            // src={`${
            //   user?.logo
            //     ? handleGetEnvVariable() + user.logo
            //     : "/images/blank.png"
            // }`}
            src="/images/blank.png"
            alt=""
          />
        </div>
      </div>
      <ProfileMenuModal
        open={openModal}
        setViewModal={() => setOpenModal(false)}
      />
    </div>
  );
};

export default Topbar;
