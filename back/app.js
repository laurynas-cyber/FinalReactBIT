const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mysql = require("mysql");
const { v4: uuidv4 } = require("uuid");
const fs = require("node:fs");
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

app.use(
  cors({
    // origin: "http://localhost:3005",
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const writeImage = (imageBase64) => {
  if (!imageBase64) {
    return null;
  }
  let type;
  let image;
  if (imageBase64.indexOf("data:image/png;base64,") === 0) {
    type = "png";
    image = Buffer.from(
      imageBase64.replace(/^data:image\/png;base64,/, ""),
      "base64"
    );
  } else if (imageBase64.indexOf("data:image/jpeg;base64,") === 0) {
    type = "jpg";
    image = Buffer.from(
      imageBase64.replace(/^data:image\/jpeg;base64,/, ""),
      "base64"
    );
  } else {
    res.status(500).send("Bad image format");
    return;
  }
  const filename = md5(uuidv4()) + "." + type;
  fs.writeFileSync("public/img/" + filename, image);
  return filename;
};

const deleteImage = (postId) => {
  let sql = "SELECT image FROM posts WHERE id = ?";
  connection.query(sql, [postId], (err, results) => {
    if (err) {
      res.status;
    } else {
      if (results[0].image) {
        fs.unlinkSync("public/img/" + results[0].image);
      }
    }
  });
};

const preDeleteImage = (postId) => {
  let sql = "SELECT photo FROM posts WHERE id = ?";
  connection.query(sql, [postId], (err, results) => {
    if (err) {
      return null;
    } else {
      if (results[0].photo) {
        return results[0].photo;
      }
    }
  });
};

const doDeleteImage = (filename) => {
  fs.unlinkSync("public/img/" + filename);
};

const maintenance = (req, res, next) => {
  res
    .status(503)
    .json({
      message: {
        type: "error",
        title: "Techniniai darbai",
        text: `Atsiprašome, bet šiuo metu vykdomi techniniai darbai`,
      },
    })
    .end();
};

const checkSession = (req, _, next) => {
  const session = req.cookies["recovery-session"];
  if (!session) {
    return next();
  }
  const sql = `
        SELECT id, name, email, role 
        FROM users
        WHERE session = ?
    `;
  connection.query(sql, [session], (err, rows) => {
    if (err) throw err;
    if (!rows.length) {
      return next();
    }
    req.user = rows[0];
    next();
  });
};

const checkUserIsAuthorized = (req, res, roles) => {
  if (!req.user) {
    res
      .status(401)
      .json({
        message: {
          type: "error",
          title: "Not authorized",
          text: `You must be logged in`,
        },
        reason: "not-logged-in",
      })
      .end();
    return false;
  }
  if (!roles.includes(req.user.role)) {
    res
      .status(401)
      .json({
        message: {
          type: "error",
          title: "Not authorized",
          text: `You do not have the right to perform the action `,
        },
        reason: "not-authorized",
      })
      .end();
    return false;
  }
  return true;
};

// app.use(maintenance);

app.use(checkSession);

app.get("/admin/users", (req, res) => {
  setTimeout((_) => {
    if (!checkUserIsAuthorized(req, res, ["admin", "editor"])) {
      return;
    }
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

app.get("/home/donors", (req, res) => {
  setTimeout((_) => {
    const sql = `
    SELECT donors.*, posts.title, posts.image
    FROM donors
    JOIN posts ON donors.post_id = posts.id
  `;

    connection.query(sql, (err, rows) => {
      if (err) throw err;
      res
        .json({
          users: rows,
        })
        .end();
    });
  }, 1000);
});

app.get("/admin/pending/posts", (req, res) => {
  setTimeout((_) => {
    if (!checkUserIsAuthorized(req, res, ["admin", "editor"])) {
      return;
    }

    const sql = `
       SELECT p.id, p.userID, p.title, p.description,p.comment, p.amount, p.image, p.confirmed, p.is_top, p.donated, u.name, u.email
        FROM posts AS p
        INNER JOIN users AS u
        ON p.userID = u.id
    `;

    connection.query(sql, (err, rows) => {
      if (err) throw err;
      res
        .json({
          posts: rows,
        })
        .end();
    });
  }, 1500);
});

app.get("/web/edit/post/:id", (req, res) => {
  setTimeout((_) => {
    if (!checkUserIsAuthorized(req, res, ["admin", "user"])) {
      return;
    }
    const { id } = req.params;
    const sql = `
        SELECT *
        FROM posts
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
              title: "Post",
              text: `Post was not found`,
            },
          })
          .end();
        return;
      }
      res
        .json({
          post: rows[0],
        })
        .end();
    });
  }, 1500);
});

app.get("/user/createdposts/:id", (req, res) => {
  setTimeout((_) => {
    if (!checkUserIsAuthorized(req, res, ["user"])) {
      return;
    }
    const { id } = req.params;

    const sql = `
    SELECT *
    FROM posts AS p
    WHERE p.userID = ?
`;

    connection.query(sql, [id], (err, rows) => {
      if (err) throw err;
      res
        .json({
          posts: rows,
        })
        .end();
    });
  }, 1500);
});

app.get("/home/posts", (req, res) => {
  setTimeout((_) => {
    const sql = `
      SELECT p.*,
      (SELECT COUNT(*) FROM donors) AS donors_count
      FROM posts p
      WHERE confirmed = true
    `;

    connection.query(sql, (err, rows) => {
      if (err) throw err;
      res
        .json({
          posts: rows,
        })
        .end();
    });
  }, 1500);
});

//Padaryti kad deletintu kai nuotraukos nera
app.delete("/admin/delete/post/:id", (req, res) => {
  setTimeout((_) => {
    const { id } = req.params;
    let filename = null;
    let sql = "SELECT image FROM posts WHERE id = ?";
    connection.query(sql, [id], (err, results) => {
      if (results[0].image) {
        filename = results[0].image;
        const sql = `
                  DELETE
                  FROM posts
                  WHERE id = ?
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
                  title: "Post",
                  text: `Post cannot be deleted`,
                },
              })
              .end();
            return;
          }
          if (filename) {
            fs.unlinkSync("public/img/" + filename);
          }
          res
            .json({
              message: {
                type: "success",
                title: "Post",
                text: `Post has been deleted`,
              },
            })
            .end();
        });
      }
    });
  }, 1500);
});

app.put("/admin/update/post/:id", (req, res) => {
  setTimeout((_) => {
    const { id } = req.params;
    const { title, description, image, confirmed, comment, is_top } = req.body;

    if (image) {
      image.length > 40 && deleteImage(id);
      const filename = image.length > 40 ? writeImage(image) : image;
      const sql = `
                    UPDATE posts
                    SET title = ?, description = ?, image = ?, confirmed = ?, is_top = ?, comment = NULL
                    WHERE id = ?
                    `;
      connection.query(
        sql,
        [title, description, filename, confirmed, is_top, id, comment],
        (err, result) => {
          if (err) throw err;
          const updated = result.affectedRows;
          if (!updated) {
            res
              .status(404)
              .json({
                message: {
                  type: "info",
                  title: "Posts",
                  text: `Post was not found`,
                },
              })
              .end();
            return;
          }
          res
            .json({
              message: {
                type: "success",
                title: "Posts",
                text: `Post was updated`,
              },
            })
            .end();
        }
      );
    } else {
      deleteImage(id);
      const sql = `
                    UPDATE posts
                    SET title = ?, description = ?, image = NULL, confirmed = ?, is_top = ?, comment = NULL
                    WHERE id = ?
                    `;
      connection.query(
        sql,
        [title, description, confirmed, is_top, id, comment],
        (err, result) => {
          if (err) throw err;
          const updated = result.affectedRows;
          if (!updated) {
            res
              .status(404)
              .json({
                message: {
                  type: "info",
                  title: "Posts",
                  text: `Post was not found`,
                },
              })
              .end();
            return;
          }
          res
            .json({
              message: {
                type: "success",
                title: "Posts",
                text: `Post was updated`,
              },
            })
            .end();
        }
      );
    }
  }, 1500);
});

app.put("/admin/update/commentpost/:id", (req, res) => {
  setTimeout((_) => {
    const { id } = req.params;
    const { comment } = req.body;
    console.log(comment);
    const sql = `
                    UPDATE posts
                    SET comment = ?, confirmed = FALSE
                    WHERE id = ?
                    `;
    connection.query(sql, [comment, id], (err, result) => {
      if (err) throw err;
      const updated = result.affectedRows;
      if (!updated) {
        res
          .status(404)
          .json({
            message: {
              type: "info",
              title: "Posts",
              text: `Post was not found`,
            },
          })
          .end();
        return;
      }
      res
        .json({
          message: {
            type: "success",
            title: "Posts decline",
            text: `Post was declined, Admin comment added`,
          },
        })
        .end();
    });
  }, 1500);
});

app.put("/admin/banner/:id", (req, res) => {
  setTimeout((_) => {
    const { id } = req.params;

    const sql = `UPDATE posts SET is_top = CASE WHEN id = ? THEN 1 ELSE 0 END`;
    connection.query(sql, [id], (err, result) => {
      if (err) throw err;
      const updated = result.affectedRows;
      if (!updated) {
        res
          .status(404)
          .json({
            message: {
              type: "info",
              title: "Posts",
              text: `Post was not found`,
            },
          })
          .end();
        return;
      }
      res
        .json({
          message: {
            type: "success",
            title: "Posts updated",
            text: `Post updated to banner`,
          },
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
              title: "Users",
              text: `User is admin and cannot be deleted`,
            },
          })
          .end();
        return;
      }
      res
        .json({
          message: {
            type: "success",
            title: "Users",
            text: `User was deleted successfully`,
          },
        })
        .end();
    });
  }, 1500);
});

app.get("/admin/edit/user/:id", (req, res) => {
  setTimeout((_) => {
    if (!checkUserIsAuthorized(req, res, ["admin"])) {
      return;
    }

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
              title: "User",
              text: `User was not found`,
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
                title: "User",
                text: `User was not found`,
              },
            })
            .end();
          return;
        }
        res
          .json({
            message: {
              type: "success",
              title: "User",
              text: `User has been updated`,
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
                  title: "User",
                  text: `User was not found`,
                },
              })
              .end();
            return;
          }
          res
            .json({
              message: {
                type: "success",
                title: "User",
                text: `User has been updated`,
              },
            })
            .end();
        }
      );
    }
  }, 1500);
});

app.post("/logout", (req, res) => {
  setTimeout((_) => {
    const session = req.cookies["recovery-session"];

    const sql = `
              UPDATE users
              SET session = NULL
              WHERE session = ?
          `;

    connection.query(sql, [session], (err, result) => {
      if (err) throw err;
      const logged = result.affectedRows;
      if (!logged) {
        res
          .status(401)
          .json({
            message: {
              type: "error",
              title: "Logg out error",
              text: `Login details invalid `,
            },
          })
          .end();
        return;
      }
      res.clearCookie("recovery-session");
      res
        .json({
          message: {
            type: "success",
            title: `Logged out`,
            text: `Operation was successfull`,
          },
        })
        .end();
    });
  }, 1500);
});

app.post("/login", (req, res) => {
  setTimeout((_) => {
    const { email, password } = req.body;
    const session = md5(uuidv4());

    const sql = `
            UPDATE users
            SET session = ?
            WHERE email = ? AND password = ?
        `;

    connection.query(sql, [session, email, md5(password)], (err, result) => {
      if (err) throw err;
      const logged = result.affectedRows;
      if (!logged) {
        res
          .status(401)
          .json({
            message: {
              type: "error",
              title: "Login fail",
              text: `Invalid login data`,
            },
          })
          .end();
        return;
      }
      const sql = `
            SELECT id, name, email, role
            FROM users
            WHERE email = ? AND password = ?
        `;
      connection.query(sql, [email, md5(password)], (err, rows) => {
        if (err) throw err;
        res.cookie("recovery-session", session, {
          maxAge: 1000 * 60 * 60 * 24,
          httpOnly: true,
        });
        res
          .json({
            message: {
              type: "success",
              title: `Hello, ${rows?.[0]?.name}!`,
              text: `Login was successfull`,
            },
            session,
            user: rows?.[0],
          })
          .end();
      });
    });
  }, 1500);
});

app.post("/register", (req, res) => {
  setTimeout((_) => {
    const { name, email, password } = req.body;

    if (!/\S+@\S+\.\S+/.test(email)) {
      res
        .status(422)
        .json({
          message: "There are errors in the form you are sending",
          errorsBag: {
            email: "Wrong email format",
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
            message: "There are errors in the form you are sending",
            errorsBag: {
              email: "This email already exist",
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
                title: "Hello!",
                text: `We are happy thay you joined, ${name}`,
              },
            })
            .end();
        });
      }
    });
  }, 1500);
});

// app.post("/donate", (req, res) => {
//   setTimeout((_) => {
//     const { name, email, donation, post_id } = req.body;
//     const sql = `
//     INSERT INTO donors(name,email, donation, post_id)
//     VALUES (?, ?, ?, ?)
//     `;
//     connection.query(sql, [name, email, donation, post_id], (err) => {
//       if (err) throw err;
//       res
//         .status(201)
//         .json({
//           message: {
//             type: "success",
//             title: "Successful donation",
//             text: `Thank you for your kindness`,
//           },
//         })
//         .end();
//     });
//   });
// });

app.post("/donate", (req, res) => {
  setTimeout((_) => {
    const { name, email, donation, post_id } = req.body;

    // SQL for inserting into donors
    const insertDonorSql = `
      INSERT INTO donors(name, email, donation, post_id)
      VALUES (?, ?, ?, ?)
    `;

    // SQL for updating the donated amount in posts
    const updatePostSql = `
      UPDATE posts
      SET donated = donated + ?
      WHERE id = ?
    `;

    // Begin transaction
    connection.beginTransaction((err) => {
      if (err) {
        res.status(500).json({ error: "Transaction error" }).end();
        throw err;
      }

      // First, insert into donors
      connection.query(
        insertDonorSql,
        [name, email, donation, post_id],
        (err) => {
          if (err) {
            return connection.rollback(() => {
              res
                .status(500)
                .json({ error: "Error inserting into donors" })
                .end();
              throw err;
            });
          }

          // After successful insert, update the posts table
          connection.query(updatePostSql, [donation, post_id], (err) => {
            if (err) {
              return connection.rollback(() => {
                res
                  .status(500)
                  .json({ error: "Error updating posts table" })
                  .end();
                throw err;
              });
            }

            // Commit transaction if both queries succeed
            connection.commit((err) => {
              if (err) {
                return connection.rollback(() => {
                  res
                    .status(500)
                    .json({ error: "Transaction commit error" })
                    .end();
                  throw err;
                });
              }

              // Send success response
              res
                .status(201)
                .json({
                  message: {
                    type: "success",
                    title: "Successful donation",
                    text: `Thank you for your kindness`,
                  },
                })
                .end();
            });
          });
        }
      );
    });
  }, 1500);
});

app.post("/post", (req, res) => {
  setTimeout((_) => {
    const { title, description, amount, image, userID } = req.body;
    const filename = writeImage(image);
    const sql = `
            INSERT INTO posts (title, description, amount, image, userID)
            VALUES ( ?, ?, ?, ?, ? )
            `;
    connection.query(
      sql,
      [title, description, amount, filename, userID],
      (err) => {
        if (err) throw err;
        res
          .status(201)
          .json({
            message: {
              type: "success",
              title: "Successful post",
              text: `Your post is created, waiting for confirmation`,
            },
          })
          .end();
      }
    );
  }, 1500);
});

app.listen(port, (_) => {
  console.log(`recoverys app listening on port ${port}`);
});
