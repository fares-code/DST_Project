import express from 'express';
import DBconnection from './config/db.js'
import cors  from 'cors'
import bookRoutes from './Routers/bookRoutes.js'
const
 app = express() ,
 PORT = 5000



//meddile Wares
app.use(cors());
app.use(express.json())
//DATABASE Connection
DBconnection()
// One API For ALL
app.use('/api/v1/data', bookRoutes);












app.listen(PORT,()=>{
    console.log(`Your Back End Server is running on http://localhost:${PORT}`);
    
})