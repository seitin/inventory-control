    CREATE TABLE expeditions (
      source_base_id UUID NOT NULL,
      destination_base_id UUID NOT NULL,
      date TIMESTAMP NOT NULL DEFAULT now(),
      consumption_id UUID NOT NULL,
      amount FLOAT NOT NULL,
      PRIMARY KEY (source_base_id, destination_base_id, consumption_id),
      CONSTRAINT fk_source_base_id FOREIGN KEY (source_base_id) REFERENCES bases(id),
      CONSTRAINT fk_destination_base_id FOREIGN KEY (destination_base_id) REFERENCES bases(id),
      CONSTRAINT fk_consumption_id FOREIGN KEY (consumption_id) REFERENCES consumptions(id)
    );
