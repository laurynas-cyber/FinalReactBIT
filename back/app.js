const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mysql = require("mysql");
// const { v4: uuidv4 } = require('uuid');
// const fs = require('node:fs');
const md5 = require("md5");
const app = express();
const port = 3006;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "recovery",
});

connection.connect();

app.use(cors());

app.use(cookieParser());
// app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/admin/users", (_, res) => {
  setTimeout((_) => {
    const sql = `
        SELECT *
        FROM users`;

    connection.query(sql, (err, rows) => {
      if (err) throw err;
      res
        .json({
          users: rows,
        })
        .end();
    });
  }, 1500);
});

app.delete("/admin/delete/user/:id", (req, res) => {
  setTimeout((_) => {
    const { id } = req.params;

    const sql = `
        DELETE 
        FROM users 
        WHERE id = ? AND role != 'admin'
        `;

    connection.query(sql, [id], (err, result) => {
      if (err) throw err;
      const deleted = result.affectedRows;
      if (!deleted) {
        res
          .status(422)
          .json({
            message: {
              type: "info",
              title: "Vartotojai",
              text: `Vartotojas yra administratorius ir negali būti ištrintas arba vartotojas neegzistuoja`,
            },
          })
          .end();
        return;
      }
      res
        .json({
          message: {
            type: "success",
            title: "Vartotojai",
            text: `Vartotojas sėkmingai ištrintas`,
          },
        })
        .end();
    });
  }, 1500);
});

app.get("/admin/edit/user/:id", (req, res) => {
  setTimeout((_) => {
    const { id } = req.params;
    const sql = `
        SELECT id, name, email, role
        FROM users
        WHERE id = ?
        `;
    connection.query(sql, [id], (err, rows) => {
      if (err) throw err;
      if (!rows.length) {
        res
          .status(404)
          .json({
            message: {
              type: "info",
              title: "Vartotojai",
              text: `Vartotojas nerastas`,
            },
          })
          .end();
        return;
      }
      res
        .json({
          user: rows[0],
        })
        .end();
    });
  }, 1500);
});

app.put("/admin/update/user/:id", (req, res) => {
  setTimeout((_) => {
    const { id } = req.params;
    const { name, email, role, password } = req.body;

    if (!password) {
      const sql = `
            UPDATE users
            SET name = ?, email = ?, role = ?
            WHERE id = ?
            `;

      connection.query(sql, [name, email, role, id], (err, result) => {
        if (err) throw err;
        const updated = result.affectedRows;
        if (!updated) {
          res
            .status(404)
            .json({
              message: {
                type: "info",
                title: "Vartotojai",
                text: `Vartotojas nerastas`,
              },
            })
            .end();
          return;
        }
        res
          .json({
            message: {
              type: "success",
              title: "Vartotojai",
              text: `Vartotojas sėkmingai atnaujintas`,
            },
          })
          .end();
      });
    } else {
      const sql = `
                UPDATE users
                SET name = ?, email = ?, role = ?, password = ?
                WHERE id = ?
                `;

      connection.query(
        sql,
        [name, email, role, md5(password), id],
        (err, result) => {
          if (err) throw err;
          const updated = result.affectedRows;
          if (!updated) {
            res
              .status(404)
              .json({
                message: {
                  type: "info",
                  title: "Vartotojai",
                  text: `Vartotojas nerastas`,
                },
              })
              .end();
            return;
          }
          res
            .json({
              message: {
                type: "success",
                title: "Vartotojai",
                text: `Vartotojas sėkmingai atnaujintas`,
              },
            })
            .end();
        }
      );
    }
  }, 1500);
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!/\S+@\S+\.\S+/.test(email)) {
    res
      .status(422)
      .json({
        message: "Siunčiamoje formoje yra klaidų",
        errorsBag: {
          email: "El pašto formatas neteisingas",
        },
      })
      .end();
    return;
  }

  const sql = `SELECT email FROM users WHERE email = ? `;

  connection.query(sql, [email], (err, rows) => {
    if (err) throw err;
    if (rows.length) {
      res
        .status(422)
        .json({
          message: "Siunčiamoje formoje yra klaidų",
          errorsBag: {
            email: "Toks el paštas jau yra",
          },
        })
        .end();
    } else {
      const sql = `
            INSERT INTO users (name, email, password)
            VALUES ( ?, ?, ? )
            `;
      connection.query(sql, [name, email, md5(password)], (err) => {
        if (err) throw err;
        res
          .status(201)
          .json({
            message: {
              type: "success",
              title: "Sveiki!",
              text: `Malonu, kad prie mūsų prisijungėte, ${name}`,
            },
          })
          .end();
      });
    }
  });
});

app.listen(port, (_) => {
  console.log(`Recovery app listening on port ${port}`);
});
