# Image Upload in Chat Functionality

This guide explains how to use the image upload functionality in the chat feature.

## Setup

1. **Configure Supabase Storage**:
   - Create a Supabase account at [https://supabase.com](https://supabase.com) if you don't have one
   - Create a new project
   - Navigate to Storage in the Supabase dashboard
   - Create a new bucket called `chat-images`
   - Set the bucket's privacy settings to allow authenticated users to upload and read files

2. **Update Environment Variables**:
   - Add your Supabase credentials to the `.env` file:
   ```
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_KEY=your-supabase-anon-key
   ```

## API Endpoints

### Upload an Image

**Endpoint**: `POST /upload/chat-image`

**Headers**:
- `Authorization`: Bearer token for authentication

**Body**:
- Form data with a file field named `file`

**Response**:
```json
{
  "imageUrl": "https://your-project-id.supabase.co/storage/v1/object/public/chat-images/1/abc123.jpg"
}
```

### Send a Message with an Image

**Endpoint**: `POST /chat/message`

**Headers**:
- `Authorization`: Bearer token for authentication
- `Content-Type`: application/json

**Body**:
```json
{
  "chatId": 1,
  "content": "Check out this image!", // Optional if imageUrl is provided
  "imageUrl": "https://your-project-id.supabase.co/storage/v1/object/public/chat-images/1/abc123.jpg" // Optional if content is provided
}
```

**Response**:
```json
{
  "id": 123,
  "content": "Check out this image!",
  "imageUrl": "https://your-project-id.supabase.co/storage/v1/object/public/chat-images/1/abc123.jpg",
  "chatId": 1,
  "senderId": 1,
  "status": "SENT",
  "createdAt": "2025-05-28T11:30:00.000Z",
  "updatedAt": "2025-05-28T11:30:00.000Z",
  "sender": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

## Frontend Implementation

A basic example implementation is available at `/chat-example.html`. This demonstrates:

1. Selecting an image file
2. Previewing the image before sending
3. Uploading the image to the server
4. Sending a message with the image URL
5. Displaying the image in the chat

To implement this in your own frontend:

1. **Upload the image first**:
```javascript
async function uploadImage(file) {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch('/api/upload/chat-image', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_AUTH_TOKEN'
    },
    body: formData
  });
  
  if (!response.ok) {
    throw new Error('Failed to upload image');
  }
  
  const data = await response.json();
  return data.imageUrl;
}
```

2. **Send the message with the image URL**:
```javascript
async function sendMessage(content, imageUrl) {
  const response = await fetch('/api/chat/message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_AUTH_TOKEN'
    },
    body: JSON.stringify({
      chatId: currentChatId,
      content: content || '',
      imageUrl
    })
  });
  
  if (!response.ok) {
    throw new Error('Failed to send message');
  }
  
  return await response.json();
}
```

3. **Display the image in the chat**:
```javascript
function displayMessage(message) {
  // Create message container
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  
  // Add text content if present
  if (message.content) {
    const textElement = document.createElement('p');
    textElement.textContent = message.content;
    messageElement.appendChild(textElement);
  }
  
  // Add image if present
  if (message.imageUrl) {
    const imageElement = document.createElement('img');
    imageElement.src = message.imageUrl;
    imageElement.classList.add('message-image');
    messageElement.appendChild(imageElement);
  }
  
  // Add to chat container
  document.getElementById('chatContainer').appendChild(messageElement);
}
```

## Limitations and Considerations

1. **File Size**: The default upload limit is set to 5MB. You can adjust this in the `upload.controller.ts` file.
2. **File Types**: Only image files are allowed (checked by MIME type).
3. **Storage Management**: Consider implementing a cleanup strategy for unused images.
4. **Security**: Ensure proper authentication and authorization checks are in place.
