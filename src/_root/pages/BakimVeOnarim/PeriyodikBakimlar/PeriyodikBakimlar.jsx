import React from "react";
import MainTable from "./Table/Table";
import { FormProvider, useForm } from "react-hook-form";

export default function LokasyonTanim() {
  const formMethods = useForm({
    defaultValues: {
      durumFilter: "all",
      timeRange: "all",
      startDate: null,
      endDate: null,
    },
  });
  return (
    <FormProvider {...formMethods}>
      <div>
        <MainTable />
      </div>
    </FormProvider>
  );
}
