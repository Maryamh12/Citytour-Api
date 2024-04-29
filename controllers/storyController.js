import Cat from "../models/cat.js";
import multer from 'multer';
import path from 'path';
// Set up storage strategy for multer


// Initialize multer with the storage configuration



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


const update = async (req, res, next) => {
 
  const dataToUpdate = req.body;
  const { catId , storyId } = req.params;
 
  const { id: userId } = req.currentUser;

  try {
    const foundCat = await Cat.findById(catId);

    if (!foundCat) {
      return res.status(404).json({ message: `City with id ${id} not found.` });
    }
    let foundStory = foundCat.storys.id(storyId);
    console.log(foundStory)
    if (!foundStory) {
      return res.status(404).json({ message: `Story with id ${storyId} not found in cat ${catId}` });
    }
    if (
      req.currentUser.id !== foundStory.createdBy.toString() && // did the user create the resource?
     
      req.currentUser.role !== "admin" // is the user an admin?
 
    ) {
      return res.status(403).json({ message: "You cannot edit this story" });
    }
   
    foundStory.set(dataToUpdate);
   
    await foundCat.save();

    return res
      .status(200)
      .json({ message: "Story has been updated", foundStory });
  } catch (err) {
    next(err);
  }
};



const liked = async (req, res, next) => {
 
  
  const {  storyId } = req.params;
 
  const { id: userId } = req.currentUser;

  try {
    // First, find the story with the ID and check if the user has already liked it
    const story = await Cat.findOne({'storys._id': storyId}, {'storys.$': 1});
    const storyToLike = story.storys[0];
    const hasLiked = storyToLike.likes.includes(userId);

    // Based on whether the user has liked it, pull or push the userId
    if (hasLiked) {
      await Cat.updateOne(
        { _id: story._id, 'storys._id': storyId },
        { $pull: {'storys.$.likes': userId} }
      );
    } else {
      await Cat.updateOne(
        { _id: story._id, 'storys._id': storyId },
        { $push: {'storys.$.likes': userId} }
      );
    }

    // Fetch the updated likes count
    const updatedStory = await Cat.findOne({'storys._id': storyId}, {'storys.$': 1});
    const likesCount = updatedStory.storys[0].likes.length;

    return res.json({ success: true, likes: likesCount });
   
  } catch (err) {
    next(err);
  }
};


export default {
  create,
  update, 
  liked
 
};
