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
  
    const foundCat = await Cat.findById(id);
 
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

 
  try {
    const foundCat = await Cat.findById(id);

    if (!foundCat) {
      return res.status(404).json({ message: `Cat with id ${id} not found.` });
    }

    if (
      req.currentUser.id !== foundCat.createdBy.toString() && // did the user create the resource?
      
      req.currentUser.role !== "admin" // is the user an admin?
      
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
  
      return res.status(404).json({ message: `No cat with id ${id} found.` });
    }
  } catch (err) {
  
    next(err);
  }
};

const search = async (req, res, next) => {
  const query = req.body.query.toLowerCase();

  try {
    const results = await Cat.find({ name: { $regex: query, $options: 'i' } });
  

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

export default {

  getAll,
  getIndividual,
  create,
  update,
  remove,
  search
};
