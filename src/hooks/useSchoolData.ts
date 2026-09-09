import { useSyncExternalStore } from 'react';
import { subscribeToData, getDataVersion } from '../data/schoolData';

/**
 * Subscribes to school data updates. When backend data arrives and mutates
 * the module-level arrays (SCHOOL, FACULTY, GALLERY_ITEMS, etc.), this hook
 * triggers a re-render so the UI reflects the latest data.
 *
 * Call this in any component that reads from schoolData exports.
 */
export function useSchoolData() {
  return useSyncExternalStore(subscribeToData, getDataVersion, getDataVersion);
}