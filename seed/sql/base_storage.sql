
    CREATE TABLE base_storage (
      base_id INT NOT NULL,
      consumption_id INT NOT NULL,
      storage_amount FLOAT NOT NULL,
      CONSTRAINT fk_base_id FOREIGN KEY (base_id) REFERENCES bases (id),
      CONSTRAINT fk_consumption_id FOREIGN KEY (consumption_id) REFERENCES consumptions (id),
      PRIMARY KEY (base_id, consumption_id)
    )
