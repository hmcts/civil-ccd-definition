import PlaywrightSpeed from "../enums/playwright-speed.ts";
import PlaywrightTestSpeeds from "../models/playwright-test-speeds.ts";

const playwrightSpeeds : PlaywrightTestSpeeds = {
  SLOW: {
    speed : PlaywrightSpeed.SLOW,
    speedDuration: 1000
  },
  MEDIUM: {
    speed : PlaywrightSpeed.MEDIUM,
    speedDuration: 500
  },
  FAST: {
    speed : PlaywrightSpeed.FAST,
    speedDuration: 0
  }
}

export default playwrightSpeeds;
