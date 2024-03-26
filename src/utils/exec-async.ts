import { exec } from 'child_process';
import util from 'util';

// Convert exec into a promise-based function
const execAsync = util.promisify(exec);

export default execAsync;
