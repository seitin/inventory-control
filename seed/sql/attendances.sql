CREATE TABLE attendances (
  id SERIAL NOT NULL PRIMARY KEY,
  public_id UUID NOT NULL DEFAULT uuid_generate_v1(),
  date TIMESTAMP NOT NULL,
  consumption_id int NOT NULL,
  base_id int NOT NULL,
  amount int NOT NULL,
  CONSTRAINT fk_base_id FOREIGN KEY (base_id) REFERENCES bases (id),
  CONSTRAINT fk_consumption_id FOREIGN KEY (consumption_id) REFERENCES consumptions (id)
)
