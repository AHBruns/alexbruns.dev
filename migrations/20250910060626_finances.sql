-- Create enum type "financial_account_type"
CREATE TYPE "financial_account_type" AS ENUM ('taxable', 'roth ira', 'traditional ira', 'roth 401k', 'traditional 401k', 'hsba', '529');
-- Create "financial_assets" table
CREATE TABLE "financial_assets" (
  "id" uuid NOT NULL,
  "name" text NOT NULL,
  "price" numeric NOT NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "financial_assets_name_key" UNIQUE ("name")
);
-- Create "financial_attributes" table
CREATE TABLE "financial_attributes" (
  "id" uuid NOT NULL,
  "name" text NOT NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "financial_attributes_name_key" UNIQUE ("name")
);
-- Create "financial_attribute_assets" table
CREATE TABLE "financial_attribute_assets" (
  "financial_attribute_id" uuid NOT NULL,
  "financial_asset_id" uuid NOT NULL,
  PRIMARY KEY ("financial_attribute_id", "financial_asset_id"),
  CONSTRAINT "financial_attribute_assets_financial_asset_id_fkey" FOREIGN KEY ("financial_asset_id") REFERENCES "financial_assets" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT "financial_attribute_assets_financial_attribute_id_fkey" FOREIGN KEY ("financial_attribute_id") REFERENCES "financial_attributes" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
);
-- Create "financial_groups" table
CREATE TABLE "financial_groups" (
  "id" uuid NOT NULL,
  "name" text NOT NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "financial_groups_name_key" UNIQUE ("name")
);
-- Create "financial_group_attributes" table
CREATE TABLE "financial_group_attributes" (
  "financial_group_id" uuid NOT NULL,
  "financial_attribute_id" uuid NOT NULL,
  PRIMARY KEY ("financial_group_id", "financial_attribute_id"),
  CONSTRAINT "financial_group_attributes_financial_attribute_id_fkey" FOREIGN KEY ("financial_attribute_id") REFERENCES "financial_attributes" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT "financial_group_attributes_financial_group_id_fkey" FOREIGN KEY ("financial_group_id") REFERENCES "financial_groups" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
);
-- Create "financial_accounts" table
CREATE TABLE "financial_accounts" (
  "id" uuid NOT NULL,
  "name" text NOT NULL,
  "type" "financial_account_type" NOT NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "financial_accounts_name_key" UNIQUE ("name")
);
-- Create "financial_holdings" table
CREATE TABLE "financial_holdings" (
  "id" uuid NOT NULL,
  "financial_account_id" uuid NOT NULL,
  "financial_asset_id" uuid NOT NULL,
  "quantity" numeric NOT NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "financial_holdings_financial_account_id_fkey" FOREIGN KEY ("financial_account_id") REFERENCES "financial_accounts" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT "financial_holdings_financial_asset_id_fkey" FOREIGN KEY ("financial_asset_id") REFERENCES "financial_assets" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
);
