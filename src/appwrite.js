import { Client, Databases, ID, Query } from 'appwrite';

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject(PROJECT_ID);

const database = new Databases(client);

/**
 * Updates or creates a search term document with an incremented count.
 */
export const updateSearchCount = async (searchTerm, movie) => {
  if (!searchTerm || !movie) {
    console.warn('updateSearchCount called without searchTerm or movie');
    return;
  }

  try {
    // 1. Check if search term already exists
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal('searchTerm', searchTerm),
    ]);

    if (result.documents.length > 0) {
      // 2. Update existing document count
      const doc = result.documents[0];
      await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: (doc.count || 0) + 1,
      });
    } else {
      // 3. Create new document with count = 1
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm,
        count: 1,
        movie_id: movie.id,
        poster_url: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : null,
      });
    }
  } catch (error) {
    console.error('Failed to update search count:', error.message);
  }
};

/**
 * Fetches top 5 trending movies based on count.
 */
export const getTrendingMovies = async () => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc('count'),
    ]);

    return result.documents || [];
  } catch (error) {
    console.error('Failed to fetch trending movies:', error.message);
    return []; // ✅ Always return an array to prevent frontend crash
  }
};
