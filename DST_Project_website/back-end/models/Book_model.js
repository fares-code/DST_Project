import mongoose from 'mongoose';


const bookSchema = new mongoose.Schema({
  __EMPTY: {
    type: Number,
    required: true,
  },
  Publishing_Year: {
    type: Number,
    required: true,
  },
  Book_Name: {
    type: String,
    required: true,
  },
  Author: {
    type: String,
    required: true,
  },
  Language_Code: {
    type: String,
    required: true,
  },
  Author_Rating: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'], // لتحديد تصنيف المؤلف
    required: true,
  },
  Book_Average_Rating: {
    type: Number,
    required: true,
  },
  Book_Ratings_Count: {
    type: Number,
    required: true,
  },
  Genre: {
    type: String,
    required: true,
  },
  Gross_Sales: {
    type: Number,
    required: true,
  },
  Publisher_Revenue: {
    type: Number,
    required: true,
  },
  Sale_Price: {
    type: Number,
    required: true,
  },
  Sale_Rank: {
    type: Number,
    required: true,
  },
  Publisher: {
    type: String,
    required: true,
  },
  Units_Sold: {
    type: Number,
    required: true,
  },
  count:{
    type:Number
  }
});


const Book = mongoose.model('book', bookSchema);

export default Book;
