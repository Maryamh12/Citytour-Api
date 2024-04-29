import Cat from "../models/cat.js";

const create = async (req, res, next) => {
  // Get comment text from the request
  const { text } = req.body;
  //  grab the ID of the cat
  const { catId , storyId } = req.params;
  // grab the id of the user sending the request
  const { id: userId } = req.currentUser;
  //   const userId = req.currentUser.id

  try {
    // find the cat to add the comment to it
    const foundCat = await Cat.findById(catId);

  

    if (!foundCat) {
      return res
        .status(404)
        .json({ message: `Cat with id ${catId} not found` });
    }

 
    const foundStory = foundCat.storys.id(storyId);
    if (!foundStory) {
      return res.status(404).json({ message: `Story with id ${storyId} not found in cat ${catId}` });
    }

    // Add the comment to the found story
    foundStory.comments.push({ text, createdBy: userId });
   
    await foundCat.save();

    return res.status(200).json({
      message: "Comment has been successfully added to cat!",
      comment: { text, createdBy: userId },
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  const { catId, commentId } = req.params;

  try {
    // 1. Find the cat the comment was left on
    const foundCat = await Cat.findById(catId);
    if (!foundCat) {
      return res
        .status(404)
        .json({ message: `Cat with id ${catId} not found` });
    }
    // 2. Find the comment!
    const commentToUpdate = foundCat.comments.find(
      (comment) => comment.id === commentId
    );

    if (!commentToUpdate) {
      return res
        .status(404)
        .json({ message: `Comment with id ${commentId} not found` });
    }

    // 3. Check if user an admin or created the comment
    console.log({ "User making the request": req.currentUser });
    console.log("comment createdBy id", commentToUpdate.createdBy.toString());

    if (
      req.currentUser.role !== "admin" &&
      req.currentUser.id !== commentToUpdate.createdBy.toString()
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    // 4. Update the comment!
    commentToUpdate.text = req.body.text;
    await foundCat.save();

 
    return res.status(200).json({
      message: "Comment successfully updated",
      updatedComment: commentToUpdate,
    });
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  const { catId, commentId } = req.params;

  try {
  
    const foundCat = await Cat.findById(catId);
    if (!foundCat) {
      return res
        .status(404)
        .json({ message: `Cat with id ${catId} not found` });
    }
  
    const commentToDelete = foundCat.comments.find(
      (comment) => comment.id === commentId
    );

    if (!commentToDelete) {
      return res
        .status(404)
        .json({ message: `Comment with id ${commentId} not found` });
    }

    
    if (
      req.currentUser.role !== "admin" &&
      req.currentUser.id !== commentToDelete.createdBy.toString()
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }
   
    commentToDelete.remove();
    await foundCat.save();

  

    return res.status(200).json({
      message: "Comment successfully deleted",
      deletedComment: commentToDelete,
    });
  } catch (err) {
    next(err);
  }
  return res.status(200).json({ message: "Endpoint working!" });
};

export default {
  create,
  update,
  remove,
};
