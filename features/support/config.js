module.exports = {
  baseUrl: "https://www.saucedemo.com",
  users: {
    standard: { username: "standard_user", password: "secret_sauce" },
    lockedOut: { username: "locked_out_user", password: "secret_sauce" },
    problem: { username: "problem_user", password: "secret_sauce" },
    performanceGlitch: { username: "performance_glitch_user", password: "secret_sauce" },
    errorUser: { username: "error_user", password: "secret_sauce" },
    visualUser: { username: "visual_user", password: "secret_sauce" },
    invalidPassword: { username: "standard_user", password: "wrong_password_123" },
    unregistered: { username: "not_a_real_user", password: "not_a_real_password" }
  }
};
