const db = require("../../data/db-config");

async function idyeGoreTarifGetir(tarif_id) {
  const rows = await db("tarif as t")
    .leftJoin("adimlar as a", "t.tarif_id", "a.tarif_id")
    .leftJoin("adim_icindekiler as ai", "a.adim_id", "ai.adim_id")
    .leftJoin("icindekiler as i", "ai.icindekiler_id", "i.icindekiler_id")
    .where("t.tarif_id", tarif_id)
    .select(
      "t.tarif_id",
      "t.tarif_adi",
      "t.kayit_tarihi",
      "a.adim_id",
      "a.adim_sirasi",
      "a.adim_talimati",
      "i.icindekiler_id",
      "i.icindekiler_adi",
      "ai.miktar",
    )
    .orderBy("a.adim_sirasi");

  if (rows.length === 0) return null;

  // Sonuç JSON nesnesini oluştur
  const tarif = {
    tarif_id: rows[0].tarif_id,
    tarif_adi: rows[0].tarif_adi,
    kayit_tarihi: rows[0].kayit_tarihi,
    adimlar: [],
  };

  const adimlarMap = new Map(); // Aynı adımı tekrar eklememek için yardımcı bir Map

  rows.forEach((row) => {
    if (row.adim_id && !adimlarMap.has(row.adim_id)) {
      const adim = {
        adim_id: row.adim_id,
        adim_sirasi: row.adim_sirasi,
        adim_talimati: row.adim_talimati,
        icindekiler: [],
      };
      adimlarMap.set(row.adim_id, adim);
      tarif.adimlar.push(adim);
    }

    if (row.icindekiler_id) {
      adimlarMap.get(row.adim_id).icindekiler.push({
        icindekiler_id: row.icindekiler_id,
        icindekiler_adi: row.icindekiler_adi,
        miktar: row.miktar,
      });
    }
  });

  return tarif;
}

module.exports = { idyeGoreTarifGetir };
