import { Button } from 'antd';
import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';

class ComponentToPrint extends React.Component {
    render() {
        const { data } = this.props;

        return (
            <div style={{ padding: "20px 40px" }}>
                <h1 style={{ textAlign: "center", marginBottom: 20 }}>Araç Teslim Tutanağı</h1>
                <p style={{ fontWeight: 600 }}>Aşağıda bilgilerine yer verilen aracı sağlam olarak teslim aldığımı, araç kullanım politikasında yer verilen
                    esasları okuduğumu, anladığımı ve kabul ettiğimi beyan ederim.
                    Teslim sonrasında da aracı söz konusu kurallar çerçevesinde kullanacagımı taahhüt ederim.</p>

                <div style={{ marginTop: 30, marginBottom: 30, display: "flex" }}>
                    <div style={{ width: "50%", padding: 10, borderRight: "1px solid black", }}>
                        <div style={{ display: "flex" }}>
                            <p style={{ width: "40%" }} >Marka</p>
                            <p style={{ width: "5%" }}>:</p>
                            <p style={{ width: "55%" }}>{data?.marka}</p>
                        </div>
                        <div style={{ display: "flex" }}>
                            <p style={{ width: "40%" }} >Model</p>
                            <p style={{ width: "5%" }}>:</p>
                            <p style={{ width: "55%" }}>{data?.model}</p>
                        </div>
                        <div style={{ display: "flex" }}>
                            <p style={{ width: "40%" }} >Plaka</p>
                            <p style={{ width: "5%" }}>:</p>
                            <p style={{ width: "55%" }}>{data?.plaka}</p>
                        </div>
                        <div style={{ display: "flex" }}>
                            <p style={{ width: "40%" }} >KM</p>
                            <p style={{ width: "5%" }}>:</p>
                            <p style={{ width: "55%" }}>{data?.km}</p>
                        </div>
                        <div style={{ display: "flex" }}>
                            <p style={{ width: "40%" }} >OGS</p>
                            <p style={{ width: "5%" }}>:</p>
                            <p style={{ width: "55%" }}>{data?.ogs}</p>
                        </div>
                        <div style={{ display: "flex" }}>
                            <p style={{ width: "40%" }} >Taşıt Tanıma</p>
                            <p style={{ width: "5%" }}>:</p>
                            <p style={{ width: "55%" }}>{data?.tasit}</p>
                        </div>
                        <div style={{ display: "flex" }}>
                            <p style={{ width: "40%" }} >Diğer</p>
                            <p style={{ width: "5%" }}>:</p>
                            <p style={{ width: "55%" }}>{data?.diger}</p>
                        </div>
                        <div style={{ display: "flex" }}>
                            <p style={{ width: "40%" }} >Teslim Tarihi</p>
                            <p style={{ width: "5%" }}>:</p>
                            <p style={{ width: "55%" }}>{data?.teslimTarih}</p>
                        </div>
                    </div>
                    <div style={{ width: "50%", padding: 10 }}>
                        <p>Araç üzerinde bulunan aksesuarlar</p>
                        <p>Deneme Tanım</p>
                    </div>
                </div>

                <div style={{ display: "flex", marginBottom: 50 }}>
                    <div style={{ width: "50%" }}>
                        <p style={{ fontWeight: 600, textAlign: "center" }}>Teslim Eden</p>
                        <p style={{ fontWeight: 600, textAlign: "center" }}>{data?.teslimEden}</p>
                    </div>
                    <div style={{ width: "50%" }}>
                        <p style={{ fontWeight: 600, textAlign: "center" }}>Teslim Alan</p>
                        <p style={{ fontWeight: 600, textAlign: "center" }}>{data?.teslimAlan}</p>
                    </div>
                </div>

                <h3 style={{ marginBottom: 20 }}>Araçların Temel Kullanım Esasları ve Sorumluluklar</h3>
                <ol>
                    <li>Araçlar, Kanunlara aykırılık teşkil edecek şekilde kullanılmayacaktır. Taşınması suç olarak belirtilen
                        eşyaların araçlarda taşınması veya bulundurulması ile
                        diğer gayri kanuni işlerde kullanılması kesinlikle yasaktır.</li>
                    <li>Aran kullanım klavuzlarında verilen azami değerlerin üstünde kullanılması ve/veya arızalı olduğu bilinen bir
                        aracın kullanılmaya devam edilmesi sonucu
                        meydana gelebilecek maddi ve manevi tüm zararlardan çalışan sorumludur.</li>
                    <li>Kendisine şirket aracı tahsis edilmiş çalışan, aracın normal ve saglıklı çalışmasından sorumludur. Bu
                        nedenle
                        aracın genel bakımlarının (lastik basıncı, yağ ve su seviyesi vb.) ve periyodik kontrollerinin yapılmasından
                        ve
                        yaptırılmasından sorumludur.</li>
                    <li>Kendisine şirket aracı tahsis edilmiş çalışan, üretici firma tarafından tavsiye edilen aracın periyodik
                        bakımı
                        ve yağ değişimi takvimine uymak ve bu kontrolleri yetkili servislere ve/veya şirketin belirleyeceği diğer
                        servislere yaptırmakla yükümlüdür.</li>
                    <li>Kendisine şirket aracı tahsis edilmiş çalışan, trafik yasası ile belirlenen yolcu sayısı üstünde yolcu
                        taşıyamaz
                        ve yasa esaslarına uygun olarak aracı kullanır.</li>
                    <li>Kullancının uykusuz olması, refleksleri ve hareket kabiliyetleri azaltan yada uyuşturan ilaçlar alması
                        durumunda ya da alkollü olması durumunda araçlar kullanılmamalıdır.</li>
                    <li>Araçlar yarış, hız denemesi, ralli, sağlamlık denemesi, motorlu sporlar faaliyetleri gibi, amaçları dışında
                        veya trafiğe kapalı ya da dağlık arazi, kum, bataklık, dere yatağı gibi tahammül güçlerine uygun olmayan her
                        türlü yer, yol ve şartta kullanılmamalıdir.</li>
                    <li>Tüm şirket araçlarnın müşteriler, iş ortakları ve kamuoyu önünde, Şirketleri temsil etmesi nedeniyle, iç ve
                        dış temizliğine dikkat etmek öncelikle araç
                        kullanıcısının, daha sonra da ilgili amirin sorumluluğundadır.</li>
                    <li>Eğer şirket yeterli park yeri /garaj imkanı sağlayamıyorsa, araç tahsis edilen çalışanlar araçlarının,
                        özellikle
                        gece, güvenli bir yerde park edilmesini
                        sağlamalıdırlar.</li>
                    <li>Kendisine şirket aracı tahsis edilen çalışan, işi gereği yaptığı seyahatlerde aracını park ederek araçtan
                        ayrılması gerekiyorsa, aracın kilitlendiğinden ve varsa alarmının aktif hale getirildiğinden kesinlikle emin
                        olması gerekmektedir. (Eğer araç daha uzun bir süre için park edilmiş olarak bırakılacaksa,
                        yukardakı önlemlere ek olarak varsa direksiyon kilidi gibi alternatif güvenlik önlemlerini de almalıdır.)
                    </li>
                    <li>Kendisine şirket aracı tahsis edilmiş çalışan, genel kabul görmüş yol ve trafik kurallarına uymakla
                        yükümlüdür.</li>
                    <li>Sürücü ehliyetine süreli veya süresiz olarak alıkoyulan ve/veya tamamıyla ehliyetin kendine tanıdığı
                        haklardan
                        yoksun kalan kullanıcı, kendisine tahsis
                        edilen şirket aracını üzerinde olması gereken tüm aksesuarlar ile birlikte tam ve sağlam olarak bir tutanak
                        eşliğinde ilgili departman yöneticisine teslim eder. Kendisine İş Kolu / Görev aracı tahsis edilmiş
                        çalışanın
                        herhangi bir nedenden dolayı sürücü belgesi elinden alınması durumunda, Şirket, çalışanın iş sözleşmesinin
                        fesih hakkını saklı tutar.</li>
                    <li>Kendisıne şirket aracı tahsis edlmiş çalışanın kaza yapması durumunda, gerekli ilk yardım yapıldıktan sonra
                        , aracın yeri değiştirilmeksizin yasal kaza ve alkol raporu alınmalıdır. Ayrıca, bu raporların "asli
                        gibidir"
                        kaşesi vurulmuş birer nüshası ile kazaya karışmış diğer kişilerin ehliyet, ruhsat ve trafik sigorta
                        poliçelerinin
                        birer fotokopisi alınarak Muhasebe Müdürlüğüne gönderilmelidir. Gerekli yasal işlemlerin tamamlanmasından
                        sonra
                        araç en yakın servise
                        götürülmeli ve amirine bilgi verilmelidir.</li>
                    <li>Sigorta kapsamı dışında bulunan tüm aksesuarların ve/veya sürücüye ait özel eşyaların alınmasından ve
                        kaybolmasından çalışan sorumludur.</li>
                </ol>
            </div>
        );
    }
}

const Tutanak = ({ data }) => {
    let componentRef = useRef();

    return (
        <>
            <div>
                {/* button to trigger printing of target component */}
                <ReactToPrint
                    trigger={() => <Button className='btn cancel-btn btn-min'>Yazdır</Button>}
                    content={() => componentRef}
                />

                {/* component to be printed */}
                <div style={{ display: "none" }}>
                    <ComponentToPrint ref={(el) => (componentRef = el)} data={data} />
                </div>
            </div>
        </>
    );
};
export default Tutanak;