# Dictionary System backend

A backend-only dictionary system built with **Node.js, Express.js, and MongoDB**.

## Features

* Add a new word
* Search for an exact word
* Automatically increase search frequency
* Prefix-based word suggestions
* Suggestions sorted by frequency and alphabetical order
* Limit suggestions using `k`
* MongoDB indexing for efficient searching

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose

## Project Structure

```text
backend/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── dictionaryController.js
│   ├── models/
│   │   └── Word.js
│   ├── routes/
│   │   └── dictionaryRoutes.js
│   ├── app.js
│   └── server.js
├── .env
├── package.json
└── README.md
```

## Data Structure

Each word is stored in MongoDB as:

```json
{
  "word": "apple",
  "frequency": 5
}
```

## API Endpoints

### 1. Add Word

```http
POST /api/v1/dictionary/words
```
---

### 2. Search Word

```http
GET /api/v1/dictionary/search/apple
```

### 3. Prefix Suggestions

```http
GET /api/v1/dictionary/suggest/app?k=3
```

Suggestions are sorted by:

1. Higher frequency first
2. Alphabetical order when frequencies are equal
3. Maximum `k` results

## Installation

Clone the project and install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=3000
MONGO_URI= *************
```

Start the server:

```bash
npm run dev
```

Server:

```text
http://localhost:3000
```

## Testing

The APIs can be tested using **Postman**

Example:

```bash
curl http://localhost:3000/api/v1/dictionary/search/hello
```
