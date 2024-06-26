import express from 'express';
import personRoutes from './routes/person.routes.js';
import personRoutesstatus from './routes/person_status.routes.js';


const app=express();

app.use(express.json());
app.use('/api',personRoutes);
app.use('/api',personRoutesstatus);


app.use((rep,res,nex)=>{
    res.status(404).json({
        Message:'Endpoint losses'
    });
});

app.listen(3001, () => {
console.log("Server running on port 3001...");
});