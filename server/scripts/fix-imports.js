import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const srcDir = join(__dirname, '../src');

// Pattern to match relative imports (./ or ../)
const importPattern = /from\s+['"](\.\.?\/[^'"]+)['"]/g;
const requirePattern = /require\s*\(\s*['"](\.\.?\/[^'"]+)['"]\s*\)/g;

function fixImports(content, filePath) {
  let modified = content;
  const fileDir = dirname(filePath);
  
  // Fix import statements
  modified = modified.replace(importPattern, (match, importPath) => {
    // Skip if already has .js extension or is importing from node_modules
    if (importPath.endsWith('.js') || importPath.startsWith('@') || !importPath.startsWith('.')) {
      return match;
    }
    
    // Check if it's a directory import (needs /index.js) or file import (needs .js)
    // For now, just add .js to all relative imports
    const newImportPath = importPath + '.js';
    return match.replace(importPath, newImportPath);
  });
  
  // Fix require statements (if any)
  modified = modified.replace(requirePattern, (match, importPath) => {
    if (importPath.endsWith('.js') || importPath.startsWith('@') || !importPath.startsWith('.')) {
      return match;
    }
    const newImportPath = importPath + '.js';
    return match.replace(importPath, newImportPath);
  });
  
  return modified;
}

async function main() {
  const files = await glob('**/*.ts', { cwd: srcDir, absolute: true });
  
  let updatedCount = 0;
  
  for (const file of files) {
    try {
      const content = readFileSync(file, 'utf-8');
      const fixed = fixImports(content, file);
      
      if (content !== fixed) {
        writeFileSync(file, fixed, 'utf-8');
        console.log(`Updated: ${relative(srcDir, file)}`);
        updatedCount++;
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error.message);
    }
  }
  
  console.log(`\nUpdated ${updatedCount} files.`);
}

main().catch(console.error);

