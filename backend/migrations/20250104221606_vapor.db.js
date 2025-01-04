/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("devs", (tbl) => {
      tbl.text("name", 128).notNullable().unique().primary();
      tbl.text("country");
      tbl.integer("year");
    })
    .createTable("games", (tbl) => {
      tbl.increments("id");
      tbl.text("name");
      tbl.text("genere");
      tbl.integer("year");
      tbl
        .text("dev", 128)
        .notNullable()
        .references("name")
        .inTable("devs")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("devs").dropTableIfExists("games");
};
