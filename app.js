const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const blogsRouter = require("./routers/posts.js")

app.use(express.static('public'));
app.use(express.json());


app.get('/', (req, res) => {
    const filePath = path.join(__dirname, './index.html');
    res.sendFile(filePath);
});

app.use('/posts', blogsRouter);


app.listen(port, () => {
    console.log(`Server avviato su http://localhost:${port}`)
});