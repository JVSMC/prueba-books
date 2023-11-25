/*
    --| task |--
    1.- crear objeto app -> Importar dependencia ✅
    2.- crear listener para app -> Verificar conexión ✅
    3.- CORS ✅
    4.- función de lectura ✅
    5.- funcion de escritura ✅
    6.- metodos http ✅

*/
//Import 
import express from "express";
import fs from 'fs';
import bodyParser from 'body-parser';

//Crear objeto
const app = express();
app.use(bodyParser.json());

//Coors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


//--|Funciones|--

//Lectura
const readData = () => {
    try {
        const data = fs.readFileSync("./db.json");
        console.log(JSON.parse(data)); //To see on the console
        return JSON.parse(data);
    } catch (error) {
        console.error("There is an error with the system file, check the path of your file");
    }
}

const writeData = (data) => {
    try {
        fs.writeFileSync("./db.json", JSON.stringify(data));
    } catch (error) {
        console.error(error);
    }
}


//--| Metodos HTTP |--
app.get('/', (req, res) => { // Confirmación de comunicación
    res.send('Welcome to my API');
})

//Lectura
app.get('/books', (req, res) => {
    const data = readData();
    res.json(data.books);
});

// lectura por id
app.get('/books/:id', (req, res)=>{
    const data = readData();
    const id = parseInt(req.params.id);
    const book = data.books.find((book) => book.id === id);
    if (!book) return res.status(404).send(`The book with id: ${id} has not been found`);
    else res.json(book);
});

//Agregar nuevo libro
app.post('/books', (req, res) => {
    const data = readData();
    const body = req.body;
    const lastId = data.books.length > 0 ? data.books[data.books.length - 1].id : 0;

    const newBook = {
        id: lastId + 1,
        ...body,
    };

    data.books.push(newBook);
    writeData(data);
    res.json(newBook);
});

//Eliminar libro 
app.delete('/books/:id', (req, res)=>{
    const data = readData();
    const id = parseInt(req.params.id);
    const bookIndex = data.books.findIndex((book) => book.id === id);

    if (!bookIndex !== -1){
        data.books.splice(bookIndex, 1);
        writeData(data),
        res.json({message: "Book deleted successfully"});
    } else {
        //console.error("Error: Book not found");//Alternativo
        res.status(404).json({error: "Book not found"});
    }
});

//Acutalizar libro
app.put('/books/:id', (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const bookIndex = data.books.findIndex((book) => book.id === id);

    if (bookIndex >= 0) {
        data.books[bookIndex] = {
            ...data.books[bookIndex],
            ...body,
        };
        writeData(data);
        res.json({ message: "Book updated successfully" });
    } else {
        res.status(404).json({ error: "Book not found" });
    }
});




const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`You are connected to my API on the port: ${port} `);
});