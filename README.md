# Universal Clipboard Manager with Context (ClipContext)

A browser extension that enhances productivity by providing a persistent, searchable, and context-aware clipboard history. It automatically captures items copied within the browser, remembers their source (URL and page title), and utilizes AI to categorize the content, making retrieval intuitive and efficient.

## Features

-   **Persistent Clipboard History**: Never lose copied items again
-   **Context Awareness**: Automatically records the source URL and page title
-   **AI Categorization**: Uses Gemini AI to categorize clipboard content
-   **Advanced Search & Filtering**: Find items by content, source, category, or date
-   **Favorites System**: Mark important items for quick access
-   **Privacy-Focused**: Anonymous user IDs and secure data handling

## Project Structure

-   `extension/`: Chrome extension (Manifest V3)
-   `backend/`: Express.js backend with MongoDB and Gemini AI integration

## Setup Instructions

### Prerequisites

-   Node.js and npm
-   MongoDB
-   Google AI API key (for Gemini)

### Backend Setup

1. Install dependencies: `npm install`
2. Create a `.env` file in the root directory with the following variables:
    ```
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/clipcontext
    GEMINI_API_KEY=your_gemini_api_key
    ```
3. Start the server: `npm run dev`

### Extension Setup

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable Developer Mode
3. Click "Load unpacked" and select the `extension` folder

## API Documentation

### Endpoints

-   `POST /api/v1/items`: Add a new clipboard item
-   `GET /api/v1/items`: Retrieve clipboard items (with pagination, filtering, searching)
-   `DELETE /api/v1/items/:id`: Delete a specific item
-   `DELETE /api/v1/items`: Delete all items for a user
-   `PUT /api/v1/items/:id/favorite`: Toggle favorite status

## License

MIT

## Author

Chirag Singhal
