const mysql = require("mysql");
const md5 = require("md5");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "recovery",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected to the database");
});

// Users table

const createUsersTable = (_) => {
  const sql = `
        CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(40) NOT NULL,
        email VARCHAR(80) NOT NULL UNIQUE,
        role SET('admin', 'user', 'editor') NOT NULL DEFAULT 'user',
        password CHAR(32) NOT NULL,
        session CHAR(32) NULL
    )`;

  connection.query(sql, function (err) {
    //prijungiam databaze
    if (err) throw err;
    console.log("Users table created");
  });
};

const dropUsersTable = (_) => {
  const sql = "DROP TABLE IF EXISTS users";

  connection.query(sql, function (err) {
    if (err) throw err;
    console.log("Users table dropped");
  });
};

const seedUsersTable = (_) => {
  const sql = `
        INSERT INTO users
        (name, email, role, password)
        VALUES
        ('Briedis', 'briedis@gmail.com', 'admin', '${md5("123")}'),
        ('Bebras', 'bebras@gmail.com', 'user', '${md5("123")}'),
        ('Barsukas', 'barsukas@gmail.com', 'editor', '${md5("123")}')
    `;
  connection.query(sql, function (err) {
    if (err) throw err;
    console.log("Users table dropped");
  });
};

const createPostTable = (_) => {
  const sql = `
      CREATE TABLE IF NOT EXISTS posts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(100) NOT NULL,
      description TEXT NOT NULL,
      comment TEXT NULL,
      edited BOOLEAN DEFAULT FALSE,
      userID SMALLINT UNSIGNED,
      amount MEDIUMINT UNSIGNED,
      image VARCHAR(65000) NULL,
      confirmed BOOLEAN DEFAULT FALSE,
      is_top BOOLEAN DEFAULT FALSE,
      donated MEDIUMINT DEFAULT 0
  )`;

  // naujas idetas comment
  connection.query(sql, function (err) {
    if (err) throw err;
    console.log("Post table created");
  });
};

const dropPostsTable = (_) => {
  const sql = "DROP TABLE IF EXISTS posts";

  connection.query(sql, function (err) {
    if (err) throw err;
    console.log("posts table dropped");
  });
};

const seedPostsTable = (_) => {
  const sql = `
        INSERT INTO posts
        (title, description,userID,amount, image, confirmed, is_top)
        VALUES
        ('Bebrai upinis', 'Lietuvoje bebrai nuo senos','99', '1000', null, 0, false),
        ('Barsukas urvinis', 'Filmas skirtas žiūrėjimui','99', '1000', null, 0 ,false),
        ('Briedis miškinis', 'Muzika skirta klausymuisi','1', '2000', null , 1, true)
    `;
  connection.query(sql, function (err) {
    if (err) throw err;
    console.log("posts table seeded");
  });
};

dropUsersTable(); //istrinam tik developinamo metu nes jeigu bus klaidu nereikes taisyti kiekviena karta duomenu baizeje
dropPostsTable();
createUsersTable();
createPostTable();
seedUsersTable();
seedPostsTable();

connection.end(function (err) {
  //atsijungiam databaze
  if (err) throw err;
  console.log("Connection closed");
});
