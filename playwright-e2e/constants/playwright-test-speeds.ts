import PlaywrightTestSpeeds from "../models/playwright-test-speeds.ts";

const playwrightSpeeds : PlaywrightTestSpeeds = {
  SLOW: {
    speed : "slow",
    speedDuration: 1000
  },
  MEDIUM: {
    speed : "medium",
    speedDuration: 500
  },
  FAST: {
    speed : "fast",
    speedDuration: 0
  }
}

export default playwrightSpeeds;
