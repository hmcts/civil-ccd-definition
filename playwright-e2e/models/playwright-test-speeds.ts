import PlaywrightSpeed from "../enums/playwright-speed.ts";

export type TestSpeed = {
  speed: PlaywrightSpeed;
  speedDuration: number;
};

type PlaywrightTestSpeeds = {
  SLOW: TestSpeed,
  MEDIUM: TestSpeed,
  FAST: TestSpeed,
}

export default PlaywrightTestSpeeds;

