import { Link } from "react-router-dom";
import siteLogo from "../assets/Dollar-logo.svg";
import siteLogoWhite from "../assets/DF_Logo_White.svg";
import useTheme from "../hooks/useTheme";
import {
  ConfigProvider,
  theme as antdTheme,
  Dropdown,
  MenuProps,
  Space,
} from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";

type CustomMenuItem = {
  key: string;
  label: string;
  icon?: React.ReactNode;
};

const items: CustomMenuItem[] = [
  {
    key: "1",
    label: "Light",
    icon: <Icon icon="entypo:light-up" width="20" height="20" />,
  },
  {
    key: "2",
    label: "Dark",
    icon: <Icon icon="circum:dark" width="24" height="24" />,
  },
  {
    key: "3",
    label: "System",
    icon: <Icon icon="eos-icons:system-ok-outlined" width="20" height="20" />,
  },
];

export default function Header() {
  const [theme, setTheme] = useTheme();

  const [isDarkMode, setIsDarkmode] = useState(false);

  const handleThemeChange: MenuProps["onClick"] = ({ key }) => {
    const selectedItem = items?.find((item) => item?.key === key);
    if (selectedItem) {
      if (typeof setTheme === "function") {
        setTheme(selectedItem.label.toLowerCase());
      }
    }
  };

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDarkmode(isDarkMode);
  }, [isDarkMode, theme]);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode
          ? antdTheme.darkAlgorithm
          : antdTheme.defaultAlgorithm,
      }}
    >
      <div
        style={{ boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.10)" }}
        className="md:px-[5rem] px-[1rem] sticky top-0 bg-white dark:bg-darkModeBgColor dark:text-darkModeHeadingTextColor z-[999] flex items-center justify-between h-[100px] border-b-[1px] dark:border-b-gray-600"
        data-html2canvas-ignore
      >
        <Link to="/">
          <img
            className="w-[100px] h-[100px]"
            src={isDarkMode ? siteLogoWhite : siteLogo}
            alt="Logo Image"
          />
        </Link>
        {/* <Link to="/research">Research</Link> */}

        <Dropdown
          menu={{ items, onClick: handleThemeChange }}
          className="border-[1px] border-gray-300 dark:border-gray-500 px-4 py-2 rounded-md"
        >
          <Space>
            {theme === "dark" ? (
              <div className="flex items-center gap-2">
                <Icon icon="circum:dark" width="24" height="24" />
                <span>Dark</span>
              </div>
            ) : theme === "light" ? (
              <div className="flex items-center gap-2">
                <Icon icon="entypo:light-up" width="20" height="20" />
                <span>Light</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Icon
                  icon="eos-icons:system-ok-outlined"
                  width="20"
                  height="20"
                />
                <span>System</span>
              </div>
            )}
          </Space>
        </Dropdown>
      </div>
    </ConfigProvider>
  );
}
