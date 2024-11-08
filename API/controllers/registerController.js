require("dotenv").config();
const bcrypt = require("bcrypt");
const { neon } = require("@neondatabase/serverless");

console.log(process.env.DATABASE_URL);
const sql = neon(process.env.DATABASE_URL);

exports.register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      address,
      loanAmount,
      dateOfBirth,
      phoneNumber
    } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await sql`
      INSERT INTO users (first_name, last_name, email, password, address, loan_amount, date_of_birth, phone_number)
      VALUES (${firstName}, ${lastName}, ${email}, ${hashedPassword}, ${address}, ${loanAmount}, ${dateOfBirth}, ${phoneNumber})
      RETURNING *;
    `;

    const { password: _, ...user } = result[0];
    res.status(201).json({ message: "Usuario registrado con éxito", user });
  } catch (error) {
    console.error("Error en /register:", error);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};
