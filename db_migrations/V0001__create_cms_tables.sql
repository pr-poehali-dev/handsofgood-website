
CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  tag TEXT NOT NULL DEFAULT 'Новости',
  published_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE animal_stories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  place TEXT NOT NULL DEFAULT 'г. Кинешма',
  story TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT '🐾',
  color TEXT NOT NULL DEFAULT 'bg-orange-50',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE volunteer_applications (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  motivation TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO blog_posts (title, excerpt, content, tag, published_at) VALUES
('Апрельский рейд: накормили 47 животных за один вечер', 'Вышли большой командой — объехали все известные точки скопления бездомных животных в Кинешме. Рассказываем, как прошло.', 'Вышли большой командой — объехали все известные точки скопления бездомных животных в Кинешме.', 'Репортаж', '2026-04-03'),
('За месяц пристроили 12 кошек и 5 собак — рекорд отряда!', 'Март стал самым успешным месяцем для пристройства. Делимся, что сработало и как вы можете помочь.', 'Март стал самым успешным месяцем для пристройства.', 'Итоги', '2026-03-20'),
('Зима позади: как животные пережили холода', 'Зима — самое опасное время для бездомных животных. Рассказываем, сколько питомцев мы поддержали и спасли этой зимой.', 'Зима — самое опасное время для бездомных животных.', 'Отчёт', '2026-03-05');

INSERT INTO animal_stories (name, place, story, icon, color) VALUES
('Шарик', 'г. Кинешма, ул. Советская', 'Пёс три года жил у мусорных баков. Волонтёры отряда поймали его, вылечили сломанную лапу и нашли любящую семью. Теперь он живёт на диване.', '🐕', 'bg-orange-50'),
('Мурка и котята', 'г. Кинешма, рынок', 'Кошка с пятью котятами жила под рыночными лотками. Всех забрали, вакцинировали, стерилизовали маму и пристроили всех котят в добрые руки.', '🐱', 'bg-amber-50'),
('Рекс', 'г. Кинешма, заброшенный завод', 'Охранная собака, которую бросили хозяева при закрытии завода. Жил там год. Сейчас Рекс — ласковый домашний пёс в семье из Кинешмы.', '🦮', 'bg-yellow-50');
