/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("tarif", (table) => {
      table.increments("tarif_id").unique();
      table.text("tarif_adi").notNullable();
      table.timestamp("kayit_tarihi").defaultTo(knex.fn.now());
    })
    .createTable("adimlar", (table) => {
      table.increments("adim_id");
      table.integer("adim_sirasi").notNullable();
      table.text("adim_talimati").notNullable();
      table.integer("tarif_id").references("tarif_id").inTable("tarif");
    })
    .createTable("icindekiler", (table) => {
      table.increments("icindekiler_id");
      table.text("icindekiler_adi").notNullable();
      table.float("miktar").notNullable();
      table.integer("adim_id").references("adim_id").inTable("adimlar");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
