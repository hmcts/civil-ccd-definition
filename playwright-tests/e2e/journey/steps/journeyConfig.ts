import type { SpecifiedConfig } from '../specified/specifiedConfig.ts';
import type { UnspecifiedConfig } from '../unspecified/unspecifiedConfig.ts';

// Either journey's config, for the steps both journeys share (in this folder). A shared step reads only what both
// configs have; where the journeys differ, it checks c.caseType ('SPECIFIED' or 'UNSPECIFIED').
export type JourneyConfig = SpecifiedConfig | UnspecifiedConfig;
