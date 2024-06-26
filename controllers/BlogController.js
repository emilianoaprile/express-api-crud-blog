// const posts = [
//     {
//         title: "Ciambellone",
//         slug: "ciambellone",
//         content: "Sarà che una volta le cose erano più semplici, ma erano anche molto buone. Come le crostate, i biscotti o il ciambellone che la nonna preparava anche all'ultimo sapendo che sareste passati per la merenda: uova, zucchero e farina. Niente di più basic ma che tra le sue mani, mescolando e infornando, diventava una delle prelibatezze per accompagnare il succo di frutta al pomeriggio o il latte e caffè al mattino. Ecco la nostra ricetta del ciambellone a quale atmosfera si ispira, quella di casa e genuinità: con una manciata di scorze di limone o di arancia e una spolverata di zucchero a velo renderete questa soffice delizia profumata e invitante. E per una volta sarà la nonna a farvi i complimenti per aver preparato un morbido ciambellone, così buono che non passa mai di moda!",
//         image: "imgs/posts/ciambellone.jpeg",
//         tags: ["Dolci", "Torte", "Ricette vegetariane", "Ricette al forno"],
//     },
//     {
//         title: "Cracker alla barbabietola",
//         slug: "cracker-alla-barbabeitola",
//         content: `I cracker alla barbabietola sono uno snack stuzzicante e originale da preparare in casa utilizzando ingredienti semplici e genuini. Queste sfogliette dal colore brillante non passeranno inosservate nel vostro cestino del pane e arricchiranno la tavola con il loro gusto unico e accattivante. I cracker fatti a mano sono anche un gustoso snack spezza fame, da portare in ufficio o a scuola. Venite a scoprire il nostro mix di semi e cereali per realizzare l'impasto e divertitevi a sperimentare nuove ricette di cracker variando i semi, le farine e le spezie per gusti sempre nuovi, ecco qualche idea:
//                 Cracker di farro
//                 Cracker di lupini
//                 Cracker allo zafferano
//                 Cracker ai semi`,
//         image: "imgs/posts/cracker_barbabietola.jpeg",
//         tags: ["Antipasti", "Ricette vegetariane", "Ricette al forno"],
//     },
//     {
//         title: "Pasta barbabietola e gorgonzola",
//         slug: "pasta-barbabietola-e-gorgonzola",
//         content: `La nostra ricetta della pasta barbabietola e gorgonzola vuole ricreare in questo primo piatto un abbinamento appetitoso, già proposto con la torta salata alla barbabietola! Per un pranzo veloce ma gustoso, per chi ama giocare con consistenze e colori naturali in cucina, questa pasta è perfetta! La dolcezza della barbabietola smorza il gusto deciso che caratterizza questo formaggio erborinato molto amato, un'abbinata vincente e molto gustosa. Provate un nuovo condimento per la vostra pasta e sperimentate altre sfiziose varianti:
//               Pasta con barbabietola e pecorino
//               Gnocchi di barbabietola
//               Tagliatelle alla barbabietola con asparagi`,
//         image: "imgs/posts/pasta_barbabietola.jpeg",
//         tags: ["Primi piatti", "Ricette vegetariane"],
//     },
//     {
//         title: "Pane fritto dolce",
//         slug: "pane-fritto-dolce",
//         content: `Il pane fritto dolce è la versione più antica dell’odierno french toast! Una deliziosa ricetta antispreco che le nonne preparavano ai bambini per merenda, utilizzando gli ingredienti che si avevano sempre a disposizione in casa: pane raffermo, uova, latte e zucchero, che noi abbiamo deciso di aromatizzare con un pizzico di cannella. Facile e veloce da realizzare, il pane fritto dolce vi riporterà con la mente ai sapori dell’infanzia… gustatelo da solo o accompagnatelo con frutta fresca e yogurt per uno spuntino tanto goloso quanto genuino!`,
//         image: "imgs/posts/pane_fritto_dolce.jpeg",
//         tags: ["Dolci", "Dolci veloci", "Ricette veloci", "Ricette vegetariane"],
//     },
//     {
//         title: "Torta paesana",
//         slug: "torta-paesana",
//         content: `La torta paesana è un dolce di origine lombarda e precisamente della Brianza, la zona compresa tra la provincia a nord di Milano e il lago di Lecco-Como. E’ un dolce di origine contadina, dalle infinite varianti, ma realizzata principalmente con pane raffermo bagnato nel latte. E’ infatti conosciuta anche come torta di pane o, in dialetto locale, “michelacc” ovvero mica e lac (pane e latte). A seconda dei gusti e delle disponibilità del momento, al pane ammollato ogni famiglia univa ingredienti diversi, chi l’uvetta o chi i pinoli ad esempio. Noi vi presentiamo la nostra versione con l’aggiunta di cacao e amaretti: perfetta da gustare per una merenda dal sapore rustico, la torta paesana è un perfetto dolce di recupero quando si ha del pane avanzato… ed è ancora più buona il giorno dopo!`,
//         image: "imgs/posts/torta_paesana.jpeg",
//         tags: ["Dolci", "Dolci al cioccolato", "Torte", "Ricette vegetariane", "Ricette al forno"],
//     },
// ];
let posts = require("../db/posts.json");
const path = require("path");
const fs = require("fs");

const index = (req, res) => {
    res.format({
        html: () => {
            let html = "<div>";
            html += `
                <div>
                    <a href="/">Torna alla home</a>
                </div>
                `;
            posts.forEach((post) => {
                html += `
                        <div>
                            <img width="400px" src="/${post.image}"/>
                            <h2>${post.title}</h2>
                            <p>${post.content}</p>
                            <a href="/posts/${post.slug}">Visualizza post</a>
                        </div>
                    `;
                post.tags.forEach((tag) => (html += `<span>#${tag}</span>`));
            });
            html += "</div";
            res.send(html);
        },
        json: () => {
            res.json({
                data: posts,
                count: posts.length,
            });
        },
    });
};
const show = (req, res) => {
    const slug = req.params.slug;
    const reqPost = posts.find((post) => post.slug === slug);

    res.format({
        html: () => {
            if (reqPost) {
                res.send(`
                <div>
                    <h3>${reqPost.title}</h3>
                    <img width="200" src=${`/${reqPost.image}`} />
                    <p><strong>Ingredienti</strong>: ${reqPost.tags
                        .map((tag) => `<span class="tag">#${tag}</span>`)
                        .join(" ")}</p>
                    <a href="/posts/${reqPost.slug
                    }/download">Scarica immagine</a>
                </div>
                `);
            } else {
                res.status(404).send(`Post non trovato!`);
            }
        },
        json: () => {
            if (reqPost) {
                res.json({
                    ...reqPost,
                    image_url: `http://${req.headers.host}/${reqPost.image}`,
                    image_download_url: `http://${req.headers.host}/${reqPost.slug}/download`,
                });
            } else {
                res.status(404).json({
                    error: "Not Found",
                    description: `Non esiste un post con slug ${slug}`,
                });
            }
        },
    });
};

const updatePost = (newPost) => {
    const filePath = path.join(__dirname, "../db/posts.json");
    fs.writeFileSync(filePath, JSON.stringify(newPost));
    posts = newPost;
};

const deletePublicFile = (fileName) => {
    const filePath = path.join(__dirname, "../public", "imgs", "posts", fileName);
    fs.unlinkSync(filePath);
};

const createSlug = (name) => {
    const slug = name.replace(" ", "-").toLowerCase().replaceAll("/", "");
    const slugs = posts.map((post) => post.slug);
    let counter = 1;
    while (slugs.includes(slug)) {
        slug = `${slug}-${counter}`;
        counter++;
    }

    return slug;
};

const create = (req, res) => {
    const { title, slug, content, tags } = req.body;

    if (
        !title ||
        title.replaceAll("/", "").trim().length === 0 ||
        !slug ||
        !content ||
        !tags
    ) {
        req.file?.filename && deletePublicFile(req.file.filename);
        return res.status(400).send("Some data is missing.");
    } else if (!req.file || !req.file.mimetype.includes("image")) {
        req.file?.filename && deletePublicFile(req.file.filename);
        return res.status(400).send("Image is missing or it is not an image file.");
    }

    const newSlug = createSlug(title);

    const newPost = {
        title,
        slug: newSlug,
        content,
        image: req.file?.filename || "",
        tags: tags.split(",").map((tag) => tag.trim()),
    };

    updatePost([...posts, newPost]);

    res.send(
        `Nuovo Post con titolo ${newPost.title} creato! Aggiunto con slug ${newPost.slug}`
    );
};

const destroy = (req, res) => {
    const {slug} = req.params;
    const eliminatePost = posts.find((post) => post.slug === slug);
    if(!eliminatePost){
        return res.status(404).send("Post non trovato!");
    }

    deletePublicFile(eliminatePost.image);
    updatePost(posts.filter((post) => post.slug !== eliminatePost.slug));
    res.send(`Post con slug ${slug} eliminato!`);
};

const downloadImg = (req, res) => {
    const slug = decodeURIComponent(req.params.slug);
    const reqPost = posts.find((post) => post.slug === slug);
    const imagePath = path.join(
        __dirname,
        "..",
        "public",
        "imgs",
        "posts",
        `${slug}.jpeg`
    );

    res.download(imagePath);
};



module.exports = {
    index,
    show,
    create,
    destroy,
    downloadImg,
};
