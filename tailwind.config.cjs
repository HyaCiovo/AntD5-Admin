// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require("tailwindcss/plugin");
/**
 * @description Generate color groups
 * @param color {string}
 * @returns {{DEFAULT: string; 900: string; 800: string; 600: string; 400: string; 200: string; 100: string, 80:string, 60:string}}
 */
const genColorGroup = (color) => {
  let str = color.replace("#", "");
  if (str.length === 3) {
    str = str
      .split("")
      .map((item) => item.repeat(2))
      .join("");
  }
  const r = parseInt(`0x${str.substring(0, 2)}`, 16);
  const g = parseInt(`0x${str.substring(2, 4)}`, 16);
  const b = parseInt(`0x${str.substring(4, 6)}`, 16);
  return {
    DEFAULT: `rgba(${r},${g} ,${b})`,
    ...[900, 800, 600, 400, 300, 200, 100, 80, 60].reduce(
      (previousValue, currentValue) => {
        return {
          ...previousValue,
          [currentValue]: `rgba(${r},${g} ,${b}, ${currentValue / 1000})`,
        };
      },
      {}
    ),
  };
};
const themeColor = {
  primary: genColorGroup("#0754B2"),
  primary_hover: genColorGroup("#2065b9"),
  success: genColorGroup("#5AC614"),
  white: genColorGroup("#ffffff"),
  cardColor: genColorGroup("#FAFAFA"),
  desc: "#CCCCCC",
  border: genColorGroup("#F0F0F0"),
  darkBorder: "#e5e5e5",
  label: "#999999",
  red: "#CC342C",
  gray: "#666",
  deepGray: "#333",
  grayBg: "#f5f5f5",
  blue: "#0073FF",
  blueBg: "#F0F7FF",
  cardBg: "#FAFAFA",
  lightGray: genColorGroup("#d8d8d8"),
  pantone: "#61aae7",
  detailColor: "#0754B2",
  hoverTextColor: "#2065b9",
  green: "#34b37e",
};

const spacingEnhance = [
  4.5, 5.5, 6.5, 7.5, 8.5, 9.5, 10.5, 11.5, 12.5, 15, 19, 25, 30,
].reduce((previousValue, currentValue) => {
  return {
    ...previousValue,
    [currentValue]: `${currentValue * 4}px`,
  };
}, {});
const lineHeightEnhance = [7.5, 11, 12, 13, 14, 15, 16, 17, 18, 19, 10].reduce(
  (previousValue, currentValue) => {
    return {
      ...previousValue,
      [currentValue]: `${currentValue * 4}px`,
    };
  },
  {}
);

module.exports = {
  content: ["./src/**/*.tsx"],
  important: true,
  theme: {
    fontFamily: {
      comic: ["Comic Sans MS", "cursiveInter"],
    },
    extend: {
      colors: themeColor,
      boxShadow: {
        default: "0 0 10px 0 rgb(0 0 0 / 5%)",
        little: "0 0 8px 0 rgb(0 0 0 / 5%)",
        news: "0 0 15px rgb(0 0 0 / 15%)",
        prefecture: "0 0 10px 0 #0000000d",
        prefectureHover: "0 0 10px 0 #0754b230",
        hover: "0 0 15px rgb(0 0 0 / 20%)",
      },
      height: {
        main: "calc(100vh - 192px)",
      },
      backgroundImage: {
        "card-hover": "linear-gradient(225deg, #0E77F8 0%, #0F58E3 100%)",
      },
      opacity: {
        45: ".45",
        97: ".97",
      },
      spacing: spacingEnhance,
      lineHeight: lineHeightEnhance,
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      const newUtilities = {
        ".card-shadow": {
          "box-shadow": "0 0 8px 0 rgba(0,0,0,0.05)",
        },
        ".hover-shadow": {
          "box-shadow": "0 0 30px 0 rgba(0, 0, 0, 0.20)",
        },

        ".side-tool": {
          "box-shadow": "0 2px 8px 0 rgba(0,0,0,0.10)",
        },
        ".hzide-page-content": {
          position: "relative",
          width: "1200px",
          margin: "0 auto",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    }),
  ],
};
