Интерфейс выполнен в стиле Windows XP с помощью [XP.css](https://botoxparty.github.io/XP.css/).


## Запуск

```bash
bun install
bun dev
```

Приложение откроется на `http://localhost:5173`.

## Тесты

```bash
bun run test
```

8 тестов покрывают:
- Рендер списка инцидентов с пагинацией
- Фильтрация по статусу
- Поиск по названию
- Пустое состояние при отсутствии результатов
- Рендер деталей инцидента
- Изменение статуса
- Добавление заметки
- Состояние «Не найдено» (404)

## Линтинг и форматирование

```bash
bun run lint
bun run format
```

## Структура проекта

```
src/
├── api.ts                  # Функции обращения к API
├── constants.ts            # Статусы, приоритеты
├── data.ts                 # Моковые данные (20 инцидентов, 4 заметки)
├── types.ts                # TypeScript-типы
├── utils.ts                # Утилиты (форматирование дат, CSS-классы)
├── App.tsx                 # Корневой компонент (Router + QueryClient)
├── main.tsx                # Точка входа (MSW boot)
├── components/
│   ├── XpWindow.tsx        # Оконная рамка в стиле XP
│   ├── IncidentToolbar.tsx # Панель фильтров
│   ├── IncidentTable.tsx   # Таблица инцидентов
│   ├── Pagination.tsx      # Компонент пагинации
│   ├── StatusBadge.tsx     # Бейдж статуса
│   ├── PriorityBadge.tsx   # Бейдж приоритета
│   ├── NotesList.tsx       # Список заметок
│   ├── NoteForm.tsx        # Форма добавления заметки
│   ├── LoadingState.tsx    # Индикатор загрузки
│   └── ErrorState.tsx      # Компонент ошибки
├── hooks/
│   ├── useIncidents.ts     # Хук списка инцидентов
│   └── useIncident.ts      # Хук деталей + мутации
├── pages/
│   ├── IncidentList.tsx    # Страница списка
│   └── IncidentDetail.tsx  # Страница деталей
├── mocks/
│   ├── handlers.ts         # MSW обработчики
│   └── browser.ts          # MSW worker
└── tests/
    ├── setup.ts            # Настройка Vitest
    ├── msw-server.ts       # MSW сервер для тестов
    ├── IncidentList.test.tsx
    └── IncidentDetail.test.tsx
```

## Допущения и ограничения

- Данные хранятся в памяти MSW — при перезагрузке страницы сбрасываются к начальным.
- API мокируется полностью на клиенте, бэкенд не требуется.
- Пагинация серверная (параметры `page` и `limit` передаются в API).
- Фильтры, поиск и сортировка синхронизируются с URL (query params).
- Интерфейс локализован на русский язык.

## Nice-to-have (реализовано)

- ✅ Пагинация с мок-API
- ✅ Синхронизация фильтров/поиска/сортировки/страницы с URL (query params)
