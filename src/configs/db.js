import Dexie from 'dexie';

export const DB_NAME = "gmap_react_db";
export const db = new Dexie(DB_NAME);

db.version(1).stores({
  list: '++index, id, title, created_at, address, geometry, etc', // Primary key and indexed props
});
