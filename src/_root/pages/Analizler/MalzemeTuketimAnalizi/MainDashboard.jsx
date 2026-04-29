import React from "react";
import { ConfigProvider } from "antd";
import { useForm, FormProvider } from "react-hook-form";
import trTR from "antd/lib/locale/tr_TR";
import Component1 from "./components/Component1.jsx";
import Component2 from "./components/Component2.jsx";
import Component3 from "./components/Component3.jsx";
import Component4 from "./components/Component4.jsx";
import Component6 from "./components/Component6.jsx";

function MainDashboard() {
  const methods = useForm({ defaultValues: {} });

  return (
    <FormProvider {...methods}>
      <ConfigProvider locale={trTR}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ flex: 1 }}>
              <Component1 />
            </div>
            <div style={{ flex: 1 }}>
              <Component2 />
            </div>
            <div style={{ flex: 1 }}>
              <Component3 />
            </div>
            <div style={{ flex: 1 }}>
              <Component4 />
            </div>
          </div>
          <Component6 />
        </div>
      </ConfigProvider>
    </FormProvider>
  );
}

export default MainDashboard;
