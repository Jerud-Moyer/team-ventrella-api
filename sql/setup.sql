DROP TABLE IF EXISTS  columns;

CREATE TABLE columns (
  id: BIGINT GENERATED ALWAYS AS IDENTITY;
  title: TEXT;
  content: TEXT;
  created_at: DATE DEFAULT CURRENT_TIMESTAMP;
  publish_date: DATE,
  published: BOOLEAN DEFAULT FALSE;
);
