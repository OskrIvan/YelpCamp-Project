const mongoose = require('mongoose');
const cities = require('./cities');
const axios = require('axios');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const { campgroundImages } = require('./images');

main().catch(err => console.log(err));

async function main() {
    mongoose.set('strictQuery', true);
    await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
};

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

// to feed the image with random images from my unsplash collection.
// this has been replaced with the database from claudinary. 
// async function seedImg() {
//     try {
//         const resp = await axios.get('https://api.unsplash.com/photos/random', {
//             params: {
//                 client_id: 'WwM9acbG_Ngdi8FNbNFw67hdY9chvaeA-pRZc6pMAqI',
//                 collections: '483251',
//             },
//         })
//         return resp.data.urls.small
//     } catch (err) {
//         console.error(err)
//     }
// };


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1003 = Math.floor(Math.random() * 1003);
        const randomImage1 = Math.floor(Math.random() * 50);
        const randomImage2 = Math.floor(Math.random() * 50);
        const randomImage3 = Math.floor(Math.random() * 50);
        const randomImage4 = Math.floor(Math.random() * 50);
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            author: '643dbc0edfbee222f4612c8d',
            location: `${cities[random1003].city}, ${cities[random1003].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Beautiful place to camp',
            price, 
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1003].longitude,
                    cities[random1003].latitude,
                ]
            },
            images: [
                {
                    url: `${images[randomImage1].url}`,
                    filename: `${images[randomImage1].filename}`,
                },
                {
                    url: `${images[randomImage2].url}`,
                    filename: `${images[randomImage2].filename}`,
                },
                {
                    url: `${images[randomImage3].url}`,
                    filename: `${images[randomImage3].filename}`,
                },
                {
                    url: `${images[randomImage4].url}`,
                    filename: `${images[randomImage4].filename}`,
                }
            ]
        })
        await camp.save();
    }
}



seedDB().then(() => {
    mongoose.connection.close();
})
