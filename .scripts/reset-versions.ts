import * as fs from 'fs';
import * as path from 'path';

// Define the new version
const newVersion = '0.1.0';

// Function to recursively find package.json files and update the version
function updateVersion(dir: string): void {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);

    if (fs.lstatSync(fullPath).isDirectory()) {
      // Skip node_modules directory
      if (file !== 'node_modules') {
        updateVersion(fullPath);
      }
    } else if (file === 'package.json') {
      const packageJson = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
      packageJson.version = newVersion;
      fs.writeFileSync(fullPath, JSON.stringify(packageJson, null, 2) + '\n');
      console.log(`Updated version in ${fullPath}`);
    }
  });
}

// Start updating from the current directory
updateVersion(process.cwd());
