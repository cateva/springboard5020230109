const userRegistration = require("./Register");

describe("userRegistration", () => {
  let user;

  beforeEach(() => {
    user = {
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
      county: "san mateo",
      city: "san mateo",
      phone: "1234567890",
    };
  });

  afterEach(() => {
    user = null;
  });

  it("should create a new user", async () => {
    const response = await registerUser(user);
    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty("user");
    expect(response.data.user.name).toBe(user.name);
    expect(response.data.user.email).toBe(user.email);
  });

  it("should fail to create a user with invalid email address", async () => {
    user.email = "invalid-email-address";
    const response = await registerUser(user);
    expect(response.status).toBe(400);
    expect(response.data.error).toBe("Invalid email address");
  });

  it("should fail to create a user with a password that is too short", async () => {
    user.password = "12345";
    const response = await registerUser(user);
    expect(response.status).toBe(400);
    expect(response.data.error).toBe("Password is too short");
  });

  it("should fail to create a user if email is already in use", async () => {
    // Register user first
    await registerUser(user);
    // Try to register again with same email
    const response = await registerUser(user);
    expect(response.status).toBe(409);
    expect(response.data.error).toBe("Email address is already in use");
  });
});
