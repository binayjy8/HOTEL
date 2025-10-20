const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const { initializeDatabase } = require("./db/db.connection");
const Hotel = require("./model/hotel.model");
app.use(express.json());
initializeDatabase();

const cors = require("cors");

const corsOptions = {
    origin: "*",
    credentials: true
}

app.use(cors(corsOptions));
app.use(express.json());


async function createData(newHotel){
    try{
        const hotel = new Hotel(newHotel);
        const saveData = await hotel.save();
        return saveData;
    }catch(error){
        throw error;
    }
}

app.post("/hotels", async(req, res) => {
    try{
        const savedData = await createData(req.body);
        res.status(201).json({message: "Added successfully", hotel: savedData});
    }catch(error){
        res.status(500).json({message: "Failed to add"});
    }
});

const newHotels = {
  name: "Highway Inn Express",
  category: "Budget",
  location: "I-95 Service Road, Exit 42",
  rating: 3.9,
  reviews: [],
  website: null,
  phoneNumber: "+12345552002",
  checkInTime: "4:00 PM",
  checkOutTime: "11:00 AM",
  amenities: ["Free Breakfast", "Vending Machines"],
  priceRange: "$ (0-10)",
  reservationsNeeded: false,
  isParkingAvailable: true,
  isWifiAvailable: true,
  isPoolAvailable: false,
  isSpaAvailable: false,
  isRestaurantAvailable: false,
  photos: ["https://example.com/hotel3-photo1.jpg"],
};

async function newOne(newHotels){
    try{
        const newHotel = new Hotel(newHotels);
        await newHotel.save();
    }catch(error){
        throw error;
    }
}

// newOne(newHotels);

async function allHotel(){
    try{
        const get = await Hotel.find();
        return get;
    }catch(error){
        throw error;
    }
};

app.get("/hotels", async (req, res) => {
    try{
        const hotels = await allHotel();
        if(hotels.length != 0){
            res.json(hotels);
        } else {
            res.status(404).json({message: "No hotel found"});
        }
    } catch (error) {
        res.status(500).json({message: "Failed to fetch hhotels"});
    }
});

async function findByphoneNumber(){
    try{
        const name = await Hotel.findOne({phoneNumber: "+1234555890"});
        return name;
    }catch(error){
        throw error;
    }
}

app.get("/hotels/directory/:phoneNumber", async(req, res) => {
    try{
        const hotel = await findByphoneNumber(req.params.phoneNumber);
        if(hotel.length != 0){
            res.json(hotel);
        } else {
            res.status(404).status({error: "hotel not found"});
        }
    }catch(error){
         res.status(500).json({error: "Faield to fetch hotel"});
    }
});

async function hotelRating(){
    try{
        const name = await Hotel.find({rating: "3.2"});
        return name;
    }catch(error){
        throw error;
    }
}

app.get("/hotels/rating/:hotelRating", async(req, res) => {
    try{
        const data = await hotelRating(req.params.hotelRating);
        if(data.length != 0){
            res.json(data);
        } else {
            res.status(404).json({error: "Not getting data"});
        }
    }catch(error){
        res.status(500).json({message: "Faield to fetch"});
    }
});

async function restaurantCategory(hotelCategory){
    try{
        const name = await Hotel.find({category: hotelCategory});
        return name;
    }catch(error){
        throw error;
    }
}



async function range(category){
    try{
        const name = await Hotel.find({category: category});
        return name;
    }catch(error){
        throw error;
    }
};

app.get("/hotels/category/:hotelCategory", async(req, res) => {
    try{
        const data = await range(req.params.hotelCategory);
        if(data.length !== 0){
            res.json(data);
        } else {
            res.status(404).json({error: "Data not found"});
        }
    }catch(error){
        res.status(500).json({message: "Failed to fetch"});
    }
});



async function price(){
    try{
        const range = await Hotel.find({priceRange: "$$$$ (61+)"});
        console.log(range);
    }catch(error){
        throw error;
    }
}

// price();

async function rating(){
    try{
        const data = await Hotel.find({rating: 4});
        console.log(data);
    }catch(error){
        throw error;
    }
}

// rating();

async function phone(){
    try{
        const data = await Hotel.find({phoneNumber: "+1299655890"});
        console.log(data);
    }catch(error){
        throw error;
    }
}

// phone();

async function fetchingData(getId, updatedData){
    try{
        const data = await Hotel.findOneAndUpdate({name: getId}, updatedData, {new: true});
        console.log(data);
    }catch(error){
        console.log("Error getting connected");
    }
}

// fetchingData("Lake View", {checkOutTime: "11: 00PM"})

async function updateRating(byName, updatedata){
    try{
        const data = await Hotel.findOneAndUpdate({name: byName}, updatedata, {new: true});
        console.log(data);
    }catch(error){
        console.log("Error Occured");
    }
}

// updateRating("Sunset Resort", {rating: 4.2});

async function getPhone(byPhn, updatedata){
    try{
        const phn = await Hotel.findOneAndUpdate({phoneNumber: byPhn}, updatedata, {new: true});
        console.log(phn);
    }catch(error){
        console.log("Error Occured", error);
    }
}
 
// getPhone("+1234567890", {phoneNumber: "+1997687392"});

async function readHotelByName(hotelName){
    try{
        const hotel = await Hotel.findOne({name: hotelName});
        return hotel;
    }catch(error){
        throw error;
    }
}

app.get("/hotel/:name", async(req, res) => {
    try{
        const hotel = await readHotelByName(req.params.name);
        if(hotel){
            res.json(hotel);
        } else {
            res.status(404).json({error: "Hotel not found"});
        }
    } catch (error){
        res.status(500).json({error: "Faield to fetch hotel"});
    }
});

async function deleteHotel(hotelId){
    try{
        const deletedHotel = await Hotel.findByIdAndDelete(hotelId);
        return deletedHotel;
    }catch(error){
        throw error;
    }
}

app.delete("/hotel/:hotelId", async(req, res) => {
    try{
        const deHotel = await deleteHotel(req.params.hotelId);
        if(deHotel){
            res.status(200).json({message: "Movie deleted successfully"});
        }
    }catch(error){
        res.status(500).json({message: "Failed to delete hotel"});
    }
});

async function findId(hotelId, updatedValue){
    try{
        const data = await Hotel.findByIdAndUpdate(hotelId, updatedValue, {new: true});
        return data;
    }catch(error){
        throw error;
    }
}

app.post("/hotel/:hotelId", async(req, res) => {
    try{
        const value = await findId(req.params.hotelId, req.body);
        if(value){
            res.status(200).json({message: "updated successfully", value: value});
        } else {
            res.status(404).json({error: "Not found hotel"});
        }
    }catch(error){
        res.status(500).json({message: "Failed to update"});
    }
});

app.listen(PORT, () => {
    console.log("Listening to the port ",PORT);
});