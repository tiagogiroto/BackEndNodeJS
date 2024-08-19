require("dotenv").config();

const cors = require('cors');
const express = require('express');
const pool = require('./db'); // Certifique-se de que o caminho está correto
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.json({ message: 'Funcionando!' }));

app.get('/lesson', async (req, res) => {
    console.log("GET /Lesson")
  try {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.execute(
       
        `
            select nw.item_english, nw.item_portuguese
            from new_words nw
            inner join 
            new_words_lesson nwl
            on
            nw.id_new_words =  nwl.id_new_words_lesson
            ;
                    
        `
        
    
    );
    connection.release();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/new_lesson', async (req, res) => {
  console.log("GET /new_lesson")
try {
  const connection = await pool.getConnection();
  const [rows, fields] = await connection.execute(
     
      `
          select nw.item_english, nw.item_portuguese
          from new_words nw
          inner join 
          new_words_lesson nwl
          on
          nw.id_new_words =  nwl.id_new_words_lesson
          ;
                  
      `
      
  
  );
  connection.release();

  // para da um nome no retorno do json
  // crie uma variavel e atribua a  sua leitura a ela

  const lesson = {
      new_lesson : rows
  }

  res.json(lesson);
} catch (err) {
  res.status(500).json({ error: err.message });
}
});

app.listen(port, () => {
  console.log(`API funcionando na porta ${port}!`);
});