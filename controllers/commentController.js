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

    // const updatedCat = await Cat.findByIdAndUpdate({
    //     {id: catId},
    //     { $push: { comments: { text, createdBy: userId }  },
    // });

    // PersonModel.update(
    //   { _id: person._id },
    //   { $push: { friends: friend } },
    //   done
    // );

    if (!foundCat) {
      return res
        .status(404)
        .json({ message: `Cat with id ${catId} not found` });
    }

    // Add the comment to the cat document
    // foundCat.comments is a plain old JavaScript array, meaning we
    // can add values by pushing to the array.
    // We can add the text of the req.body, but we also have to add
    // the createdBy property.
    const foundStory = foundCat.storys.id(storyId);
    if (!foundStory) {
      return res.status(404).json({ message: `Story with id ${storyId} not found in cat ${catId}` });
    }

    // Add the comment to the found story
    foundStory.comments.push({ text, createdBy: userId });
    // The above line just adds the comment to the JavaScript object,
    // not to the database! We now have to save the updated document
    // for it to be reflected in our database.
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

    // If you want to give the option to update multiple values in this route,
    // the above solution doesn't really work anymore. Imagine there's a rating on each comment
    // and the user could change the rating or the text of the comment, then the following option
    // is the better one!
    // foundCat.comments = foundCat.comments.map((comment) => {
    //   // We're using the map function to return a whole array of transformed elements
    //   // but the only element we actually want to change is the comment where the id matches.
    //   if (comment.id === commentId) {
    //     // so if the id matches, we'll take the original comment,
    //     // spread it in a new object and spread in the request body as well.
    //     // The request body will overwrite any existing key/value pairs with the updated values
    //     return { ...comment, ...req.body };
    //   } else {
    //     return comment;
    //   }
    // });
    // await foundCat.save();

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
    //   // 1. Find the cat the comment was left on
    const foundCat = await Cat.findById(catId);
    if (!foundCat) {
      return res
        .status(404)
        .json({ message: `Cat with id ${catId} not found` });
    }
    // 2. Find the comment!
    const commentToDelete = foundCat.comments.find(
      (comment) => comment.id === commentId
    );

    if (!commentToDelete) {
      return res
        .status(404)
        .json({ message: `Comment with id ${commentId} not found` });
    }

    //   // 3. Check if user an admin or created the comment
    if (
      req.currentUser.role !== "admin" &&
      req.currentUser.id !== commentToDelete.createdBy.toString()
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    // 4. Delete the comment!
    // Mongoose solution
    commentToDelete.remove();
    await foundCat.save();

    // Vanilla JS solution
    // foundCat.comments = foundCat.comments.filter(
    //   (comment) => comment.id !== commentId
    // );
    // foundCat.save();

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
