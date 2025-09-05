import React, { useEffect, useState } from "react";
import { Button, Input, Typography, Form, message, Progress } from "antd";
import { useForm, Controller } from "react-hook-form";
import AxiosInstance from "../../../../../../api/http.jsx";
import PropTypes from "prop-types";

const { Text } = Typography;

function ChangePassword({ userData }) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isStrongPasswordRequired, setIsStrongPasswordRequired] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchStrongPasswordSetting = async () => {
      try {
        const response = await AxiosInstance.get(`CommonSettings/GetSettingByType?type=5`);
        const item = response?.data;
        if (!isMounted) return;
        if (typeof item === "boolean") {
          setIsStrongPasswordRequired(item);
        } else if (typeof item?.gucluSifreAktif !== "undefined") {
          setIsStrongPasswordRequired(Boolean(item.gucluSifreAktif));
        } else if (typeof userData?.gucluSifreAktif !== "undefined") {
          setIsStrongPasswordRequired(Boolean(userData.gucluSifreAktif));
        } else {
          setIsStrongPasswordRequired(false);
        }
      } catch (error) {
        if (!isMounted) return;
        console.error("ChangePassword: fetching strong password setting failed:", error);
        setIsStrongPasswordRequired(Boolean(userData?.gucluSifreAktif));
      }
    };

    fetchStrongPasswordSetting();

    return () => {
      isMounted = false;
    };
  }, [userData?.gucluSifreAktif]);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length > 5) strength += 1;
    if (password.length > 7) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1; // Küçük harf kontrolü
    if (/\d/.test(password)) strength += 1;
    return (strength / 5) * 100; // Toplam koşul sayısı 5 olduğu için bölme işlemi 5'e bölünür
  };

  const newPassword = watch("newPassword");

  useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(newPassword || ""));
  }, [newPassword]);

  const onSubmit = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      message.error("New password and confirm password do not match");
      return;
    }

    try {
      const body = {
        userId: userData?.siraNo,
        previousPassword: data.oldPassword,
        updatedPassword: data.newPassword,
      };
      const response = await AxiosInstance.post(`Profile/ModifyUserPassword`, body);
      console.log("Data sent successfully:", response);
      if (response.data.statusCode === 200 || response.data.statusCode === 201 || response.data.statusCode === 202) {
        message.success("Şifre Güncellendi.");
        reset(); // Reset form fields
      } else if (response.data.statusCode === 401) {
        message.error("Bu işlemi yapmaya yetkiniz bulunmamaktadır.");
      } else if (response.data.statusCode === 403) {
        message.error("Eski Şifrenizi Yanlış Girdiniz.");
      } else {
        message.error("Eski Şifrenizi Yanlış Girdiniz.");
      }
    } catch (error) {
      console.error("ChangePassword: password change failed:", error);
      message.error("Error changing password");
    }
  };

  let progressStatus = "exception";
  if (passwordStrength >= 100) {
    progressStatus = "success";
  } else if (passwordStrength >= 50) {
    progressStatus = "active";
  }

  return (
    <Form onFinish={handleSubmit(onSubmit)}>
      <div
        style={{
          padding: "0 20px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Text style={{ fontSize: "16px", fontWeight: "500" }}>Şifre Güncelleme</Text>
        <div
          style={{
            padding: "20px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            gap: "10px",
            borderRadius: "16px",
            border: "1px solid #e1e1e1",
          }}
        >
          <Form.Item
            validateStatus={errors.oldPassword ? "error" : ""}
            help={errors.oldPassword ? errors.oldPassword.message : ""}
            style={{
              marginBottom: errors.oldPassword ? "0px" : "0", // Hata olduğunda normal margin, aksi halde 0
            }}
          >
            <Controller name="oldPassword" control={control} defaultValue="" render={({ field }) => <Input.Password {...field} placeholder="Eski Şifreniz" />} />
          </Form.Item>

          <Controller
            name="newPassword"
            control={control}
            defaultValue=""
            rules={{
              required: "Alan boş bırakılamaz",
              validate: (value) => {
                if (value === watch("oldPassword")) {
                  return "Yeni şifre, eski şifreyle aynı olamaz.";
                }
                if (isStrongPasswordRequired) {
                  const hasUpperCase = /[A-Z]/.test(value);
                  const hasLowerCase = /[a-z]/.test(value);
                  const hasNumber = /\d/.test(value);
                  const hasMinLength = value.length >= 8;
                  const allowedSpecials = " `!@$%^*()_+-={};\"|,.<>?~/' :§";
                  const hasOnlyAllowedChars = [...value].every((ch) => /[A-Za-z0-9]/.test(ch) || allowedSpecials.includes(ch));
                  return (
                    (hasUpperCase && hasLowerCase && hasNumber && hasOnlyAllowedChars && hasMinLength) ||
                    "Şifreniz en az 8 karakter uzunluğunda olmalı, büyük ve küçük harfler, rakam ve belirtilen özel karakterler ( `!@$%^*()_+-={};\"|,.<>?~/' :§) dışında herhangi bir özel karakter içermemelidir."
                  );
                } else {
                  return true; // GUCLENDIRILMIS_SIFRE_KULLAN false ise, her türlü şifreyi kabul eder
                }
              },
            }}
            render={({ field }) => (
              <>
                <Form.Item
                  validateStatus={errors.newPassword ? "error" : ""}
                  help={errors.newPassword ? errors.newPassword.message : ""}
                  style={{
                    marginBottom: errors.newPassword ? "0px" : "0", // Hata olduğunda normal margin, aksi halde 0
                  }}
                >
                  <Input.Password {...field} placeholder="Yeni Şifreniz" />
                </Form.Item>
              </>
            )}
          />
          <Form.Item
            validateStatus={errors.confirmPassword ? "error" : ""}
            help={errors.confirmPassword ? errors.confirmPassword.message : ""}
            style={{
              marginBottom: errors.confirmPassword ? "0px" : "0", // Hata olduğunda normal margin, aksi halde 0
            }}
          >
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              rules={{
                required: "Alan boş bırakılamaz",
                validate: (value) => value === newPassword || "Şifreler eşleşmiyor, lütfen kontrol edin.",
              }}
              render={({ field }) => (
                <>
                  <Input.Password {...field} placeholder="Yeni Şifrenizi Onaylayın" />
                </>
              )}
            />
          </Form.Item>
          {newPassword ? <Progress percent={passwordStrength} status={progressStatus} /> : null}
          <Button type="primary" htmlType="submit">
            Uygula
          </Button>
        </div>
      </div>
    </Form>
  );
}

export default ChangePassword;

ChangePassword.propTypes = {
  userData: PropTypes.shape({
    siraNo: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    gucluSifreAktif: PropTypes.bool,
  }),
};
