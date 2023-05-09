const profileEditing = require("./editProfile");

describe("profileEditing", () => {
  let user, token;

  beforeEach(async () => {
    user = {
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    };
    // Register user and get auth token
    await registerUser(user);
    const response = await loginUser(user);
    token = response.data.token;
  });

  afterEach(() => {
    user = null;
    token = null;
  });

  it("should update a user profile", async () => {
    // Update user's name and email
    const updatedUser = {
      name: "Jane Doe",
      email: "janedoe@example.com",
    };
    const response = await editUserProfile(updatedUser, token);
    expect(response.status).toBe(200);
    expect(response.data.user.name).toBe(updatedUser.name);
    expect(response.data.user.email).toBe(updatedUser.email);
  });

  it("should fail to update a user profile with invalid email address", async () => {
    // Update user's email with an invalid email address
    const updatedUser = {
      email: "invalid-email-address",
    };
    const response = await editUserProfile(updatedUser, token);
    expect(response.status).toBe(400);
    expect(response.data.error).toBe("Invalid email address");
  });

  it("should fail to update a user profile if user is not authenticated", async () => {
    // Update user's name and email without providing auth token
    const updatedUser = {
      name: "Jane Doe",
      email: "janedoe@example.com",
    };
    const response = await editUserProfile(updatedUser);
    expect(response.status).toBe(401);
    expect(response.data.error).toBe("Authentication failed");
  });
});
