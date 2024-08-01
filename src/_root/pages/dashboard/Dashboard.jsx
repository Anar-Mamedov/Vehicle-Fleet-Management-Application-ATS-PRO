import React from "react";
import MainDashboard from "./MainDashboard.jsx";
import { FormProvider, useForm } from "react-hook-form";

export default function Dashboard() {
  const formMethods = useForm();
  return (
    <FormProvider {...formMethods}>
      <div>
        <MainDashboard />
      </div>
    </FormProvider>
  );
}
