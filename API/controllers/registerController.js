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
            return res.status(400).json({ error: "Required fields are missing" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const user = await sql`
        INSERT INTO users (first_name, last_name, email, password, address, loan_amount, date_of_birth, phone_number)
        VALUES (${firstName}, ${lastName}, ${email}, ${hashedPassword}, ${address}, ${loanAmount}, ${dateOfBirth}, ${phoneNumber})
        RETURNING *;
      `;

            const { password: _, ...userResult } = user[0];
            res.status(201).json({ message: "User registered successfully", user: userResult });
        } catch (error) {
            console.error("Error in /register:", error);
            if (error.constraint === "users_email_key") {
                return res.status(400).json({ error: "That email is already registered" });
            }
            res.status(500).json({ error: "Error registering user" });
        }
    } catch (error) {
        console.error("Error in /register:", error);
        res.status(500).json({ error: "Error registering user" });
    }
};