module.exports = {
  default: {
    requireModule: [],
    require: ["features/support/*.js", "features/step_definitions/*.js"],
    format: [
      "progress-bar",
      "html:reports/cucumber-report.html",
      "json:reports/cucumber-report.json"
    ],
    paths: ["features/**/*.feature"]
  }
};
