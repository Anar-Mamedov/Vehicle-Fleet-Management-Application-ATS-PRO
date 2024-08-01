import http from "./http";
import {
  CodeControlService,
  CustomCodeControlService,
  MaterialListSelectService,
  GetLocationByDepoIdService,
  CodeItemValidateService,
} from "./services/select_services";

import {
  KMGetService,
  KMValidateService,
  KMAddService,
  KMResetService,
  KMEditService,
  KMLogListGetService,
  KMLogListGetByIdService,
  KMLogListDeleteService,
  KMLogListValidateService,
  KMLogListUpdateService,
} from "./services/km_services";

// login
export const LoginUserService = (data) => {
  return http.post("/Login", data);
};

// Vehicle/GetUserId   demo
export const DemoService = () => {
  return http.get(`/Vehicle/GetUserId`);
};

// custom inputs
export const CustomInputsReadService = (form) => {
  return http.get(`/CustomField/GetCustomFields?form=${form}`);
};

export const CustomInputsUpdateService = (form, topic, field) => {
  return http.post(
    `/CustomField/AddCustomFieldTopic?form=${form}&topic=${topic}&field=${field}`
  );
};

// personal fields --> ozel alanlar
export const PersonalFieldsReadService = (form) => {
  return http.get(`/CustomField/GetCustomFields?form=${form}`);
};
export const PersonalFieldsUpdateService = (form, topic, field) => {
  return http.post(
    `/CustomField/AddCustomFieldTopic?form=${form}&topic=${topic}&field=${field}`
  );
};

export {
  CodeControlService,
  CustomCodeControlService,
  MaterialListSelectService,
  GetLocationByDepoIdService,
  CodeItemValidateService,
  KMGetService,
  KMValidateService,
  KMAddService,
  KMResetService,
  KMEditService,
  KMLogListGetService,
  KMLogListGetByIdService,
  KMLogListDeleteService,
  KMLogListValidateService,
  KMLogListUpdateService,
};
