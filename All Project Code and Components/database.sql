CREATE DATABASE IF NOT EXISTS tierio;

CREATE TABLE tierlists(
    tierlistid SERIAL PRIMARY KEY, 
    category VARCHAR(30), 
    creator_name VARCHAR(30),
    tierlist_name VARCHAR(30),
    num_ranks INT,
    rank1 VARCHAR(30),
    rank2 VARCHAR(30),
    rank3 VARCHAR(30),
    rank4 VARCHAR(30),
    rank5 VARCHAR(30),
    rank6 VARCHAR(30),
    rank7 VARCHAR(30),
    rank8 VARCHAR(30),
    rank9 VARCHAR(30),
    rank10 VARCHAR(30),
    votes INT
);

CREATE TABLE IF NOT EXISTS items(
    tierlistid INT,
    ranking VARCHAR(30),
    color VARCHAR(30),
    item_name VARCHAR(30),
    FOREIGN KEY (tierlistid) REFERENCES tierlists(tierlistid)
);
