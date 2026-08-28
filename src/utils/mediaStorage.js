/**
 * Identifine Media Storage
 * Uses IndexedDB to persistently store uploaded images client-side.
 * Survives page reloads. Functions return Promises.
 */

const DB_NAME = 'identifine_media_db';
const STORE_NAME = 'media_items';
const DB_VERSION = 1;

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('date', 'date', { unique: false });
      }
    };
    req.onsuccess = (e) => resolve(e.target.result);
    req.onerror = (e) => reject(e.target.error);
  });
}

/**
 * Add a File object to the media library.
 * Returns the saved media item with id, name, type, size, dataUrl, date.
 */
export async function addMedia(file) {
  const db = await openDB();
  const dataUrl = await fileToDataUrl(file);
  const item = {
    id: `media-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    name: file.name,
    type: file.type,
    size: formatBytes(file.size),
    sizeBytes: file.size,
    dataUrl,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    addedAt: Date.now(),
    alt: '',
    caption: '',
  };

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.add(item);
    req.onsuccess = () => resolve(item);
    req.onerror = (e) => reject(e.target.error);
  });
}

/**
 * Get all media items, sorted newest first.
 */
export async function getAllMedia() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const req = store.getAll();
    req.onsuccess = (e) => {
      const items = e.target.result || [];
      resolve(items.sort((a, b) => b.addedAt - a.addedAt));
    };
    req.onerror = (e) => reject(e.target.error);
  });
}

/**
 * Update a media item's metadata (alt text, caption, etc.).
 */
export async function updateMedia(id, updates) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const getReq = store.get(id);
    getReq.onsuccess = (e) => {
      const item = { ...e.target.result, ...updates };
      const putReq = store.put(item);
      putReq.onsuccess = () => resolve(item);
      putReq.onerror = (er) => reject(er.target.error);
    };
    getReq.onerror = (e) => reject(e.target.error);
  });
}

/**
 * Delete a media item by id.
 */
export async function deleteMedia(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.delete(id);
    req.onsuccess = () => resolve();
    req.onerror = (e) => reject(e.target.error);
  });
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}
