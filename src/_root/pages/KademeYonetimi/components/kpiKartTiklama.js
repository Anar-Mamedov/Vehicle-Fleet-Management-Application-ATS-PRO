// Tıklanabilir KPI kutusunun özellikleri; kutu klavyeyle de seçilebilsin diye Enter ve boşluk tuşları da çalışır
export const getTiklamaOzellikleri = (onClick) => ({
  role: "button",
  tabIndex: 0,
  onClick,
  onKeyDown: (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  },
});
