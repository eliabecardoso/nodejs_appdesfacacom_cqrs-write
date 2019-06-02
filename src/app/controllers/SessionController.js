const { User } = require("../models");

class SessionController {
  async authenticate(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user)
      return res.status(401).json({ message: "Usuário não encontrado" });

    if (!await user.checkPassword(password))
      return res.status(401).json({ message: "Senha inválida" });

    return res.json({
      user,
      token: user.generateToken()
    });
  }
}

module.exports = new SessionController();
