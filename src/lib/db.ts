import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data/db.json');

export function getSiteData() {
  try {
    const fileContents = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Error reading db.json", error);
    return {};
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function updateSiteData(data: any) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error("Error writing db.json", error);
    return false;
  }
}
