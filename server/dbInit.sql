-- DB Diagram : https://dbdiagram.io/d/686164e6f413ba35086599c7

-- RUN FIRST TO enable generation of uuid:
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid,
    tenant_name VARCHAR,
    tenant_url VARCHAR
);

CREATE TABLE floors (
    id UUID,
    tenant_id UUID,
    floor_name VARCHAR,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);

CREATE TABLE users (
    id UUID PRIMARY KEY,
    tenant_id UUID,
    email VARCHAR,
    name VARCHAR,
    phone VARCHAR,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);

CREATE TABLE tables (
    id UUID PRIMARY KEY,
    tenant_id UUID NOT NULL,
    name VARCHAR,
    number INT,
    floor_id UUID,
    is_active BOOLEAN,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id),
    FOREIGN KEY (floor_id) REFERENCES floors(id)
);

CREATE TABLE bookings (
    id UUID PRIMARY KEY,
    tenant_id UUID NOT NULL,
    customer_name VARCHAR,
    customer_email VARCHAR,
    customer_phone VARCHAR,
    booking_date TIMESTAMP,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);

CREATE TABLE closeddates (
    id UUID PRIMARY KEY,
    tenant_id UUID NOT NULL,
    closed_date TIMESTAMP,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);
