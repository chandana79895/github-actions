export default {
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.tsx?$": "ts-jest",
    },
    moduleNameMapper: {
        "\\.(css|less|sass|scss)$": "identity-obj-proxy",
        "^.+\\.svg$": "jest-transformer-svg",
        "\\.(png|jpg|jpeg|gif)$": "identity-obj-proxy",
        "^@/(.*)$": "<rootDir>/src/$1",
      },    
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  };