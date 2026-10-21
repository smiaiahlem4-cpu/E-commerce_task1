import {Router} from 'express';
import mysql from 'mysql2/promise';
import axios from 'axios';
import { connection } from '../db.mjs';

const router = Router();
router.get("/api/products/import", async (req, res) => {
  try {
    const { data } = await axios.get("https://dummyjson.com/products?limit=100");
    const products = data.products;
 
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS products (
        idProduct   VARCHAR(255) PRIMARY KEY,
        name        VARCHAR(255) NOT NULL,
        price       FLOAT        NOT NULL,
        quantity    INT(11)      NOT NULL,
        image       VARCHAR(255),
        description TEXT
      )
    `);
 
    const sql = `
      INSERT INTO products (idProduct, name, price, quantity, image, description)
      VALUES (?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        name        = VALUES(name),
        price       = VALUES(price),
        quantity    = VALUES(quantity),
        image       = VALUES(image),
        description = VALUES(description)
    `;
 
    for (const p of products) {
      await connection.execute(sql, [
        String(p.id),
        p.title,
        p.price,
        p.stock,
        p.thumbnail || "",
        p.description || "",
      ]);
    }
    res.json({
      success: true,
      message: `✅ ${products.length} products imported into MySQL.`,
    });
 
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});


export default router;