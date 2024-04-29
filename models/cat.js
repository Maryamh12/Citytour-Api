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



const catSchema = mongoose.Schema(
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


export default mongoose.model("Cat", catSchema);
