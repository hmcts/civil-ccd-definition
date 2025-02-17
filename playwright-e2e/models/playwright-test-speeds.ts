
export type TestSpeed = {
  speed: 'fast' | 'medium' | 'slow'
  speedDuration: number;
};

type PlaywrightTestSpeeds = {
  SLOW: TestSpeed,
  MEDIUM: TestSpeed,
  FAST: TestSpeed,
}

export default PlaywrightTestSpeeds;

