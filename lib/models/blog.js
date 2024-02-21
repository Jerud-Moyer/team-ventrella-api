import pool from "../utils/pool.js";

export class Blog {
  id;
  name;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
  }

  static async find() {
    const { rows } = await pool.query(
      `SELECT * FROM blogs`
    )
    return rows.map(row => new Blog(row))
  }
}
