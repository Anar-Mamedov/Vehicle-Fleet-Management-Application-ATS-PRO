// Arama metinlerini büyük/küçük harf ayırt etmeden karşılaştırmak için kullanılır.
// toLowerCase() Türkçede hatalı çalışır: "İ" harfini "i̇" (i + ayrı nokta karakteri) yapar, bu yüzden
// "ÇİMEN" içinde "çim" bulunamaz. Bunun yerine "tr" yerel ayarıyla küçültülür.
// Büyük "I" harfi Türkçe "ı" da olabilir Latin "i" de (IVECO, MITSUBISHI); iki yazımın da bulunabilmesi için
// "ı" ile "i" aynı harf sayılır.
const toSearchText = (value) =>
  String(value ?? "")
    .toLocaleLowerCase("tr")
    .replace(/ı/g, "i");

export const includesSearchText = (text, searchText) => toSearchText(text).includes(toSearchText(searchText));

// Ant Design Select `filterOption` prop'u için: seçeneğin label'ı aranan metni içeriyor mu
export const filterOptionByLabel = (input, option) => includesSearchText(option?.label, input);
