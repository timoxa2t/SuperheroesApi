const express = require('express');
const cors = require('cors');
const path = require("path");

// const { connect } = require('./sequelize/db');

const SuperheroServise = require('./sequelize/services/Superhero');
// const { Superhero } = require('./sequelize/mdoels/Superhero');
// const { Superpower } = require('./sequelize/mdoels/Superpower');
// const { Image } = require('./sequelize/mdoels/Image');
const { parseForm } = require('./utils/formServise');


const app = express();

// connect().then(() => {
//   // Superhero.sync();
//   // Superpower.sync();
//   // Image.sync();
// });

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/superhero', (req, res)  => {
  const { limit, offset } = req.query;

  if (isNaN(Number(limit)) || isNaN(Number(offset))) {
    res.sendStatus(400);

    return;
  }
  
  SuperheroServise.getPage(Number(limit), Number(offset))
    .then(superheroes => res.json(superheroes));
});

app.get('/superhero/:id', (req, res)  => {
  const { id } = req.params;

  SuperheroServise.getDetais(Number(id))
    .then(details => res.json(details))
    .catch(err => res.sendStatus(404));
});

app.post('/superhero', async (req, res)  => {
  const superhero = await parseForm(req);

  SuperheroServise.create(superhero)
    .then(newSuperhero => res.json(newSuperhero));
});

app.post('/superhero/:id/image', async (req, res)  => {
  const { id } = req.params;

  const superhero = await parseForm(req);
  console.log(superhero);

  SuperheroServise.addImage(Number(id), superhero.image)
    .then(details => res.json(details));
});

app.post('/superhero/:id/superpower', async (req, res)  => {
  const { id } = req.params;

  SuperheroServise.addSuperpower(Number(id), req.body)
    .then(newSuperpower => res.json(newSuperpower));
});

app.put('/superhero/:id', (req, res)  => {
  const { id } = req.params;

  SuperheroServise.update(Number(id), req.body)
    .then(changed => res.json(changed));
});

app.delete('/superhero/:id', (req, res)  => {
  const { id } = req.params;

  SuperheroServise.remove(Number(id))
    .then(() => res.sendStatus(200));
});

app.listen(3000);