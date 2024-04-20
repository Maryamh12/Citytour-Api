import mongoose from "mongoose";

// We want to embed comments inside of our Cat documents
// For our comments we only need a schema, not a model!
// In other words all comments will be attached directly to a cat document
// and we won't give them their own collection.
// Example comment that fits our schema:
// {
//   text: "Beautiful cat",
//   createdBy: -> the userId of who wrote this
// }
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
    comments: [commentSchema]
  },
  {
    timestamps: true,
  }
);
const likeSchema = mongoose.Schema(
  {
    
    createdBy: { type: mongoose.Schema.ObjectId, ref: "User", required: true }
  },
  {
    timestamps: true,
  }
);

// To define our first model we are going to use the mongoose.Schema function.
const catSchema = mongoose.Schema(
  {
    // Name & Age are required
    name: { type: String, required: true },
    text : { type: String, required: true },
    image: { type: String, required: true },
    // Description is an optional property. If no value specified, we'll leave it empty.
   
  
    // You can also give default values, that will be set on the database document
    // in case no other values for that property have been defined.
    // Here we give the hasBeenAdopted property a value of false, if not otherwise
    // specified.
    hasBeenAdopted: { type: Boolean, default: false },
    // A way of creating a date in mongoose would look like thisL
    // createdAt: { type: Date, default: Date.now() },
    // In order to reference who created a given document,
    // we need to set the type to an ObjectId and give the name of the
    // referenced collection!
    createdBy: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    // For comments, we want to have an array, so we'll use the square brackets: []
    // And to specify the schema of each element inside of that array, we can just
    // pass in the commentSchema
    
    storys: [storySchema],
    likes: [likeSchema],
  },
  {
    // but if you only need updatedAt, createdAt timestamps, it's an easier option
    // to add this property here
    timestamps: true,
  }
);

// The schema tells us the blueprint of the database documents and we can use it
// to create a mongoose model, which allows us to then interact with our database.
// So make sure that you're not trying to use the schema when querying the database,
// but insteda always use the actual model.
export default mongoose.model("Cat", catSchema);
