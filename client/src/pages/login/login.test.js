const userLogin = require("./Login");

describe("userLogin", () => {
  let user;

  beforeEach(() => {
    user = {
      email: "johndoe@example.com",
      password: "123456",
    };
  });

  afterEach(() => {
    user = null;
  });

  it("should log in a registered user", async () => {
    // Register user first
    await registerUser(user);

    // Attempt to log in with registered credentials
    const response = await loginUser(user);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty("token");
  });

  it("should fail to log in with incorrect password", async () => {
    // Register user first
    await registerUser(user);

    // Attempt to log in with incorrect password
    user.password = "incorrect-password";
    const response = await loginUser(user);
    expect(response.status).toBe(401);
    expect(response.data.error).toBe("Incorrect password");
  });

  it("should fail to log in with non-existent user", async () => {
    // Attempt to log in with non-existent user
    const response = await loginUser(user);
    expect(response.status).toBe(404);
    expect(response.data.error).toBe("User not found");
  });
});
