import React from "react";
import MainTable from "./Table/Table";
import { FormProvider, useForm } from "react-hook-form";

export default function TalepYonetimi() {
  const formMethods = useForm();
  return (
    <FormProvider {...formMethods}>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <MainTable />
      </div>
    </FormProvider>
  );
}
