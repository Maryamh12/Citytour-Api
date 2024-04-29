import { connectToDb } from "./db.js";
import Cat from "../models/cat.js";
import User from "../models/user.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";


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
          name:"Blossoms Over Tehran: Shirin's New Day",
          image:"https://images.pexels.com/photos/8177153/pexels-photo-8177153.jpeg?auto=compress&cs=tinysrgb&w=600",
          description: "In the bustling metropolis of Tehran, spring breathes new life into the city's heart as Nowruz approaches. Shirin awakens to streets adorned with the delicate pink of cherry blossoms. With each petal that flutters to the ground, she feels a renewed sense of hope. Her days are filled with arranging vibrant bouquets, symbolizing the fresh start for the city she adores. In the embrace of spring, Shirin discovers the sweet scent of possibility."
        },
        {
          name:"Melodies of Mehr: Farhad's Sunset Symphony",
          image:"https://media.istockphoto.com/id/1304068159/photo/city-of-tehran.jpg?s=612x612&w=0&k=20&c=2XVHhbA3c0B7phRa1tN4wzrNCSxWY2cXL16D-GU-s_g=",
          description: "The summer in Tehran is a symphony of sights and sounds, and Farhad, with his beloved setar, becomes its conductor. As the city pulses with the heat of the day, it's the cooler, amber evenings that bring people to the rooftops under a sky streaked with the day's last light. With every note he plays, Farhad weaves a melody that tells the story of summer—a narrative of warmth, camaraderie, and the quiet hum of the city under the stars."
        },
        {
          name:"Autumn Whispers: Amir and Reza's Timeless Trail",
          image:"https://images.pexels.com/photos/6348998/pexels-photo-6348998.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          description: "The city of Tehran, cloaked in the golden hues of fall, sets the scene for Amir and Reza's reflective strolls through the rustling leaves of Laleh Park. Each step on the carpet of amber is a memory revisited, a tale retold. Autumn's gentle whisper carries their voices through the trees, a reminder of the fleeting nature of time. In the cool embrace of fall, the two friends find comfort in the shared silence and the laughter that echoes with the stories of a city draped in autumn's golden veil."
        }
      ]
    },
    {
      name: "New York",
      text: "In the bustling metropolis of New York City, the narrative is one of relentless ambition and unparalleled diversity. From the towering skyscrapers of Manhattan to the vibrant neighborhoods of Brooklyn, New York's story is a tapestry woven with countless threads of culture, commerce, and creativity.",
      image: "https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=600",
      storys:[
        {
          name:"Blossoming Beginnings: Noelle's Spring in Central Park",
          image:"https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=600",
          description: "As winter's chill receded, Noelle witnessed New York's Central Park erupt in a symphony of colors. Tulips stood tall in vibrant rows, and cherry blossoms painted the sky in shades of blush. With her sketchbook under arm, Noelle traced the pathways of the park, each stroke capturing the essence of spring's renewal. The laughter of children and the distant hum of the city created a backdrop to her days. Here, in the heart of Manhattan, Noelle found inspiration in the rebirth that only spring could bestow."
        },
        {
          name:"Summertime Serenade: Leo's Highline Rhapsody",
          image:"https://images.pexels.com/photos/771881/pexels-photo-771881.jpeg?auto=compress&cs=tinysrgb&w=600",
          description: "The Highline, New York's ribbon of greenery, was alive with the pulse of summer. Leo wandered this elevated park, where wildflowers grew with abandon amidst remnants of rail tracks. With the sun kissing his skin, he discovered murals and street art that turned the cityscape into a vibrant gallery. As the sun set, casting a golden glow over the Hudson, Leo joined friends at open-air eateries, their laughter mingling with the city's nocturnal soundtrack. In these moments, he found the essence of New York's summer—a masterpiece in motion."
        },
        {
          name:"Autumn in the Boroughs: Ayesha's Mosaic of Colors",
          image:"https://images.pexels.com/photos/1402790/pexels-photo-1402790.jpeg?auto=compress&cs=tinysrgb&w=600",
          description: "When autumn whispered through New York, it painted each borough with a palette of fiery hues. Ayesha wrapped herself in a cozy scarf and set out to capture the transformation. From the Bronx's botanical gardens to Brooklyn's brownstone-lined streets, she marveled at the mosaic of fallen leaves. At Queens' bustling markets, scents of cinnamon and pumpkin filled the air. Staten Island's forests became wonderlands of gold, a hidden retreat from the city's pace. For Ayesha, autumn in New York was a tapestry woven from the city's diverse threads—a rich melange of traditions, cultures, and stories."
        }
      ]
    },
    {
      name: "Beijing",
      text: "City steeped in ancient tradition yet propelled forward by modern ambition. From the majestic Forbidden City to the iconic Great Wall, Beijing's story is one of imperial splendor and enduring resilience. Its streets buzz with the energy of millions, a testament to China's rapid urbanization and economic growth.",
      image: "https://media.istockphoto.com/id/491990549/photo/ancient-chinese-architecture.jpg?b=1&s=612x612&w=0&k=20&c=2RJ-NSo26jLRUjCfbQwvBInKJyjzBaKIuYmSztAHjL4=",
      storys:[
        {
          name:"Spring's Embrace: Ling's Renewal in the Forbidden City",
          image:"https://images.pexels.com/photos/19872/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
          description: "Ling wandered the vast courtyards of the Forbidden City, her steps echoing through halls that whispered of ancient times. Spring had dressed Beijing in emerald elegance, with plum blossoms waltzing in the breeze like delicate pink snowflakes. The city buzzed softly, a gentle drone beneath the song of returning swallows. Amid the timeless majesty, Ling found herself part of Beijing's perpetual bloom, a cycle of rebirth and storytelling that spanned millennia."
        },
        {
          name:"Summer in the Hutongs: Jian's Voyage Through Time",
          image:"https://images.pexels.com/photos/2846075/pexels-photo-2846075.jpeg?auto=compress&cs=tinysrgb&w=600",
          description: "The narrow alleys of Beijing's hutongs brimmed with life as summer's breath warmed the city's ancient bones. Jian navigated these veins of history on his rickety bicycle, each turn revealing a vignette of daily life against a backdrop of red lanterns and stone lions. In the sweltering afternoons, he sought refuge under the willows by the lakeside, sipping iced jasmine tea, the city's pulse thrumming in sync with the buzz of dragonflies. For Jian, Beijing's summer was an intricate dance of shadows and light, history interwoven with the vibrancy of now."
        },
        {
          name:"Autumn at the Temple of Heaven: Mei's Melodic Farewell",
          image:"https://images.pexels.com/photos/2845965/pexels-photo-2845965.jpeg?auto=compress&cs=tinysrgb&w=600",
          description: "As autumn crowned Beijing in gold and auburn, Mei tread softly upon the Temple of Heaven's sacred grounds. The crisp air carried the scent of pine and fallen leaves, a natural incense for the season's quiet reverence. She watched as tai chi practitioners moved with graceful precision, their silhouettes framed by the golden hues of ginkgo trees. Mei's heart swelled with the beauty of impermanence, each fallen leaf a note in the city's farewell to the warmth, and an embrace of the coming winter's hush."
        }
      ]
    },
    {
      name: "Greece",
      text: "In the sun-kissed land of Greece, the story unfolds against a backdrop of myth and history. From the majestic ruins of ancient Athens to the idyllic islands of the Aegean Sea, Greece's tale is one of enduring legacy and natural beauty. Its shores have witnessed the birth of democracy and the feats of gods and heroes, leaving behind a legacy that continues to inspire. ",
      image: "https://images.pexels.com/photos/772700/pexels-photo-772700.jpeg?auto=compress&cs=tinysrgb&w=600",
      storys:[
        {
          name:"Spring's Whisper: Elena's Journey Through the Olive Groves",
          image:"https://images.pexels.com/photos/164041/pexels-photo-164041.jpeg?auto=compress&cs=tinysrgb&w=600",
          description: "As the Grecian spring emerged, Elena found solace among the ancient olive groves that dotted the countryside, their silver leaves shimmering against the azure skies. The gentle hum of the Aegean Sea blended with the melodies of songbirds, and the earth itself seemed to awaken. Walking the stone paths of her ancestors, Elena felt the pulse of new life as wildflowers embroidered the land in a tapestry of color. It was a time of hope and renewal, a testament to the enduring spirit of Greece."
        },
        {
          name:"Summer Odyssey: Nikos' Voyage Across the Isles",
          image:"https://images.pexels.com/photos/161815/santorini-oia-greece-water-161815.jpeg?auto=compress&cs=tinysrgb&w=600",
          description: "The Greek summer sun dipped the world in a golden light, and Nikos set sail across the wine-dark sea. Island hopping from the white-washed houses of Santorini to the rugged shores of Crete, he embraced the wind's freedom. Each port told a tale of myth and history, where the gods themselves once played. At dusk, he joined the locals in a dance, their feet beating a rhythm into the earth as the night welcomed a canopy of stars. It was in these fleeting moments that Nikos discovered the true essence of summertime in Greece."
        },
        {
          name:"Autumn's Lament: Katerina's Reflection in Thessaloniki",
          image:"https://images.pexels.com/photos/984888/pexels-photo-984888.jpeg?auto=compress&cs=tinysrgb&w=600",
          description: "Autumn draped Thessaloniki in hues of rust and gold, the setting sun casting long shadows through the city's Byzantine walls. Katerina roamed the cobblestone streets, her thoughts adrift like the leaves that danced in the cool breeze off the Thermaic Gulf. She found beauty in the melancholy of the season, each day shorter than the last, each night a deeper blue. In cafes that spilled with laughter and the clinking of coffee cups, she pondered the stories hidden within the aged stone and sea, stories that unfolded as the city readied itself for the winter stillness."
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

 
  await mongoose.connection.db.dropDatabase();
  console.log("All previous data dropped.");
  const dbCats = await Cat.create(
    seedingData.cats.map((cat) => ({
      ...cat,
      createdBy: userId,
      hasBeenAdopted: Math.random() > 0.2,
      storys: cat.storys.map(story => ({ 
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
