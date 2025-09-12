-- Add new schema named "public"
CREATE SCHEMA IF NOT EXISTS "public";
-- Set comment to schema: "public"
COMMENT ON SCHEMA "public" IS 'standard public schema';

-- plant tracking

CREATE TABLE tags (
  id uuid NOT NULL,
  organization_id text NOT NULL,
  notes text NOT NULL DEFAULT '',
  PRIMARY KEY (id)
);

-- finances

CREATE TYPE financial_account_type AS ENUM ('taxable', 'roth ira', 'traditional ira', 'roth 401k', 'traditional 401k', 'hsba', '529');

CREATE TABLE financial_accounts (
  id uuid NOT NULL,
  name text NOT NULL UNIQUE,
  type financial_account_type NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE financial_assets (
  id uuid NOT NULL,
  name text NOT NULL UNIQUE,
  price numeric NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE financial_holdings (
  id uuid NOT NULL,
  financial_account_id uuid NOT NULL REFERENCES financial_accounts(id),
  financial_asset_id uuid NOT NULL REFERENCES financial_assets(id),
  quantity numeric NOT NULL,
  PRIMARY KEY (id)
);

-- CREATE VIEW financial_holdings_with_values AS
--   SELECT
--     financial_holding.*,
--     (financial_holding.quantity * financial_asset.price) AS value
--   FROM financial_holdings financial_holding
--   JOIN financial_assets financial_asset
--   ON financial_asset.id = financial_asset_id;

CREATE TABLE financial_attributes (
  id uuid NOT NULL,
  name text NOT NULL UNIQUE,
  PRIMARY KEY (id)
);

CREATE TABLE financial_attribute_assets (
  financial_attribute_id uuid NOT NULL REFERENCES financial_attributes(id),
  financial_asset_id uuid NOT NULL REFERENCES financial_assets(id),
  PRIMARY KEY (financial_attribute_id, financial_asset_id)
);

-- CREATE VIEW financial_attributes_with_values AS
--   SELECT
--     financial_attribute.*,
--     SUM(financial_holding_with_value.value) AS value
--   FROM financial_attributes financial_attribute
--   JOIN financial_attribute_assets financial_attribute_asset
--   ON financial_attribute_asset.financial_attribute_id = financial_attribute.id
--   JOIN financial_holdings_with_values financial_holding_with_value
--   ON financial_holding_with_value.financial_asset_id = financial_attribute_asset.financial_asset_id
--   GROUP BY financial_attribute.id;

CREATE TABLE financial_groups (
  id uuid NOT NULL,
  name text NOT NULL UNIQUE,
  PRIMARY KEY (id)
);

CREATE TABLE financial_group_attributes (
  financial_group_id uuid NOT NULL REFERENCES financial_groups(id),
  financial_attribute_id uuid NOT NULL REFERENCES financial_attributes(id),
  PRIMARY KEY (financial_group_id, financial_attribute_id)
);
