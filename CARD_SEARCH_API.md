# Card Search API - Pagination Guide

## Overview
This guide explains how to send page numbers to the CardHedger API endpoint for paginated card searches.

## API Endpoint
```
GET https://api.cardhedger.com/v1/cards/card-search
```

## Pagination Parameters

### Required Parameters
- **`page`** (number): The page number you want to retrieve (starts from 1)

### Optional Parameters
- **`q`** or **`query`** (string): Search query string
- **`limit`** (number): Number of results per page
- Additional filters as needed

## Usage Examples

### Basic Usage with Page Number

```javascript
import { searchCards } from './js/cardSearch.js';

// Search page 1
const page1 = await searchCards({ 
  query: 'magic', 
  page: 1 
});

// Search page 2
const page2 = await searchCards({ 
  query: 'magic', 
  page: 2 
});
```

### With Limit (Results Per Page)

```javascript
// Get 20 results per page, page 1
const results = await searchCards({ 
  query: 'magic', 
  page: 1, 
  limit: 20 
});
```

### With Authentication Token

```javascript
const results = await searchCards({ 
  query: 'magic', 
  page: 1,
  token: 'your-auth-token-here'
});
```

### Direct Fetch API Usage

If you prefer to use fetch directly:

```javascript
// Page 1
const url1 = 'https://api.cardhedger.com/v1/cards/card-search?page=1&q=magic';
const response1 = await fetch(url1, {
  headers: {
    'Content-Type': 'application/json',
    // Add Authorization header if needed:
    // 'Authorization': 'Bearer your-token'
  }
});
const data1 = await response1.json();

// Page 2
const url2 = 'https://api.cardhedger.com/v1/cards/card-search?page=2&q=magic';
const response2 = await fetch(url2);
const data2 = await response2.json();
```

### Using URLSearchParams

```javascript
const params = new URLSearchParams();
params.append('page', '1');        // Page number
params.append('q', 'magic');       // Search query
params.append('limit', '20');      // Results per page (optional)

const url = `https://api.cardhedger.com/v1/cards/card-search?${params.toString()}`;
const response = await fetch(url);
const data = await response.json();
```

## Response Format

The API typically returns pagination information in the response:

```javascript
{
  cards: [...],           // Array of card objects
  pagination: {
    page: 1,              // Current page
    limit: 20,           // Results per page
    total: 100,          // Total number of results
    totalPages: 5        // Total number of pages
  }
}
```

## Implementation Notes

1. **Page numbers start at 1** (not 0)
2. **Always include the `page` parameter** for pagination to work correctly
3. **The `limit` parameter** controls how many results are returned per page
4. **Handle errors** appropriately - check response status before parsing JSON
5. **Store pagination state** in your application to enable Previous/Next navigation

## Files Created

- `js/cardSearch.js` - Reusable function for card search with pagination
- `card-search-example.html` - Working example demonstrating pagination
- `CARD_SEARCH_API.md` - This documentation file

## Testing

Open `card-search-example.html` in your browser to test the pagination functionality interactively.
