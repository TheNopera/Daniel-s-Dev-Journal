
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Seja bem-vindo ao Journal de Desenvolvedor! Aqui, você encontrará posts sobre meus projetos e experiências como desenvolvedor. Sou um apaixonado por tecnologia e acredito que compartilhar conhecimento é uma das melhores maneiras de aprender e crescer na carreira. Nesse espaço, você poderá acompanhar os desafios e soluções que encontrei em meu dia a dia como desenvolvedor. Se você também é apaixonado por tecnologia e quer se aprofundar em desenvolvimento de software, este é o lugar certo! Espero que você aproveite o conteúdo e, quem sabe, até se inspire a criar seus próprios projetos. Bem-vindo ao Journal de Desenvolvedor!";
const aboutContent = "Sou apaixonado por criar soluções e desafiar-me a ser cada vez melhor como desenvolvedor. Acredito que a paixão por codificar é o que faz toda a diferença e é o que permite a criação de coisas incríveis. No meu tempo livre, gosto de experimentar novos recursos e tecnologias para expandir meus conhecimentos e habilidades. Além disso, compartilhar minhas experiências e soluções para problemas com outros desenvolvedores é uma grande fonte de satisfação para mim. Este journal é uma plataforma onde eu posso compartilhar meus pensamentos e soluções para problemas que encontrei ao longo do meu caminho como desenvolvedor. Bem-vindo ao meu espaço criativo!";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const posts = [];


//--------------HOME ROUTE----------------------------
app.get("/", (req, res) => {
  res.render('home', { openingText: homeStartingContent, posts: posts });

})


//--------------ABOUT ROUTE---------------------------

app.get("/about", (req, res) => {
  res.render("about", { openingText: aboutContent });
})

//--------------CONTACT ROUTE-------------------------

app.get("/contact", (req, res) => {
  res.render("contact", { openingText: contactContent });
})

//--------------COMPOSE ROUTE--------------------------

app.get("/compose", (req, res) => {
  res.render("compose");
})

app.post("/compose", (req, res) => {
  const post = {
    title: req.body.postTitle,
    content: req.body.newPost
  };

  posts.push(post);
  res.redirect("/");
})

app.listen(3000, () => {
  console.log("Hello World on PORT 3000");
})

//---------------POSTS ROUTES--------------------------

app.get("/posts/:postName", (req, res) => {
  for (var i = 0; i < posts.length; i++) {
    if (_.lowerCase(posts[i].title) == _.lowerCase(req.params.postName)) {
      res.render('post', { postTitle: posts[i].title, postContent: posts[i].content })
    }
  }
})
