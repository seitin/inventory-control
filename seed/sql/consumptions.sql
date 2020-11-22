  CREATE TABLE consumptions (
    id SERIAL NOT NULL PRIMARY KEY,
    public_id UUID NOT NULL DEFAULT uuid_generate_v1(),
    name VARCHAR(200) NOT NULL
  )
