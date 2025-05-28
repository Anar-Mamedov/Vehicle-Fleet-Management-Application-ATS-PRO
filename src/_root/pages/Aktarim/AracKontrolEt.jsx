import { Button, message } from 'antd';
import axios from 'axios';

export const AracKontrolEt = ({ data, onKontrolTamamlandi }) => {
  const handleKontrol = async () => {
    try {
      const kontrolList = data.map(d => ({
        plaka: String(d.PLAKA),
        lokasyontanim: String(d.LOKASYON),
        yakittiptanim: String(d.YAKIT_TIPI),
        marka: String(d.MARKA),
        model: String(d.MODEL),
        surucu: d.SURUCU
      }));

      const response = await axios.post('https://localhost:44338/api/AracAktarim/kontrolarac', kontrolList);

      const merged = data.map(d => {
        const found = response.data.find(x => x.plaka === d.PLAKA);
        return { ...d, Sonuc: found?.sonuc || [] };
      });

      onKontrolTamamlandi(merged);
      message.success("Kontrol tamamlandı.");
    } catch (err) {
      message.error("API kontrol hatası.");
    }
  };

  return <Button type="primary" onClick={handleKontrol} style={{ marginTop: 16 }}>Kontrol Et</Button>;
};