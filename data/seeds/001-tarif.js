/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("adim_icindekiler").del();
  await knex("icindekiler").del();
  await knex("adimlar").del();
  await knex("tarif").del();

  await knex("tarif").insert([
    { tarif_adi: "Spagetti Bolonez", kayit_tarihi: knex.fn.now() },
  ]);

  await knex("adimlar").insert([
    {
      adim_sirasi: 1,
      adim_talimati: "Büyük bir tencereyi orta ateşe koyun",
      tarif_id: 1,
    },
    {
      adim_sirasi: 2,
      adim_talimati: "1 yemek kaşığı zeytinyağı ekleyin",
      tarif_id: 1,
    },
  ]);

  await knex("icindekiler").insert([{ icindekiler_adi: "zeytinyağı" }]);

  await knex("adim_icindekiler").insert([
    { miktar: 0.014, adim_id: 2, icindekiler_id: 1 },
  ]);
};
