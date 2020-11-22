
    CREATE TABLE attendances (
      id UUID NOT NULL DEFAULT uuid_generate_v1(),
      date TIMESTAMP NOT NULL,
      consumption_id UUID NOT NULL,
      base_id UUID NOT NULL,
      amount int NOT NULL,
      CONSTRAINT fk_base_id FOREIGN KEY (base_id) REFERENCES bases (id),
      CONSTRAINT fk_consumption_id FOREIGN KEY (consumption_id) REFERENCES consumptions (id)
    );
