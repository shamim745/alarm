/**
 * Card Search API with Pagination Support
 * 
 * This module provides functions to search cards using the CardHedger API
 * with pagination support.
 */

const API_BASE_URL = 'https://api.cardhedger.com/v1/cards';

/**
 * Search cards with pagination
 * @param {Object} searchParams - Search parameters
 * @param {string} searchParams.query - Search query (optional)
 * @param {number} searchParams.page - Page number (default: 1)
 * @param {number} searchParams.limit - Results per page (optional)
 * @param {Object} searchParams.filters - Additional filters (optional)
 * @param {string} searchParams.token - Authentication token (optional)
 * @returns {Promise<Object>} API response with cards and pagination info
 */
export async function searchCards({ 
  query = '', 
  page = 1, 
  limit = null,
  filters = {},
  token = null 
} = {}) {
  try {
    // Build query parameters
    const params = new URLSearchParams();
    
    // Add search query if provided
    if (query) {
      params.append('q', query);
    }
    
    // Add page number (required for pagination)
    params.append('page', page.toString());
    
    // Add limit if provided
    if (limit) {
      params.append('limit', limit.toString());
    }
    
    // Add any additional filters
    Object.keys(filters).forEach(key => {
      if (filters[key] !== null && filters[key] !== undefined) {
        params.append(key, filters[key]);
      }
    });
    
    // Build the full URL
    const url = `${API_BASE_URL}/card-search?${params.toString()}`;
    
    // Prepare headers
    const headers = {
      'Content-Type': 'application/json',
    };
    
    // Add authentication token if provided
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Make the API request
    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `API request failed with status ${response.status}`
      );
    }
    
    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error('Error searching cards:', error);
    throw error;
  }
}

/**
 * Example usage:
 * 
 * // Basic search with page number
 * const results = await searchCards({ query: 'magic', page: 1 });
 * 
 * // Search with page 2
 * const page2Results = await searchCards({ query: 'magic', page: 2 });
 * 
 * // Search with page number and limit
 * const limitedResults = await searchCards({ 
 *   query: 'magic', 
 *   page: 1, 
 *   limit: 20 
 * });
 * 
 * // Search with authentication token
 * const authResults = await searchCards({ 
 *   query: 'magic', 
 *   page: 1,
 *   token: 'your-auth-token-here'
 * });
 * 
 * // Search with additional filters
 * const filteredResults = await searchCards({
 *   query: 'magic',
 *   page: 1,
 *   filters: {
 *     set: 'core-set',
 *     rarity: 'rare'
 *   }
 * });
 */
