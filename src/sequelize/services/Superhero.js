const { Image } = require('../mdoels/Image');
const { Superhero } = require('../mdoels/Superhero');
const { Superpower } = require('../mdoels/Superpower');

async function getPage(limit, offset) {
  const superheroes =  await Superhero.findAll(
    {
      attributes: ['id', 'nickname', 'image'],
      offset,
      limit,
    }
  );

  const total = await Superhero.count();

  return {
    superheroes,
    total,
  }
}

async function getDetais(id) {
  const superhero = await Superhero.findByPk(id);

  if (superhero === null) {
    return Promise.reject();
  }
  
  const superpowers = await Superpower.findAll({
    where: {
      superheroId: id,
    }
  });

  const images = await Image.findAll({
    where: {
      superheroId: id,
    }
  });

  return {
    ...superhero.dataValues,
    superpowers: superpowers.map(({name}) => name),
    images: images.map(({url}) => url),
  };
}

async function create(superhero) {
  const newSuperhero = await Superhero.create(superhero);

  return newSuperhero;
}

async function remove(id) {

  await Image.destroy({
    where: { 
      superheroId: id,
     }
  });

  await Superpower.destroy({
    where: { 
      superheroId: id,
     }
  });

  return await Superhero.destroy({
    where: { id }
  });
}

async function update(id, superhero) {
  const updatedSuperhero = await Superhero.update(
    superhero,
    {
      where: {
        id
      }
    }
  )
    
  return await getDetais(id);
}

async function addImage(superheroId, url) {
  return await Image.create({
    superheroId,
    url,
  })
}

async function removeImage(superheroId, url) {
  return await Image.destroy({
    where: {
      superheroId,
      url,
    }
  })
}

async function addSuperpower(superheroId, superpower) {
  return await Superpower.create({
    superheroId,
    ...superpower,
  })
}

async function removeSuperpower(superheroId, name) {
  return await Superpower.destroy({
    where: {
      superheroId,
      name,
    }
  })
}

module.exports = {
  getPage,
  create,
  remove,
  getDetais,
  addImage,
  update,
  addSuperpower,
  removeImage,
  removeSuperpower,
}