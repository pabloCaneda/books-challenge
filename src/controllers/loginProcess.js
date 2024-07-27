
 const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const db = require("../database/models");

module.exports = (req, res) => {
  const errors = validationResult(req);
  

  if (!errors.isEmpty()) {
    const validationErrors = errors.array().map(error => error.msg); 
    return res.status(400).json({ errors: validationErrors }); 
  }
  const { email, password, recordarme } = req.body;

  db.User.findOne({
    where: {
      email,
     
    }
  }) 
  .then(user => {
     
    if (!user) {
      return res.status(404).send("El usuario no existe");
    }

    const passHash = bcrypt.compareSync(password, user.dataValues.Pass);

    if (!passHash) {
      return res.status(401).send("Credenciales inválidas");
    }

    const { nombre, categoryId } = user.dataValues

    req.session.userLogin = {
      nombre,
      email,
      categoryId,
    };
    console.log(user.dataValues)
    if (recordarme) {
      res.cookie("userLogin", req.session.userLogin, { maxAge: 1000 * 60 * 60 * 24 * 30 }); 
    } 
console.log(recordarme)
    res.redirect("/");
  })
  .catch(error => {
    console.error("Error al buscar el usuario en la base de datos:", error);
    return res.status(500).send("Error del servidor");
  });
}
