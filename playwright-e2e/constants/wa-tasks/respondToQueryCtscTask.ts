import type WATask from '../../models/wa-task';

// Query identifiers are generated at runtime, so task retrieval deliberately
// matches the stable task type for the current case.
const task = {
  type: 'respondToQueryCTSC',
} as WATask;

export default task;
