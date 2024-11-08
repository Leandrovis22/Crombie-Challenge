// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');


// exports.login = async (req, res) => {
//   const { dni, password } = req.body;

//   try {
//     const user = await prisma.usuario.findUnique({
//       where: { dni: dni }
//     });

//     if (!user) {
//       return res.status(404).json({ error: 'Usuario no encontrado' });
//     }

//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) {
//       return res.status(401).json({ error: 'Contraseña incorrecta' });
//     }

//     const token = jwt.sign(
//       { id: user.id.toString(), rol: user.rol },
//       process.env.JWT_SECRET,
//       { expiresIn: '30m' }
//     );

//     const { password: _, createdAt, Tiqueterias, id, ...userData } = user;
//     console.log(token)
//     res.json({
//       message: 'Login exitoso',
//       token: token,
//       user: userData
//     });
//   } catch (error) {
//     console.error('Error en el login:', error);
//     res.status(500).json({ error: 'Error en el login' });
//   }
// };

