const os = require('os');
const { execSync } = require('child_process');

const args = process.argv.slice(2);
if (args.length < 2) {
    console.error('Usage: node run-tests.js <reportFileName> <grepTag>');
    process.exit(1);
}

const totalCPUs = os.cpus().length;
const useHalf = process.env.USE_HALF_CORES === 'true';
const threadCount = useHalf ? Math.max(1, Math.floor(totalCPUs / 2)) : totalCPUs;

const [reportFileName, grepTag] = args;

// Build command with grep quoted to prevent shell interpretation
const command = `npx codeceptjs run-workers --suites ${threadCount} --grep "${grepTag}" --reporter mocha-multi --verbose`;

console.log(`Running with ${threadCount} workers: ${command}`);

execSync(command, {
    stdio: 'inherit',
    shell: true,
    env: {
        ...process.env,
        MOCHAWESOME_REPORTFILENAME: reportFileName
    }
});
