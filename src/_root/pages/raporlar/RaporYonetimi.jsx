import React from "react";
import RaporTabs from "./RaporTabs/RaporTabs";
import { FormProvider, useForm } from "react-hook-form";

export default function RaporYonetimi() {
  const formMethods = useForm();
  return (
    <FormProvider {...formMethods}>
      <div style={{ width: "100%", height: "100%", backgroundColor: "white", padding: "10px", borderRadius: "10px" }}>
        <RaporTabs />
      </div>
    </FormProvider>
  );
}
