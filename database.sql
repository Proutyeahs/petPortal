CREATE TABLE foods (
    id SERIAL PRIMARY KEY,
    food_name character varying(200),
    authorized boolean NOT NULL DEFAULT false
);

CREATE UNIQUE INDEX foods_pkey ON foods(id int4_ops);

CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    pets_id integer REFERENCES pets(id),
    foods_id integer REFERENCES foods(id),
    date character varying(200),
    notes character varying(1000),
    user_id integer REFERENCES "user"(id)
);

CREATE UNIQUE INDEX notes_pkey ON notes(id int4_ops);


CREATE TABLE pets (
    id SERIAL PRIMARY KEY,
    user_id integer REFERENCES "user"(id),
    name character varying(200) NOT NULL,
    picture character varying(1000),
    description character varying(1000),
    birthday character varying(200),
    species_id integer REFERENCES species(id),
    authorized_user integer
);

CREATE UNIQUE INDEX pets_pkey ON pets(id int4_ops);

CREATE TABLE species (
    id SERIAL PRIMARY KEY,
    species_name character varying(200),
    authorized boolean NOT NULL DEFAULT false
);

CREATE UNIQUE INDEX species_pkey ON species(id int4_ops);

CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    username character varying(80) NOT NULL UNIQUE,
    password character varying(1000) NOT NULL,
    admin boolean NOT NULL DEFAULT false
);

CREATE UNIQUE INDEX user_pkey ON "user"(id int4_ops);
CREATE UNIQUE INDEX user_username_key ON "user"(username text_ops);