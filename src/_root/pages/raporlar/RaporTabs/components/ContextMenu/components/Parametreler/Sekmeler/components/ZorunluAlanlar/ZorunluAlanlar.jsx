import React, { useEffect, useState } from "react";
import {
  Drawer,
  Typography,
  Button,
  Input,
  Select,
  DatePicker,
  TimePicker,
  Row,
  Col,
  Checkbox,
  ColorPicker,
} from "antd";
import { Controller, useFormContext } from "react-hook-form";
import styled from "styled-components";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const { Text, Link } = Typography;
const { TextArea } = Input;

const StyledInput = styled(Input)`
  @media (min-width: 600px) {
    max-width: 300px;
  }
  @media (max-width: 600px) {
    max-width: 300px;
  }
`;

const StyledDiv = styled.div`
  @media (min-width: 600px) {
    width: 100%;
    max-width: 300px;
  }
  @media (max-width: 600px) {
    width: 100%;
    max-width: 300px;
  }
`;

const StyledDivBottomLine = styled.div`
  @media (min-width: 600px) {
    align-items: center !important;
  }
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const StyledDivMedia = styled.div`
  .anar {
    @media (min-width: 600px) {
      max-width: 300px;
      width: 100%;
    }
    @media (max-width: 600px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;

export default function Ayarlar() {
  const [localeDateFormat, setLocaleDateFormat] = useState("DD/MM/YYYY"); // Varsayılan format
  const [localeTimeFormat, setLocaleTimeFormat] = useState("HH:mm"); // Default time format
  const { control, watch, setValue } = useFormContext();

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", gap: "10px" }}>
      <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "row", gap: "20px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div>
            <Controller
              name="talepKodu"
              control={control}
              render={({ field }) => (
                <Checkbox checked={field.value} disabled onChange={(e) => field.onChange(e.target.checked)}>
                  Talep Kodu
                </Checkbox>
              )}
            />
          </div>
          <div>
            <Controller
              name="talepTarihi"
              control={control}
              render={({ field }) => (
                <Checkbox checked={field.value} disabled onChange={(e) => field.onChange(e.target.checked)}>
                  Talep Tarihi
                </Checkbox>
              )}
            />
          </div>
          <div>
            <Controller
              name="talepteBulunan"
              control={control}
              render={({ field }) => (
                <Checkbox checked={field.value} disabled onChange={(e) => field.onChange(e.target.checked)}>
                  Talepte Bulunan
                </Checkbox>
              )}
            />
          </div>
          <div>
            <Controller
              name="lokasyon"
              control={control}
              render={({ field }) => (
                <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
                  Lokasyon
                </Checkbox>
              )}
            />
          </div>
          <div>
            <Controller
              name="bildirilenBina"
              control={control}
              render={({ field }) => (
                <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
                  Bildirilen Bina
                </Checkbox>
              )}
            />
          </div>
          <div>
            <Controller
              name="bildirilenKat"
              control={control}
              render={({ field }) => (
                <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
                  Bildirilen Kat
                </Checkbox>
              )}
            />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div>
            <Controller
              name="makineTanimi"
              control={control}
              render={({ field }) => (
                <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
                  Makine Tanımı
                </Checkbox>
              )}
            />
          </div>
          <div>
            <Controller
              name="ekipmanTanimi"
              control={control}
              render={({ field }) => (
                <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
                  Ekipman Tanımı
                </Checkbox>
              )}
            />
          </div>
          <div>
            <Controller
              name="makineDurumu"
              control={control}
              render={({ field }) => (
                <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
                  Makine Durumu
                </Checkbox>
              )}
            />
          </div>
          <div>
            <Controller
              name="irtibatTelefonu"
              control={control}
              render={({ field }) => (
                <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
                  İrtibat Telefonu
                </Checkbox>
              )}
            />
          </div>
          <div>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
                  E-Mail
                </Checkbox>
              )}
            />
          </div>
          <div>
            <Controller
              name="departman"
              control={control}
              render={({ field }) => (
                <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
                  Departman
                </Checkbox>
              )}
            />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div>
            <Controller
              name="iletisimSekli"
              control={control}
              render={({ field }) => (
                <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
                  İletişim Şekli
                </Checkbox>
              )}
            />
          </div>
          <div>
            <Controller
              name="isKategorisi"
              control={control}
              render={({ field }) => (
                <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
                  İş Kategorisi
                </Checkbox>
              )}
            />
          </div>
          <div>
            <Controller
              name="servisNedeni"
              control={control}
              render={({ field }) => (
                <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
                  Servis Nedeni
                </Checkbox>
              )}
            />
          </div>
          <div>
            <Controller
              name="isTakipcisi"
              control={control}
              render={({ field }) => (
                <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
                  İş Takipçisi
                </Checkbox>
              )}
            />
          </div>
          <div>
            <Controller
              name="konu"
              control={control}
              render={({ field }) => (
                <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
                  Konu
                </Checkbox>
              )}
            />
          </div>
          <div>
            <Controller
              name="aciklama"
              control={control}
              render={({ field }) => (
                <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
                  Açıklama
                </Checkbox>
              )}
            />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div>
            <Controller
              name="isEmriTipiCheck"
              control={control}
              render={({ field }) => (
                <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
                  İş Emri Tipi
                </Checkbox>
              )}
            />
          </div>
          <div>
            <Controller
              name="oncelik"
              control={control}
              render={({ field }) => (
                <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
                  Öncelik
                </Checkbox>
              )}
            />
          </div>
          <div>
            <Controller
              name="bildirimTipi"
              control={control}
              render={({ field }) => (
                <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
                  Bildirim Tipi
                </Checkbox>
              )}
            />
          </div>
          <div>
            <Controller
              name="planlananBaslamaTarihi"
              control={control}
              render={({ field }) => (
                <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
                  Planlanan Başlama Tarihi
                </Checkbox>
              )}
            />
          </div>
          <div>
            <Controller
              name="planlananBitisTarihi"
              control={control}
              render={({ field }) => (
                <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
                  Planlanan Bitiş Tarihi
                </Checkbox>
              )}
            />
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "row", gap: "20px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div>
            <Controller
              name="ozelAlan1"
              control={control}
              render={({ field }) => (
                <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
                  Özel Alan 1
                </Checkbox>
              )}
            />
          </div>
          <div>
            <Controller
              name="ozelAlan2"
              control={control}
              render={({ field }) => (
                <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
                  Özel Alan 2
                </Checkbox>
              )}
            />
          </div>
          <div>
            <Controller
              name="ozelAlan3"
              control={control}
              render={({ field }) => (
                <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
                  Özel Alan 3
                </Checkbox>
              )}
            />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div>
            <Controller
              name="ozelAlan4"
              control={control}
              render={({ field }) => (
                <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
                  Özel Alan 4
                </Checkbox>
              )}
            />
          </div>
          <div>
            <Controller
              name="ozelAlan5"
              control={control}
              render={({ field }) => (
                <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
                  Özel Alan 5
                </Checkbox>
              )}
            />
          </div>
          <div>
            <Controller
              name="ozelAlan6"
              control={control}
              render={({ field }) => (
                <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
                  Özel Alan 6
                </Checkbox>
              )}
            />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div>
            <Controller
              name="ozelAlan7"
              control={control}
              render={({ field }) => (
                <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
                  Özel Alan 7
                </Checkbox>
              )}
            />
          </div>
          <div>
            <Controller
              name="ozelAlan8"
              control={control}
              render={({ field }) => (
                <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
                  Özel Alan 8
                </Checkbox>
              )}
            />
          </div>
          <div>
            <Controller
              name="ozelAlan9"
              control={control}
              render={({ field }) => (
                <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
                  Özel Alan 9
                </Checkbox>
              )}
            />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div>
            <Controller
              name="ozelAlan10"
              control={control}
              render={({ field }) => (
                <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
                  Özel Alan 10
                </Checkbox>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
