import React from "react";
import RaporTabs from "./RaporTabs/RaporTabs";
import { FormProvider, useForm } from "react-hook-form";

export default function RaporYonetimi() {
  const formMethods = useForm();
  return (
    <FormProvider {...formMethods}>
      <div>
        <RaporTabs />
      </div>
    </FormProvider>
  );
}
