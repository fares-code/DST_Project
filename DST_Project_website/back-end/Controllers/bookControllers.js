import { exec } from 'child_process'
import Book from '../models/Book_model.js'

export const getAllData = async(req,res)=>{
    try {
        const getData = await Book.find({}).limit(200)
     if(getData.length ===0) return res.json({message:'there is no data in database'})
     res.status(200).json({
    success:true,
    Data:getData
    })
    
    } catch (error) {
        res.status(400).json({
            error:"Ther is error while get data"
        })
    }
    }

    

    export const deleteOneBook = async (req, res) => {
      try {
        const id = req.params.id;
    
        // Validate ID
        if (!id) {
          return res.status(400).json({ message: "Error: Book ID not found" });
        }
    
        // Check if the book exists
        const book = await Book.findById(id);
        if (!book) {
          return res.status(404).json({ message: "Book not found" });
        }
   
    
        // Decrement the count
        if (book.count > 0) {
          await Book.findByIdAndUpdate(id, { $inc: { count: -1 } },{new:true});
        } else {
          return res.status(400).json({ message: "Book count is already zero" });
        }
    
        // Fetch updated data (consider paginating)
        const newData = await Book.find({}).limit(200);
    
        // Success response
        return res.status(200).json({
          message: "Book count decremented successfully",
          data: newData,
        });
      } catch (error) {
        console.error("Error while updating book:", error);
        return res.status(500).json({
          error: "There was an error while processing your request",
        });
      }
    };
    
    export const incrementBookCount = async (req, res) => {
      try {
        const id = req.params.id;
    
     
        if (!id) {
          return res.status(400).json({ message: "Error: Book ID not found" });
        }
    
      
        const book = await Book.findById(id);
        if (!book) {
          return res.status(404).json({ message: "Book not found" });
        }
    
      
        await Book.findByIdAndUpdate(id, { $inc: { count: 1 } },{new:true});
    
       
        const newData = await Book.find({}).limit(200);
    
       
        return res.status(200).json({
          message: "Book count incremented successfully",
          data: newData,
        });
      } catch (error) {
        console.error("Error while updating book count:", error);
        return res.status(500).json({
          error: "There was an error while processing your request",
        });
      }
    };












  export const getSearchedData = async (req, res) => {
    try {
      const { text } = req.body; // الحصول على النص من الطلب
      
      // التحقق من وجود النص
      if (!text) {
        return res.status(400).json({
          message: "Search text is required",
        });
      }
  
      // البحث عن البيانات
      const searchedData = await Book.find({
        $or: [
          { Book_Name: { $regex: text, $options: "i" } }, 
          { Author: { $regex: text, $options: "i" } }, 
        ],
      });
  
     
      if (searchedData.length === 0) {
        return res.status(404).json({
          message: "No matching data found",
        });
      }
  
    
      res.status(200).json({
        success: true,
        data: searchedData,
      });
    } catch (error) {
      console.error("Error while searching:", error.message);
      res.status(500).json({
        success: false,
        message: "An error occurred while searching",
        error: error.message,
      });
    }
  };
  

  
  export const predictionController = (req,res)=>{
try {
  const {rating,price,rank,revenue} = req.body
  if(!rating)return res.status(400).send({message:"Rating is required"})
  if(!price)return res.status(400).send({message:"Rating is price"})
  if(!rank)return res.status(400).send({message:"Rating is rank"})
  if(!revenue)return res.status(400).send({message:"Rating is revenue"})
    const pythonScriptPath = "C:/Users/Data/Desktop/DST_Project/back-end/ML/ML.py";
  exec(`python "${pythonScriptPath}" ${rating} ${price} ${rank} ${revenue}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`Output: ${stdout}`);
    res.status(200).json({predection:stdout})
  });
} catch (error) {
  
}






  

  }