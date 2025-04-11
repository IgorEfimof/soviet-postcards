const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data/products.json');

// Middleware для обработки JSON
app.use(express.json());

// Обработчик POST-запроса для сохранения данных
app.post('/save-products', (req, res) => {
  const products = req.body;

  // Запись в файл
  fs.writeFile(DATA_FILE, JSON.stringify(products, null, 2), (err) => {
    if (err) {
      console.error('Ошибка записи файла:', err);
      return res.status(500).send('Ошибка при сохранении данных');
    }
    res.send('Данные успешно сохранены');
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
