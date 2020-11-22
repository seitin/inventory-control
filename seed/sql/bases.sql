CREATE TABLE bases (
  id SERIAL NOT NULL PRIMARY KEY,
  public_id UUID NOT NULL DEFAULT uuid_generate_v1(),
  name VARCHAR(80) NOT NULL,
  country_state CHAR(2) NOT NULL,
  CONSTRAINT fk_country_state FOREIGN KEY (country_state) REFERENCES country_states (uf)
)
