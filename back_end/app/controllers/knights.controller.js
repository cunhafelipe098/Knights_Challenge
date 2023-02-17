const db = require("../models");
const Knights = db.knights;

// Create and Save a new Knights
exports.create = (req, res) => {
  const requiredFields = ['name', 'nickname', 'birthday', 'weapons', 'attributes', 'keyAttribute']

  for (const field of requiredFields) {
    if (!req.body[field]) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  }

  const requiredFieldsWeapons = ['name', 'mod', 'attr']
  for (const weapon of req.body.weapons) {
    for (const field of requiredFieldsWeapons) {
      if (!weapon[field]) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }
    }
  }

  const requiredFieldsAttributes = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma']
  for (const field of requiredFieldsAttributes) {
    if (isNaN(req.body.attributes[field])) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  }

  const knights = new Knights({
    name: req.body.name,
    nickname: req.body.nickname,
    birthday: req.body.birthday,
    weapons: req.body.weapons,
    attributes: req.body.attributes,
    keyAttribute: req.body.keyAttribute,
    hallOfHeroes: false
  });

  knights
    .save(knights)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Knights."
      });
    });
};

// Retrieve all knights from the database.
exports.findAll = (req, res) => {

  Knights.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving knights."
      });
    });
};

// Find a single Knights with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Knights.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Knights with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Knights with id=" + id });
    });
};

// Update a Knights by the id in the request
exports.update = (req, res) => {

  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Knights.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Knights with id=${id}. Maybe Knights was not found!`
        });
      } else res.send({ message: "Knights was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Knights with id=" + id
      });
    });
};

// Delete a Knights with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Knights.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Knights with id=${id}. Maybe Knights was not found!`
        });
      } else {
        res.send({
          message: "Knights was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Knights with id=" + id
      });
    });
};

// Delete all knights from the database.
exports.deleteAll = (req, res) => {
  Knights.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} knights were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all knights."
      });
    });
};

// Find all published knights
exports.findAllPublished = (req, res) => {
  Knights.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving knights."
      });
    });
};
