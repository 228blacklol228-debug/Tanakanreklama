# DIGITAL LAB — SEO implementation

Дата последнего аудита: 2026-10-14.

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
- Убрана фиктивная форма: CTA ведёт в реальный Telegram, указанный в исходном сайте.
- Не добавлены выдуманные телефон, e-mail, адрес, отзывы, сертификаты и результаты кейсов.
- Исправлена мобильная шапка и управление меню с клавиатуры.
- Добавлены skip-link, видимый focus, aria-current и связанные aria-controls.
- Усилен контраст вторичного и мелкого текста до уровня WCAG AA.
- Анимации работают как прогрессивное улучшение: контент остаётся видимым без JavaScript.
- Проверены внутренние ссылки, JSON-LD, Open Graph-изображение и карта сайта.
- Добавлена структурированная разметка BreadcrumbList для основных разделов.
- Сокращены перегруженные Title у страниц комплексного маркетинга, SMM и VK Рекламы.

## Важно перед продакшеном
Сайт сейчас привязан к GitHub Pages адресу `https://228blacklol228-debug.github.io/Tanakanreklama/`. Если будет собственный домен, массово заменить BASE_URL/BASE_PATH в HTML, robots.txt, sitemap.xml, Open Graph и JSON-LD. После переноса старый адрес нужно редиректить на новый там, где это технически возможно.

## Что невозможно сделать только кодом
1. Добавить сайт в Яндекс Вебмастер и Google Search Console.
2. Подтвердить регион и карточку в Яндекс Бизнес.
3. Настроить Метрику/Search Console и реальные цели без ID счётчиков и доступов.
4. Добавить NAP (телефон, e-mail, юридические данные, адрес) без реальных данных.
5. Создать полноценные кейсы без подтверждённых задач, периода и результатов.
6. Нарастить внешние ссылки и упоминания.

## Страницы
- https://228blacklol228-debug.github.io/Tanakanreklama/
- https://228blacklol228-debug.github.io/Tanakanreklama/uslugi/
- https://228blacklol228-debug.github.io/Tanakanreklama/uslugi/kompleksnyj-marketing/
- https://228blacklol228-debug.github.io/Tanakanreklama/uslugi/yandex-direct/
- https://228blacklol228-debug.github.io/Tanakanreklama/uslugi/vk-reklama/
- https://228blacklol228-debug.github.io/Tanakanreklama/uslugi/sozdanie-sajtov/
- https://228blacklol228-debug.github.io/Tanakanreklama/uslugi/vedenie-sajtov/
- https://228blacklol228-debug.github.io/Tanakanreklama/uslugi/prodvizhenie-avito/
- https://228blacklol228-debug.github.io/Tanakanreklama/uslugi/smm/
- https://228blacklol228-debug.github.io/Tanakanreklama/uslugi/seo-prodvizhenie/
- https://228blacklol228-debug.github.io/Tanakanreklama/klienty/
- https://228blacklol228-debug.github.io/Tanakanreklama/o-kompanii/
- https://228blacklol228-debug.github.io/Tanakanreklama/kontakty/
