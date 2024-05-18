
# City Tour 

This project utilizes the React framework for the frontend and Node.js for the backend. Inspired by my love for traveling and storytelling, I developed an application that allows users to take virtual tours of any city in the world. Users can read and enjoy stories shared by others on the platform and have the option to share their own travel experiences.

## Deployed Application

View the deployed site here.


## Application Visuals

<p align="center">
  <img src="https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Demo 1" width="300"/>
  <img src="https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Demo 2" width="300"/>
  <img src="https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Demo 3" width="300"/>
</p>


## Responsive Design

<p align="center">
  <img src="https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Demo 1" width="300"/>
  <img src="https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Demo 2" width="300"/>
  <img src="https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Demo 3" width="300"/>
</p>


## 🛠 Technologies Used
#### Backend:

- JavaScript

- Node.js

- JSON Web Token (JWT)

#### Frontend:

- React

- JavaScript

- React-Router-Dom

- Axios

- CSS


#### Development and Deployment

- Excalidraw

- Postman

- Git

- GitHub

- Netlify

- Render


## Project Brief:

- Objective: Develop a full-stack application with a custom backend and frontend.
- Backend: Use JavaScript and Node.js to create an API. Serve data    from a Mongodb database.
- Frontend: Build a separate frontend using React. Ensure it consumes the API created by the backend.
- Functionality: The application should be a complete product, which typically involves multiple relationships and CRUD (Create, Read, Update, Delete) functionality for at least a couple of models.
- User Stories/Wireframes: Implement thoughtful user stories and wireframes that are detailed enough to distinguish core MVP (Minimum Viable Product) features from those that can be deferred.
- Design: Ensure the application has a visually impressive design to enhance your portfolio and impress future clients and employers.
- Deployment: Deploy the application online to make it publicly accessible.
- Optional Features: Implement React Hooks for advanced state and effect management (optional but recommended).





## Build/Code Process:

### Backend:
Creating an application with a Node.js backend using JavaScript was a new and exciting challenge for me. As I delved into the planning phase, I began to identify and structure the necessary models for the application. In total, I implemented four schema: city, story, comment, and user.

#### City Schema
My city model is designed to display the name of the city, an image representing the city, and its associated stories. Each story about the city includes details such as the narrative itself, comments from users, and likes. This structure allows users to explore cities visually, read engaging stories, and interact with the content by leaving comments and likes.



```javascript


import mongoose from "mongoose";


const commentSchema = mongoose.Schema(
  {
    text: { type: String, required: true },
    createdBy: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);
const storySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true, default: false },
    description: { type: String, required: true },
    createdBy: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    comments: [commentSchema],
    likes: [{ type: mongoose.Schema.ObjectId, ref: "User", required: true }],
  },
  {
    timestamps: true,
  }
);



const citySchema = mongoose.Schema(
  {
  
    name: { type: String, required: true },
    text : { type: String, required: true },
    image: { type: String, required: true },
    
   
  
    hasBeenAdopted: { type: Boolean, default: false },
   
    createdBy: { type: mongoose.Schema.ObjectId, ref: "User", required: true },

    
    storys: [storySchema],
    
  },
  {

    timestamps: true,
  }
);


export default mongoose.model("City", citySchema);



```


#### Update, create stories in the backend

This is the storyController, which manages the functionalities for creating, updating, viewing, and liking a story. I was particularly satisfied with the implementation of permission checks in these functions. It verifies whether the user attempting to update the story is the actual owner, ensuring that only the owner can successfully perform these actions. Additionally, I successfully implemented an override for the admin, allowing them to update stories regardless of their ownership status, achieved by incorporating the condition req.currentUser.role !== "admin".

The storyController also handles viewing all stories and specific comments about a story, providing comprehensive functionality for story management within the application.


```javascript

import Cat from "../models/cat.js";
import multer from 'multer';
import path from 'path';
// Set up storage strategy for multer


// Initialize multer with the storage configuration



const create = async (req, res, next) => {

  const  storyData  = req.body;
 
  const { cityId } = req.params;

  const { id: userId } = req.currentUser;
 

  try {
    
    const foundCity = await City.findById(cityId);
    console.log(foundCity);
    console.log(storyData);

    if (!foundCity) {
      return res
        .status(404)
        .json({ message: `City with id ${cityId} not found` });
    }

   
    foundCity.storys.push({ ...storyData , createdBy: userId });

  
    await foundCity.save();

    return res.status(200).json({
      message: "Comment has been successfully added to Story!",
      comment: { storyData , createdBy: userId },
    });
  } catch (err) {
    next(err);
  }
};


const update = async (req, res, next) => {
 
  const dataToUpdate = req.body;
  const { cityId , storyId } = req.params;
 
  const { id: userId } = req.currentUser;

  try {
    const foundCity = await city.findById(catId);

    if (!foundCity) {
      return res.status(404).json({ message: `City with id ${id} not found.` });
    }
    let foundStory = foundCity.storys.id(storyId);
    console.log(foundStory)
    if (!foundStory) {
      return res.status(404).json({ message: `Story with id ${storyId} not found in city ${cityId}` });
    }
    if (
      req.currentUser.id !== foundStory.createdBy.toString() && // did the user create the resource?
     
      req.currentUser.role !== "admin" // is the user an admin?
 
    ) {
      return res.status(403).json({ message: "You cannot edit this story" });
    }
   
    foundStory.set(dataToUpdate);
   
    await foundCity.save();

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
    const story = await City.findOne({'storys._id': storyId}, {'storys.$': 1});
    const storyToLike = story.storys[0];
    const hasLiked = storyToLike.likes.includes(userId);

    // Based on whether the user has liked it, pull or push the userId
    if (hasLiked) {
      await City.updateOne(
        { _id: story._id, 'storys._id': storyId },
        { $pull: {'storys.$.likes': userId} }
      );
    } else {
      await City.updateOne(
        { _id: story._id, 'storys._id': storyId },
        { $push: {'storys.$.likes': userId} }
      );
    }

    // Fetch the updated likes count
    const updatedStory = await City.findOne({'storys._id': storyId}, {'storys.$': 1});
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
```


### Frontend:
Creating an application with a Node.js backend using JavaScript was a new and exciting challenge for me. As I delved into the planning phase, I began to identify and structure the necessary models for the application. In total, I implemented four schema: city, story, comment, and user.

#### Homepage
My city model is designed to display the name of the city, an image representing the city, and its associated stories. Each story about the city includes details such as the narrative itself, comments from users, and likes. This structure allows users to explore cities visually, read engaging stories, and interact with the content by leaving comments and likes.
















