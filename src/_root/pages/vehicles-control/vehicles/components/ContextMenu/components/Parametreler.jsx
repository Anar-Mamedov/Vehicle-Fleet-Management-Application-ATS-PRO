import React, { useState } from "react";
import { Button, Modal, Typography } from "antd";
import { t } from "i18next";

const { Text } = Typography;

export default function Parametreler({ selectedRows, refreshTableData, hidePopover }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    // Logic to be added
  };

  return (
    <div>
      <div
        style={{ marginTop: "8px", cursor: "pointer", padding: "5px 0" }}
        onClick={() => {
          setIsModalVisible(true);
          // Don't hide popover immediately if we want the modal to open on top,
          // usually hiding popover is fine as the modal is in a portal.
          // But looking at existing code: hidePopover is passed but not called in onClick of AracTipiniDegistir unless it's successful?
          // Actually AracTipiniDegistir calls hidePopover in onSubmit.
          // However, if the popover closes, the component might unmount?
          // The Popover in ContextMenu renders content. If content is unmounted, the state of Parametreler might be lost?
          // Let's check ContextMenu implementation again.
          // It renders `content` variable.
          // If Popover closes, `visible` becomes false. The `content` is not conditionally rendered based on `visible` in the JSX, it is passed to `content` prop.
          // Antd Popover `content` is rendered.
          // If the popover closes, does the component inside stay alive?
          // Typically, if `destroyTooltipOnHide` is default (false), it might stay.
          // But `AracTipiniDegistir` calls `hidePopover()` only on success.
          // So the popover stays open while the modal is open?
          // If the modal is a child of the popover content, and popover closes, modal might close if it depends on parent?
          // Antd Modal uses Portal by default, so it renders at document root.
          // However, if the React component `Parametreler` unmounts, the Modal (even if in Portal) will unmount.
          // So we must ensure `Parametreler` stays mounted or the Modal state is lifted up.
          // In `AracTipiniDegistir.jsx`, `hidePopover` is CALLED in `onSubmit` (success).
          // It is NOT called in `onClick` to open modal.
          // So the popover stays open behind the modal?
          // That seems to be the pattern.
        }}
      >
        <Text>Parametreler</Text>
      </div>

      <Modal
        title="Parametreler"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800} // Default width, can be adjusted
      >
        {/* Modal content will be added here */}
        <div>Modal içeriği buraya gelecek.</div>
      </Modal>
    </div>
  );
}
