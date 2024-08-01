import { useContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { t } from "i18next";
import { Button, Modal, Tabs } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { PlakaContext } from "../../../../../../../context/plakaSlice";
import { AddAccItemService } from "../../../../../../../api/services/vehicles/vehicles/services";
import TextInput from "../../../../../../components/form/inputs/TextInput";
import CodeControl from "../../../../../../components/form/selects/CodeControl";
import dayjs from "dayjs";
import NumberInput from "../../../../../../components/form/inputs/NumberInput";
import DateInput from "../../../../../../components/form/date/DateInput";

const AddModal = ({ setStatus }) => {
  const { plaka, aracId } = useContext(PlakaContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const defaultValues = {};

  const methods = useForm({
    defaultValues: defaultValues,
  });

  const { handleSubmit, reset, watch } = methods;

  const handleOk = handleSubmit(async (values) => {
    const body = {
      aksAracId: aracId,
      plaka: plaka,
      aksesuarKodId: values.aksesuarKodId || -1,
      ureticiKod: values.ureticiKod,
      miktar: values.miktar,
      fiyat: values.fiyat,
      degistirmeTarih:
        dayjs(values.degistirmeTarih).format("YYYY-MM-DD") || null,
    };

    AddAccItemService(body).then((res) => {
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
      onClick={() => {
        setIsModalOpen(false)
        reset()
      }}
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
        title={t("yeniAksesuarBilgisi")}
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
              <div className="flex flex-col gap-1">
                <label>{t("tanim")}</label>
                <CodeControl
                  name="aksesuar"
                  codeName="aksesuarKodId"
                  id={105}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label>{t("miktar")}</label>
                <NumberInput name="miktar" />
              </div>
              <div className="flex flex-col gap-1">
                <label>{t("fiyat")}</label>
                <NumberInput name="fiyat" />
              </div>
              <div className="flex flex-col gap-1">
                <label>{t("ureticiKod")}</label>
                <TextInput name="ureticiKod" />
              </div>
              <div className="flex flex-col gap-1">
                <label>{t("degistirmeTarih")}</label>
                <DateInput name="degistirmeTarih" />
              </div>
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
