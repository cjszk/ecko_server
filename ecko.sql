SELECT CURRENT_DATE;

-- Drop all tables
DROP TABLE IF EXISTS replies;
DROP TABLE IF EXISTS messages;
--users

CREATE TABLE messages (
    id serial PRIMARY KEY,
    message text NOT NULL,
    time text NOT NULL,
    exact_time BIGSERIAL NOT NULL,
    location json NOT NULL,
    thumbs_up int,
    thumbs_down int 
);

CREATE TABLE replies (
    message_id int REFERENCES messages ON DELETE SET NULL,
    id serial PRIMARY KEY,
    message text NOT NULL,
    time text NOT NULL,
    exact_time BIGSERIAL NOT NULL,
    location json NOT NULL,
    thumbs_up int,
    thumbs_down int
);

ALTER SEQUENCE messages_id_seq RESTART WITH 1000;
ALTER SEQUENCE replies_id_seq RESTART WITH 1000;

INSERT INTO messages (message, time, exact_time, location, thumbs_up, thumbs_down) VALUES
    (
        'test',
        'Apr-11 3:23 PM',
        1528343377691,
        '{
            "latitude": "33",
            "longitude": "43"
        }',
        4,
        2
    );

INSERT INTO replies (message_id, message, time, exact_time, location, thumbs_up, thumbs_down) VALUES
    (
        '1000',
        'test',
        'Apr-11 3:51 PM',
        1528343377691,
        '{
            "latitude": "33",
            "longitude": "43"
        }',
        4,
        2
    );
