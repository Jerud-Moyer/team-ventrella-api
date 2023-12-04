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
    this.created_at = row.created_at;
    this.publish_date = row.publish_date;
    this.published = row.published;
  }
  
  static async insert(column) {
    const { rows } = await pool.query(
      `INSERT into columns (title, content, created_at, published)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [column.title, column.content, column.created_at, column.published]
    )  
    return new Column(rows[0])
  }

  static async find() {
    const { rows } = await pool.query(
      `SELECT * FROM columns
      ORDER BY created_at DESC
      `
    )
    return rows.map(row => new Column(row))
  }

  static async findPublished() {
    const { rows } = await pool.query(
      `SELECT * FROM columns
      WHERE published=true
      ORDER BY created_at DESC
      `
    )
    console.log('we got rows? => ', rows)
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

  static async update(col) {
    const { rows } = await pool.query(
      `UPDATE columns
      SET title=$1,
          content=$2,
          created_at=$3,
          published=$4
      WHERE id=$5
      RETURNING * 
      `,
      [col.title, col.content, col.created_at, col.published, col.id]
    )
    return new Column(rows[0])
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE FROM columns
      WHERE id=$1
      RETURNING *
      `,
      [id]
    )
    return new Column(rows[0])
  }
  
  static async getCountPublished() {
    const { rows } = await pool.query(
      `SELECT COUNT(*) 
      FROM columns
      WHERE published=true
      `
    )
    return rows[0]
  }
  
  static async getCount() {
    const { rows } = await pool.query(
      'SELECT COUNT(*) FROM columns'
    )
    return rows[0]
  }
}
