import pool from "../utils/pool";

export class User {
  id;
  email;
  passwordHash;
  firstName;

  constructor(row) {
    this.id = row.id
    this.email = row.email
    this.passwordHash = row.passwordHash
    this.firstName = row.firstName
  }

  static async insert(user) {
    const { rows } = await pool.query(
      `INSERT INTO users (email, passwordHash, firstName)
      VALUES($1, $2, $3)
      RETURNING *
      `,
      [user.email, user.passwordHash, user.firstName]
    )
    return new User(rows[0])
  }

  static async findByEmail(email) {
    const { rows } = await pool.query(
      `SELECT * FROM users
      WHERE EMAIL=$1
      `,
      [email]
    )
    if(!rows[0]) return null
    return new User(rows[0])
  }

  toJSON() {
    const obj = {...this}
    delete obj.passwordHash
    return obj
  }
}
