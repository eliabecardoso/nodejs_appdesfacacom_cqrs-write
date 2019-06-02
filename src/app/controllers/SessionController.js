const { User } = require("../models");

class SessionController {
  async authenticate(req, res) {
    const user = await User.findOne({ email: "eliabe.hc@gmail.com" });

    return await res.status(200).send();
  }
}

module.exports = new SessionController();
