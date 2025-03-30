import io from 'socket.io-client'; // Import the socket.io client library

// socketIOClient connects front-end to with socket backend URL

export const socket = io('http://localhost:8080', {
    transports: ['websocket'],
    autoConnect: false
}); 
