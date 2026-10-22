# AA agency — SEO implementation

Дата последнего аудита: 2026-10-21.

## Что реализовано
- Статический HTML без клиентской гидратации Next.js.
- 13 индексируемых URL вместо одного лендинга.
- Отдельные страницы под 8 коммерческих услуг.
- Уникальные Title, Description, H1 и canonical.
- Open Graph/Twitter Cards.
- Schema.org: Organization/ProfessionalService, WebSite, Service, BreadcrumbList, FAQPage, CollectionPage.
- XML Sitemap и robots.txt.
- Хлебные крошки и внутренняя перелинковка.
- Отдельные страницы клиентов, о компании и контактов.
- 404 с noindex.
- Добавлена рабочая форма заявки с серверной отправкой на `andrewbaldov@yandex.ru`; все CTA ведут к форме, Telegram оставлен только в шапке.
- Добавлены загрузочный экран AA, бегущая строка и логотипы клиентов из предоставленной версии.
- Не добавлены выдуманные телефон, адрес, отзывы, сертификаты и результаты кейсов.
- Исправлена мобильная шапка и управление меню с клавиатуры.
- Добавлены skip-link, видимый focus, aria-current и связанные aria-controls.
- Усилен контраст вторичного и мелкого текста до уровня WCAG AA.
- Анимации работают как прогрессивное улучшение: контент остаётся видимым без JavaScript.
- Проверены внутренние ссылки, JSON-LD, Open Graph-изображение и карта сайта.
- Добавлена структурированная разметка BreadcrumbList для основных разделов.
- Сокращены перегруженные Title у страниц комплексного маркетинга, SMM и VK Рекламы.

## Важно перед продакшеном
Сайт привязан к собственному домену `https://agency-aa.ru/`. Canonical, Open Graph, JSON-LD, robots.txt и sitemap.xml используют этот адрес. Для отправки формы хостинг должен поддерживать PHP `mail()` и исходящую почту домена.

## Что невозможно сделать только кодом
1. Добавить сайт в Яндекс Вебмастер и Google Search Console.
2. Подтвердить регион и карточку в Яндекс Бизнес.
3. Настроить Метрику/Search Console и реальные цели без ID счётчиков и доступов.
4. Добавить полный NAP (телефон, юридические данные, адрес) без реальных данных.
5. Создать полноценные кейсы без подтверждённых задач, периода и результатов.
6. Нарастить внешние ссылки и упоминания.

## Страницы
- https://agency-aa.ru/
- https://agency-aa.ru/uslugi/
- https://agency-aa.ru/uslugi/kompleksnyj-marketing/
- https://agency-aa.ru/uslugi/yandex-direct/
- https://agency-aa.ru/uslugi/vk-reklama/
- https://agency-aa.ru/uslugi/sozdanie-sajtov/
- https://agency-aa.ru/uslugi/vedenie-sajtov/
- https://agency-aa.ru/uslugi/prodvizhenie-avito/
- https://agency-aa.ru/uslugi/smm/
- https://agency-aa.ru/uslugi/seo-prodvizhenie/
- https://agency-aa.ru/klienty/
- https://agency-aa.ru/o-kompanii/
- https://agency-aa.ru/kontakty/
