'use client';

// Client-safe version of content functions
// This file contains functions that can safely run on the client side

export function getContentCategories(): Array<{ id: string; label: string }> {
  // This is a placeholder - in a real app, you'd fetch this from an API
  // or pass it as props from the server component
  return [
    { id: 'all-articles', label: 'All Articles' },
    { id: 'resources', label: 'Resources' },
    { id: 'us-immigrant-visas', label: 'US Immigrant Visas' },
    { id: 'us-nonimmigrant-visas', label: 'US Nonimmigrant Visas' },
    { id: 'asylum-humanitarian-relief', label: 'Asylum & Humanitarian Relief' },
    { id: 'citizenship-naturalization', label: 'Citizenship & Naturalization' },
    { id: 'deportation-defense', label: 'Deportation Defense' }
  ];
}