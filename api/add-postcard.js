import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Метод не разрешен. Используйте POST.' });
    }

    const newPostcard = req.body;

    // Путь к файлу products.json
    const filePath = path.join(process.cwd(), 'data', 'products.json');

    try {
        // Читаем текущий JSON-файл
        const data = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '[]';
        const products = JSON.parse(data);

        // Добавляем новую открытку в массив
        products.push(newPostcard);

        // Записываем обновленный массив обратно в файл
        fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf8');

        res.status(200).json({ message: 'Открытка успешно добавлена!' });
    } catch (error) {
        console.error('Ошибка:', error);
        res.status(500).json({ error: 'Ошибка при обработке запроса' });
    }
}
