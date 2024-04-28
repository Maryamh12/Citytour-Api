import Cat from "../models/cat.js";

const getAll = async (req, res, next) => {
  try {
    const cats = await Cat.find();
    return res.status(200).json(cats);
  } catch (err) {
    next(err);
  }
};

const getIndividual = async (req, res, next) => {
  const { id } = req.params;
  try {
    // If we query the database for an ID, the findById function will just take the wanted it as parameter
    // and IFF a document with the ID is found it will return that document otherwise
    // it will return null
    const foundCat = await Cat.findById(id);
    // Now we can check whether foundCat actually holds data (meaning there was an object returned)
    // or if it's null!
    if (foundCat) {
      return res.status(200).json({
        message: `Successfully found the cat you requested`,
        data: foundCat,
      });
    } else {
      return res.status(404).json({
        message: `Could not find a cat with the id ${id}`,
      });
    }
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  // we pull off the data from the request
  const newCat = { ...req.body, createdBy: req.currentUser.id };

  // who wants to create this cat?
  console.log(req.currentUser);

  // We currently just have the data being sent from the frontend related to the cat
  // So the age & name.
  // We now need to add the createdBy property, which should contain the ID of the user
  // who sends the request!
  // Where can I get the ID of the user sending the current request?
  // newCat.createdBy = req.currentUser.id;

  // and then try to write that object into our database
  // For that we can use the create() method which takes a javascript object and
  // reaches out to the databse collection (in our case cats) to write the new object into it.
  try {
    const dbResponse = await Cat.create(newCat);
    return res
      .status(200)
      .json({ message: "Successfully created cat", addedCat: dbResponse });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const dataToUpdate = req.body;

  // Now we want our update route to be protected.
  // 1.) Only authenticated users can even send a request to this route!
  // Done!
  // 2.) Only two types of users can update a given cat.
  // Group A: admins -> we need to check the role.
  // if (req.currentUser.role !== "admin") {
  //   return res
  //     .status(403)
  //     .json({ message: "Only admins can update the document!" });
  // }
  // Group B: the person who created the actual resource -> you need the ID.
  // req.currentUser.id
  // compare to the createdBy property on the requested Cat!
  // We first have to find the document with the given id (from the req.params)
  // and then compare the req.currentUser.id to the foundCat.createdBy
  // find the specific document that we want to update using the id.
  try {
    const foundCat = await Cat.findById(id);

    if (!foundCat) {
      return res.status(404).json({ message: `Cat with id ${id} not found.` });
    }

    if (
      req.currentUser.id !== foundCat.createdBy.toString() && // did the user create the resource?
      // Make sure that your types actually match! Meaning an ObjectID can only be compared to another ObjectID
      // or a string to a string. So above we had to turn the createdBy property into a string, otherwise
      // it wouldn't be comparable to the id property on the currentUser object, which is a string!
      req.currentUser.role !== "admin" // is the user an admin?
      // if one of the two above conditions is true, the user is authorized!
      // In other words, both of the above conditions have to be false, for the user
      // to be unauthorized! -> use &&
      // if not, we'll send them back a 403 and end the req/res cycle.
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updatedCat = await Cat.findByIdAndUpdate(id, dataToUpdate, {
      returnDocument: "after",
    });

    return res
      .status(200)
      .json({ message: "Cat has been updated", updatedCat });
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  const { id } = req.params;

  try {
    const catToDelete = await Cat.findById(id);

    if (!catToDelete) {
      return res
        .status(404)
        .json({ message: `Cat with id ${id} could not be found.` });
    }

    if (
      req.currentUser.id !== catToDelete.createdBy.toString() &&
      req.currentUser.role !== "admin"
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const deletedCat = await Cat.findByIdAndDelete(id);

    if (deletedCat) {
      return res.status(200).json({ message: "Cat was deleted", deletedCat });
    } else {
      // If we end up in this else block, that MUST mean the variable deletedCat
      // is actually null.
      // In other words, we could not find a document with the given ID.
      return res.status(404).json({ message: `No cat with id ${id} found.` });
    }
  } catch (err) {
    // If we end up here, that means our code CRASHED.
    // Which only happens if a line of our code threw an error.
    // In this case the culprit will be very likely our line that runs the
    // findByIdAndDelete() method, because in that line we reach out to the database
    // and try to find a document with a certain ID.
    // That function will throw an error if the database is down or
    // the given ID is invalid.
    // But we won't know what the cause was exactly here, so we'll just return a
    // generic error message.
    next(err);
  }
};

const search = async (req, res, next) => {
  const query = req.body.query.toLowerCase();

  try {
    const results = await Cat.find({ name: { $regex: query, $options: 'i' } });
    // console.log(results[0])

    if (!results[0]) {
      return res.status(404).json({ message: `City with name :${query} not found.` });
    }

   

    return res
      .status(200)
      .json({ message: "City has been updated", data: results });
  } catch (err) {
    next(err);
  }
};

// When I export I actually create a new object
// that contains all of my functions inside of this controller.
export default {
  // We can use a shorthand here that will automatically take the
  // variable name as the key and the variable value as the value
  // of that key.
  // So whenever we create an object, we can write:
  getAll,
  //   instead of:
  // getAll: getAll
  getIndividual,
  create,
  update,
  remove,
  search
};
