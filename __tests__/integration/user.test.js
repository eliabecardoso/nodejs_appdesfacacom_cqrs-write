const bcrypt = require("bcrypt");
const { User } = require("../../src/app/models");
const truncate = require("../utils/truncate");
const faker = require("faker");

describe("User", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should valid user data", async () => {
    const user = new User({
      name: faker.name.findName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    });

    let isValid = false;
    if (user.username && user.name && user.email && user.password)
      isValid = true;

    expect(isValid).toBe(true);
  });

  it("should encrypt user password", async () => {
    const user = await User.create({
      name: "eliabe henriq",
      username: "eliabess",
      email: "elia@gmai.com",
      password: "123321"
    });

    const pwValid = await user.checkPassword("123321");

    expect(pwValid).toBe(true);
  });
});
