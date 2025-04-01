const io = require('socket.io-client');
const readline = require('readline');

const socket = io('http://localhost:3000/support', {
  transports: ['websocket']
});

socket.on('connect', () => {
  console.log('Connected to support namespace:', socket.id);
});

socket.on('newMessage', (data) => {
  console.log('New message received:', data);
});

socket.on('disconnect', () => {
  console.log('Disconnected');
});

// для ввода с клавиатуры
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// обрабатываем ввод
rl.on('line', (input) => {
  // sub <chatId>
  const parts = input.split(' ');
  const command = parts[0];

  if (command === 'sub' && parts[1]) {
    const chatId = parts[1];
    socket.emit('subscribeToChat', { chatId });
    console.log(`Отправлен щзапрос подписки на чат ID: ${chatId}`);
  } else if (command === 'msg' && parts.length >= 3) {
    // msg <chatId> <текст сообщения>
    const chatId = parts[1];
    const text = parts.slice(2).join(' ');
    // Отправляем сообщение через серверное API (если ваш сервер слушает событие "sendMessage")
    socket.emit('sendMessage', { chatId, text });
    console.log(`Отправлено сообщение в чат ID: ${chatId}: ${text}`);
  } else {
    console.log('Неизвестная команда.');
  }
});
