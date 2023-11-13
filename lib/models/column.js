import pool from '../utils/pool.js';

export class Column {
  id;
  title;
  content;
  created_at;
  publish_date;
  published;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.content = row.content;
    this.publish_date = row.publish_date;
    this.published = row.published;
  }
  
  static async insert(column) {
    const { rows } = await pool.query(
      `INSERT into columns (title, content, created_at, publish_Date, published)
      VALUES ($1, $2, $3, $4, $5)
      RETURNG *`,
      [column.title, column.content, column.created_at, column.publish_date, column.published]
    )  
    return new Column(rows[0])
  }

  static async find() {
    const { rows } = await pool.query(
      'SELECT * FROM columns'
    )
    return rows.map(row => new Column(row))
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM columns WHERE id=$1',
      [id]
    )
    if(!rows[0]) return null
    else return new Column(rows[0])
  }
}
