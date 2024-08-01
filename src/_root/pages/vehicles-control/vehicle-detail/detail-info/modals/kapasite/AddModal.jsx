import { useContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { t } from "i18next";
import { Button, Modal, Tabs } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { PlakaContext } from "../../../../../../../context/plakaSlice";
import { AddCapacityByVehicleIdService } from "../../../../../../../api/services/vehicles/vehicles/services";
import TextInput from "../../../../../../components/form/inputs/TextInput";
import CodeControl from "../../../../../../components/form/selects/CodeControl";

const AddModal = ({ setStatus }) => {
  const { plaka, aracId } = useContext(PlakaContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const defaultValues = {};
  const methods = useForm({
    defaultValues: defaultValues,
  });
  const { handleSubmit, reset } = methods;

  const handleOk = handleSubmit(async (values) => {
    const body = {
      kapAracId: aracId,
      plaka: plaka,
      tanim: values.tanim,
      miktar: values.miktar,
      birimKodId: values.birimKodId || -1,
    };

    AddCapacityByVehicleIdService(body).then((res) => {
      if (res?.data.statusCode === 200) {
        setIsModalOpen(false);
        setStatus(true);
        reset();
      }
    });
    setStatus(false);
  });

  const footer = [
    <Button key="submit" className="btn btn-min primary-btn" onClick={handleOk}>
      {t("kaydet")}
    </Button>,
    <Button
      key="back"
      className="btn btn-min cancel-btn"
      onClick={() => setIsModalOpen(false)}
    >
      {t("kapat")}
    </Button>,
  ];

  return (
    <div>
      <Button className="btn primary-btn" onClick={() => setIsModalOpen(true)}>
        <PlusOutlined /> {t("ekle")}
      </Button>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        maskClosable={false}
        footer={footer}
        width={600}
      >
        <FormProvider {...methods}>
          <form>
            <div className="flex flex-col gap-1">
              <label>{t("aciklama")}</label>
              <TextInput name="tanim" />
            </div>
            <div className="flex flex-col gap-1">
              <label>{t("miktar")}</label>
              <TextInput name="miktar" />
            </div>
            <div className="flex flex-col gap-1">
              <label>{t("birim")}</label>
              <CodeControl name="birim" codeName="birimKodId" id={110} />
            </div>
          </form>
        </FormProvider>
      </Modal>
    </div>
  );
};

AddModal.propTypes = {
  setStatus: PropTypes.func,
};

export default AddModal;
