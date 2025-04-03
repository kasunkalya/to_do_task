  export default {
    preset: "@vue/cli-plugin-unit-jest",

    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1"
    },
    testEnvironment: "jsdom",
    transformIgnorePatterns: ["/node_modules/(?!(axios)/)"]
  };