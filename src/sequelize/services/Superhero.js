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
  
  // await Superpower.bulkCreate(superhero.superpowers.map(
  //   superpower => ({
  //     superheroId: id,
  //     name: superpower
  //   })
  // ));

  // await Image.bulkCreate(superhero.images.map(
  //   image => ({
  //     superheroId: id,
  //     url: image
  //   })
  // ));

  return newSuperhero;
}

async function remove(id) {
  await Superhero.destroy({
    where: { id }
  });

  await Image.destroy({
    where: { 
      superheroId: id,
     }
  });

  return await Superpower.destroy({
    where: { 
      superheroId: id,
     }
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
  );

  return updatedSuperhero;
}

async function addImage(superheroId, url) {
  return await Image.create({
    superheroId,
    url,
  })
}

async function addSuperpower(superheroId, superpower) {
  return await Superpower.create({
    superheroId,
    ...superpower,
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
}