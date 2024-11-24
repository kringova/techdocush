# Начало работы с API платежной системы PayConnect

## Обзор

API PayConnect позволяет интегрировать платежные функции в ваше веб-приложение или мобильное приложение. Данное руководство поможет вам начать работу с API и выполнить базовую интеграцию платежного процесса.

## Предварительные требования

Перед началом работы убедитесь, что у вас есть:

- Учетная запись разработчика PayConnect
- Ключи API (публичный и секретный)
- HTTPS-enabled endpoint для получения webhook-уведомлений
- Node.js версии 14.0 или выше (для примеров кода)

## Аутентификация

Все запросы к API должны быть аутентифицированы с помощью Bearer-токена. Для получения токена:

1. Отправьте POST-запрос на `/v1/auth/token`
2. Включите ваш секретный ключ в заголовок Authorization
3. Укажите область действия (scope) токена

```javascript
const response = await fetch('https://api.payconnect.com/v1/auth/token', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_SECRET_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    scope: 'payments.write payments.read'
  })
});
```

Полученный токен действителен в течение 24 часов.

## Создание платежа

Для создания нового платежа отправьте POST-запрос на endpoint `/v1/payments`:

```javascript
const payment = await fetch('https://api.payconnect.com/v1/payments', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    amount: 1000, // сумма в минимальных единицах валюты
    currency: 'RUB',
    description: 'Оплата заказа #12345',
    customer: {
      email: 'customer@example.com'
    }
  })
});
```

### Параметры запроса

| Параметр | Тип | Обязательный | Описание |
|----------|-----|--------------|-----------|
| amount | integer | Да | Сумма платежа в минимальных единицах валюты |
| currency | string | Да | Трехбуквенный код валюты (ISO 4217) |
| description | string | Нет | Описание платежа |
| customer | object | Да | Информация о плательщике |

## Обработка webhook-уведомлений

PayConnect отправляет уведомления о событиях платежей на указанный вами endpoint. Настройте обработчик для следующих событий:

- `payment.succeeded`: Платеж успешно завершен
- `payment.failed`: Платеж не удался
- `payment.refunded`: Платеж возвращен

```javascript
app.post('/webhooks', (req, res) => {
  const signature = req.headers['x-payconnect-signature'];
  const event = req.body;
  
  if (verifySignature(signature, event)) {
    switch (event.type) {
      case 'payment.succeeded':
        // Обработка успешного платежа
        break;
      case 'payment.failed':
        // Обработка неудачного платежа
        break;
    }
    res.status(200).send('OK');
  } else {
    res.status(400).send('Invalid signature');
  }
});
```

## Обработка ошибок

API использует стандартные HTTP-коды состояния для индикации успеха или неудачи запроса:

- 2xx: Успешное выполнение
- 4xx: Ошибка в запросе
- 5xx: Ошибка сервера

Пример ответа с ошибкой:

```json
{
  "error": {
    "code": "invalid_amount",
    "message": "Amount must be greater than 0",
    "docs_url": "https://docs.payconnect.com/errors#invalid_amount"
  }
}
```

## Ограничения и квоты

- Максимум 100 запросов в минуту с одного IP-адреса
- Максимальная сумма одного платежа: 200 000 RUB
- Время жизни платежной сессии: 30 минут

## Дополнительные ресурсы

- [Полная документация API](https://docs.payconnect.com)
- [Примеры интеграции](https://github.com/payconnect/examples)
- [SDK для различных языков программирования](https://docs.payconnect.com/sdk)
- [Справочник по ошибкам](https://docs.payconnect.com/errors)
