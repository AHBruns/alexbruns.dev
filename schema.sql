-- Add new schema named "public"
CREATE SCHEMA IF NOT EXISTS "public";
-- Set comment to schema: "public"
COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE TABLE tags (
  id uuid NOT NULL,
  PRIMARY KEY (id)
);
