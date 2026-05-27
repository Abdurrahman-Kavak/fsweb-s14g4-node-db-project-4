/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("tarif", (table) => {
      table.increments("tarif_id");
      table.text("tarif_adi").notNullable().unique();
      table.timestamp("kayit_tarihi").defaultTo(knex.fn.now());
    })
    .createTable("adimlar", (table) => {
      table.increments("adim_id");
      table.integer("adim_sirasi").notNullable();
      table.text("adim_talimati").notNullable();
      table
        .integer("tarif_id")
        .unsigned()
        .notNullable()
        .references("tarif_id")
        .inTable("tarif")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("icindekiler", (table) => {
      table.increments("icindekiler_id");
      table.text("icindekiler_adi").notNullable().unique();
    })
    .createTable("adim_icindekiler", (table) => {
      table.increments("adim_icindekiler_id");
      table.float("miktar").notNullable();
      table
        .integer("adim_id")
        .unsigned()
        .notNullable()
        .references("adim_id")
        .inTable("adimlar")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table
        .integer("icindekiler_id")
        .unsigned()
        .notNullable()
        .references("icindekiler_id")
        .inTable("icindekiler")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("adim_icindekiler")
    .dropTableIfExists("icindekiler")
    .dropTableIfExists("adimlar")
    .dropTableIfExists("tarif");
};
