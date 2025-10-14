const mongoose = require("mongoose");

const newHotel = new mongoose.Schema({
    name: {
        type: String,
    },
    category: {
        type: String,
    },
    location: {
        type: String,
    },
    rating: {
        type: Number,
    },
    reviews: {
        type: [String],
    },
    website: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    checkInTime: {
        type: String,
    },
    checkOutTime: {
        type: String,
    },
    amenities: {
        type: [String],
    },
    priceRange: {
        type: String,
    },
    reservationsNeeded: {
        type: Boolean,
        default: true,
    },
    isParkingAvailable: {
        type: Boolean,
        default: false,
    },
    isWifiAvailable: {
        type: Boolean,
        default: true,
    },
    isPoolAvailable: {
        type: Boolean,
        default: false,
    },
    isSpaAvailable: {
        type: Boolean,
        default: false,
    },
    isRestaurantAvailable: {
        type: Boolean,
        default: false,
    },
    photos: {
        type: [String],
    },
});

const Hotel = mongoose.model("Hotel", newHotel);

module.exports = Hotel;