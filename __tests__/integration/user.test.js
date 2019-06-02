const truncate = require("../utils/truncate");
const factory = require("../factories");

describe("User", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should encrypt user password", async () => {
    const user = await factory.create("User", {
      password: "123321"
    });

    const pwValid = await user.checkPassword("123321");

    expect(pwValid).toBe(true);
  });

  it("should generate JWT Token", async () => {
    const user = await factory.create("User");

    const token = user.generateToken();

    expect(token).not.toBeUndefined();
  });
});
