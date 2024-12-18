import express from 'express'
import {getAllData,deleteOneBook,getSearchedData,incrementBookCount,predictionController} from '../Controllers/bookControllers.js'
const router = express.Router()


//Get Methods
router.get('/get-data',getAllData);

//get search data
router.post('/get-search-data',getSearchedData)
router.post('/add-one/:id',incrementBookCount)
router.post("/post-to-ml",predictionController)
//Post Methods
//Update Methods
//Delete Methods
router.delete('/delete-one/:id',deleteOneBook)


export default router

