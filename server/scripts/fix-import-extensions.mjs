import { readFileSync, writeFileSync } from 'fs';
import { readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const srcDir = join(__dirname, '../src');

function getAllTsFiles(dir, fileList = []) {
  const files = readdirSync(dir);
  
  files.forEach(file => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    
    if (stat.isDirectory()) {
      getAllTsFiles(filePath, fileList);
    } else if (file.endsWith('.ts')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

function fixImports(content) {
  // Pattern to match: from "./something" or from "../something"
  // But not from "./something.js" (already has extension)
  // And not from node_modules imports (no ./ or ../)
  
  let modified = content;
  
  // Fix import statements - match relative imports that don't already end with .js
  modified = modified.replace(/from\s+(["'])(\.\.?\/[^"']+?)(?!\.js)\1/g, (match, quote, importPath) => {
    // Skip if already has .js extension (shouldn't match due to negative lookahead, but double-check)
    if (importPath.endsWith('.js')) {
      return match;
    }
    // Add .js extension
    return `from ${quote}${importPath}.js${quote}`;
  });
  
  // Also handle type imports
  modified = modified.replace(/import\s+type\s+.*?\s+from\s+(["'])(\.\.?\/[^"']+?)(?!\.js)\1/g, (match, quote, importPath) => {
    if (importPath.endsWith('.js')) {
      return match;
    }
    return match.replace(importPath, importPath + '.js');
  });
  
  return modified;
}

function main() {
  const files = getAllTsFiles(srcDir);
  let updatedCount = 0;
  
  console.log(`Found ${files.length} TypeScript files to process...\n`);
  
  for (const file of files) {
    try {
      const content = readFileSync(file, 'utf-8');
      const fixed = fixImports(content);
      
      if (content !== fixed) {
        writeFileSync(file, fixed, 'utf-8');
        const relativePath = file.replace(srcDir + '/', '');
        console.log(`✓ Updated: ${relativePath}`);
        updatedCount++;
      }
    } catch (error) {
      console.error(`✗ Error processing ${file}:`, error.message);
    }
  }
  
  console.log(`\n✅ Updated ${updatedCount} files out of ${files.length} total.`);
}

main();

