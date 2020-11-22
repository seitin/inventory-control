
    CREATE TABLE bases (
      id UUID NOT NULL PRIMARY KEY,
      name VARCHAR(80) NOT NULL,
      country_state CHAR(2) NOT NULL,
      CONSTRAINT fk_country_state FOREIGN KEY (country_state) REFERENCES country_states (uf)
    );
