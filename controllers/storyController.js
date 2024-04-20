import Cat from "../models/cat.js";

const create = async (req, res, next) => {

  const  storyData  = req.body;
 
  const { catId } = req.params;

  const { id: userId } = req.currentUser;
 

  try {
    
    const foundCat = await Cat.findById(catId);
  console.log(foundCat);
  console.log(storyData);

    if (!foundCat) {
      return res
        .status(404)
        .json({ message: `Cat with id ${catId} not found` });
    }

   
    foundCat.storys.push({ ...storyData , createdBy: userId });

  
    await foundCat.save();

    return res.status(200).json({
      message: "Comment has been successfully added to cat!",
      comment: { storyData , createdBy: userId },
    });
  } catch (err) {
    next(err);
  }
};




export default {
  create,
 
};
