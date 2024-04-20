import { connectToDb } from "./db.js";
import Cat from "../models/cat.js";
import User from "../models/user.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Because we're handling the hashing of our passwords our self
// instead of letting mongoose deal with it with a pre-save hook
// we do have to add the hashPassword function here in our seeding script.
const hashPassword = async (plainTextPassword) => {
  const hashedPassword = await bcrypt.hash(plainTextPassword, 10);
  return hashedPassword;
};

const userId = "64032e194edba1166601abb7";
const adminId = "640359784edba1166601ae7d";

const seedingData = {
  cats: [
    {
      name: "Paris",
      text: " Paris, a city where centuries of history blend  seamlessly with contemporary flair. From the grandeur of the Louvre to the elegance of the Eiffel Tower, Paris' story is one of artistic brilliance and cultural diversity. Its charming streets are adorned with iconic landmarks and cozy cafes, inviting exploration at every turn.",
      image: "https://images.pexels.com/photos/161853/eiffel-tower-paris-france-tower-161853.jpeg?auto=compress&cs=tinysrgb&w=600",
      storys:[
        {
          name:"Suncrest Summer: Mia's Adventure",
          image:"https://images.pexels.com/photos/2563997/pexels-photo-2563997.jpeg?auto=compress&cs=tinysrgb&w=600",
          description: "In the seaside town of Suncrest, Mia embraced the magic of summer. With her bike as her companion,she explored coastal paths and picnicked with friends on sandy shores. Beneath starlit skies, they gathered around bonfires, roasting marshmallows and sharing stories. In these moments, Mia found joy in the simplicity of summer's embrace."
        },
        {
          name:"Blossoms of Spring: Sophie's Story",
          image:"https://images.pexels.com/photos/3073666/pexels-photo-3073666.jpeg?auto=compress&cs=tinysrgb&w=600",
          description: "In a quiet village, Sophie eagerly awaited the arrival of spring. With the blossoming of wildflowers and the village festival in full swing, she found joy in the simple pleasures of the season dancing around the Maypole with friends, chasing butterflies in the meadows, and savoring the warmth of the sun on her face. In the heart of spring, Sophie discovered the beauty of new beginnings and the magic of being surrounded by nature's wonders."
        },
        {
          name:"Capturing Parisian Essence: The Story of Amélie",
          image:"https://images.pexels.com/photos/1060798/pexels-photo-1060798.jpeg?auto=compress&cs=tinysrgb&w=600",
          description: "In the heart of Paris, there was Amélie, a young waitress with a passion for photography. Roaming the city streets with her camera, she sought to capture the essence of Paris in every frame. One autumn day, she stumbled upon an elderly couple in the Jardin des Tuileries, their embrace bathed in the soft glow of the setting sun. Moved by the moment, she snapped a photograph that would change her life. That single image catapulted Amélie into the spotlight, but for her, the true reward was witnessing the beauty and resilience of the human spirit in the city she called home."
        }
      ]
    },
    {
      name: "Tehran",
      text: " In the heart of Iran lies Tehran, a city where ancient history meets modernity. From its roots in the Qajar dynasty to its bustling streets today, Tehran's story is one of cultural fusion and rapid growth. Its skyline boasts a mix of ancient palaces and towering skyscrapers, reflecting its rich past and dynamic present",
      image: "https://images.pexels.com/photos/3799176/pexels-photo-3799176.jpeg?auto=compress&cs=tinysrgb&w=600",
      storys:[
        {
          name:"Suncrest Summer: Mia's Adventure",
          image:"https://images.pexels.com/photos/8177153/pexels-photo-8177153.jpeg?auto=compress&cs=tinysrgb&w=600",
          description: "In the seaside town of Suncrest, Mia embraced the magic of summer. With her bike as her companion,she explored coastal paths and picnicked with friends on sandy shores. Beneath starlit skies, they gathered around bonfires, roasting marshmallows and sharing stories. In these moments, Mia found joy in the simplicity of summer's embrace."
        },
        {
          name:"Blossoms of Spring: Sophie's Story",
          image:"https://media.istockphoto.com/id/1304068159/photo/city-of-tehran.jpg?s=612x612&w=0&k=20&c=2XVHhbA3c0B7phRa1tN4wzrNCSxWY2cXL16D-GU-s_g=",
          description: "In a quiet village, Sophie eagerly awaited the arrival of spring. With the blossoming of wildflowers and the village festival in full swing, she found joy in the simple pleasures of the season dancing around the Maypole with friends, chasing butterflies in the meadows, and savoring the warmth of the sun on her face. In the heart of spring, Sophie discovered the beauty of new beginnings and the magic of being surrounded by nature's wonders."
        },
        {
          name:"Capturing Parisian Essence: The Story of Amélie",
          image:"https://images.pexels.com/photos/6348998/pexels-photo-6348998.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          description: "In the heart of Paris, there was Amélie, a young waitress with a passion for photography. Roaming the city streets with her camera, she sought to capture the essence of Paris in every frame. One autumn day, she stumbled upon an elderly couple in the Jardin des Tuileries, their embrace bathed in the soft glow of the setting sun. Moved by the moment, she snapped a photograph that would change her life. That single image catapulted Amélie into the spotlight, but for her, the true reward was witnessing the beauty and resilience of the human spirit in the city she called home."
        }
      ]
    },
    {
      name: "New York",
      text: "In the bustling metropolis of New York City, the narrative is one of relentless ambition and unparalleled diversity. From the towering skyscrapers of Manhattan to the vibrant neighborhoods of Brooklyn, New York's story is a tapestry woven with countless threads of culture, commerce, and creativity.",
      image: "https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=600",
      storys:[
        {
          name:"Suncrest Summer: Mia's Adventure",
          image:"https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=600",
          description: "In the seaside town of Suncrest, Mia embraced the magic of summer. With her bike as her companion,she explored coastal paths and picnicked with friends on sandy shores. Beneath starlit skies, they gathered around bonfires, roasting marshmallows and sharing stories. In these moments, Mia found joy in the simplicity of summer's embrace."
        },
        {
          name:"Blossoms of Spring: Sophie's Story",
          image:"https://images.pexels.com/photos/771881/pexels-photo-771881.jpeg?auto=compress&cs=tinysrgb&w=600",
          description: "In a quiet village, Sophie eagerly awaited the arrival of spring. With the blossoming of wildflowers and the village festival in full swing, she found joy in the simple pleasures of the season dancing around the Maypole with friends, chasing butterflies in the meadows, and savoring the warmth of the sun on her face. In the heart of spring, Sophie discovered the beauty of new beginnings and the magic of being surrounded by nature's wonders."
        },
        {
          name:"Capturing Parisian Essence: The Story of Amélie",
          image:"https://images.pexels.com/photos/1402790/pexels-photo-1402790.jpeg?auto=compress&cs=tinysrgb&w=600",
          description: "In the heart of Paris, there was Amélie, a young waitress with a passion for photography. Roaming the city streets with her camera, she sought to capture the essence of Paris in every frame. One autumn day, she stumbled upon an elderly couple in the Jardin des Tuileries, their embrace bathed in the soft glow of the setting sun. Moved by the moment, she snapped a photograph that would change her life. That single image catapulted Amélie into the spotlight, but for her, the true reward was witnessing the beauty and resilience of the human spirit in the city she called home."
        }
      ]
    },
    {
      name: "Beijing",
      text: "City steeped in ancient tradition yet propelled forward by modern ambition. From the majestic Forbidden City to the iconic Great Wall, Beijing's story is one of imperial splendor and enduring resilience. Its streets buzz with the energy of millions, a testament to China's rapid urbanization and economic growth.",
      image: "https://media.istockphoto.com/id/491990549/photo/ancient-chinese-architecture.jpg?b=1&s=612x612&w=0&k=20&c=2RJ-NSo26jLRUjCfbQwvBInKJyjzBaKIuYmSztAHjL4=",
      storys:[
        {
          name:"Suncrest Summer: Mia's Adventure",
          image:"https://images.pexels.com/photos/19872/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
          description: "In the seaside town of Suncrest, Mia embraced the magic of summer. With her bike as her companion,she explored coastal paths and picnicked with friends on sandy shores. Beneath starlit skies, they gathered around bonfires, roasting marshmallows and sharing stories. In these moments, Mia found joy in the simplicity of summer's embrace."
        },
        {
          name:"Blossoms of Spring: Sophie's Story",
          image:"https://images.pexels.com/photos/2846075/pexels-photo-2846075.jpeg?auto=compress&cs=tinysrgb&w=600",
          description: "In a quiet village, Sophie eagerly awaited the arrival of spring. With the blossoming of wildflowers and the village festival in full swing, she found joy in the simple pleasures of the season dancing around the Maypole with friends, chasing butterflies in the meadows, and savoring the warmth of the sun on her face. In the heart of spring, Sophie discovered the beauty of new beginnings and the magic of being surrounded by nature's wonders."
        },
        {
          name:"Capturing Parisian Essence: The Story of Amélie",
          image:"https://images.pexels.com/photos/2845965/pexels-photo-2845965.jpeg?auto=compress&cs=tinysrgb&w=600",
          description: "In the heart of Paris, there was Amélie, a young waitress with a passion for photography. Roaming the city streets with her camera, she sought to capture the essence of Paris in every frame. One autumn day, she stumbled upon an elderly couple in the Jardin des Tuileries, their embrace bathed in the soft glow of the setting sun. Moved by the moment, she snapped a photograph that would change her life. That single image catapulted Amélie into the spotlight, but for her, the true reward was witnessing the beauty and resilience of the human spirit in the city she called home."
        }
      ]
    },
    {
      name: "Greece",
      text: "In the sun-kissed land of Greece, the story unfolds against a backdrop of myth and history. From the majestic ruins of ancient Athens to the idyllic islands of the Aegean Sea, Greece's tale is one of enduring legacy and natural beauty. Its shores have witnessed the birth of democracy and the feats of gods and heroes, leaving behind a legacy that continues to inspire. ",
      image: "https://images.pexels.com/photos/772700/pexels-photo-772700.jpeg?auto=compress&cs=tinysrgb&w=600",
      storys:[
        {
          name:"Suncrest Summer: Mia's Adventure",
          image:"https://images.pexels.com/photos/164041/pexels-photo-164041.jpeg?auto=compress&cs=tinysrgb&w=600",
          description: "In the seaside town of Suncrest, Mia embraced the magic of summer. With her bike as her companion,she explored coastal paths and picnicked with friends on sandy shores. Beneath starlit skies, they gathered around bonfires, roasting marshmallows and sharing stories. In these moments, Mia found joy in the simplicity of summer's embrace."
        },
        {
          name:"Blossoms of Spring: Sophie's Story",
          image:"https://images.pexels.com/photos/161815/santorini-oia-greece-water-161815.jpeg?auto=compress&cs=tinysrgb&w=600",
          description: "In a quiet village, Sophie eagerly awaited the arrival of spring. With the blossoming of wildflowers and the village festival in full swing, she found joy in the simple pleasures of the season dancing around the Maypole with friends, chasing butterflies in the meadows, and savoring the warmth of the sun on her face. In the heart of spring, Sophie discovered the beauty of new beginnings and the magic of being surrounded by nature's wonders."
        },
        {
          name:"Capturing Parisian Essence: The Story of Amélie",
          image:"https://images.pexels.com/photos/984888/pexels-photo-984888.jpeg?auto=compress&cs=tinysrgb&w=600",
          description: "In the heart of Paris, there was Amélie, a young waitress with a passion for photography. Roaming the city streets with her camera, she sought to capture the essence of Paris in every frame. One autumn day, she stumbled upon an elderly couple in the Jardin des Tuileries, their embrace bathed in the soft glow of the setting sun. Moved by the moment, she snapped a photograph that would change her life. That single image catapulted Amélie into the spotlight, but for her, the true reward was witnessing the beauty and resilience of the human spirit in the city she called home."
        }
      ]
    },
  ],
  users: [
    {
      email: "admin@gmail.com",
      userName: "Administrator",
      password: await hashPassword("adminPassword"),
      role: "admin",
      _id: adminId,
    },
    {
      email: "user@gmail.com",
      userName: "User",
      password: await hashPassword("userPassword"),
      role: "user",
      _id: userId,
    },
    {
      email: "randomUser@gmail.com",
      userName: "Rando",
      password: await hashPassword("123456"),
      role: "user",
      _id: "64033943a5979bc8561c257f",
    },
  ],
};

const seedDb = async () => {
  await connectToDb();
  console.log("Database connected!");

  //   We're going to delete all existing data, so that we have a fresh and
  // clean database. We can do this in two ways:
  // 1) Delete all of the existing documents in the collections that we want to seed.
  //   await Cat.deleteMany();
  //   However if we have more and more collections (in a bigger application we might
  // have more than 20), we'll have to add a line here for each individual collection
  // Instead option 2, and the preferred one in this case
  // (PLEASE NEVER RUN THIS ON PRODUCTION!)
  // 2) Drop all data.
  // Finds the db that we're currently connected to and drops it.
  await mongoose.connection.db.dropDatabase();
  console.log("All previous data dropped.");
  const dbCats = await Cat.create(
    seedingData.cats.map((cat) => ({
      ...cat,
      createdBy: userId,
      hasBeenAdopted: Math.random() > 0.2,
      storys: cat.storys.map(story => ({ // Iterate through stories and assign createdBy
        ...story,
        createdBy: userId
      }))
    }))
  );
  console.log(`Created ${dbCats.length} cats in the database!`);
  const dbUsers = await User.create(seedingData.users);
  console.log(`Created ${dbUsers.length} users in the database!`);
  await mongoose.disconnect();
  console.log("Disconnected from db. All done!");
};

seedDb();
