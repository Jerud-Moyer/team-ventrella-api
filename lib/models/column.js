import pool from '../utils/pool.js';

export class Column {
  id;
  title;
  content;
  created_at;
  publish_date;
  published;
  blog_id;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.content = row.content;
    this.created_at = row.created_at;
    this.publish_date = row.publish_date;
    this.published = row.published;
    this.blog_id = row.blog_id;
  }
  
  static async insert(column) {
    console.log('col in model => ', column)
    const { rows } = await pool.query(
      `INSERT into columns (title, content, created_at, published, blog_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [column.title, column.content, column.created_at, column.published, column.blog_id]
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
  
  static async findByBlogId(blogId) {
    const { rows } = await pool.query(
      `SELECT * FROM columns
      WHERE blog_id=$1
      ORDER BY created_at DESC
      `,
      [blogId]
    )
    return rows.map(row => new Column(row))
  }

  static async findPublished(blogId) {
    const { rows } = await pool.query(
      `SELECT * FROM columns
      WHERE published=true
      AND blog_id=$1
      ORDER BY created_at DESC
      `,
      [blogId]
    )
    console.log('PUBLISHED IN MODEL => ', rows)
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
          published=$4,
          blog_id=$5
      WHERE id=$6
      RETURNING * 
      `,
      [col.title, col.content, col.created_at, col.published, col.blog_id, col.id]
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
  
  static async getCountPublished(blogId) {
    const { rows } = await pool.query(
      `SELECT COUNT(*) 
      FROM columns
      WHERE published=true
      AND blog_id=$1
      `,
      [blogId]
    )
    return rows[0]
  }
  
  static async getCount(blogId) {
    const { rows } = await pool.query(
      `SELECT COUNT(*) 
      FROM columns
      WHERE blog_id=$1
      `,
      [blogId]
    )
    return rows[0]
  }
}
