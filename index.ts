import app from "./src/app.js"
import { databaseConnection } from "./src/db/connection.js"

const PORT = process.env.PORT || 5000;
  
databaseConnection()  
 .then(() => { 
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server is running 👌 on port ${PORT}`));
  })
  .catch((err) => console.log(err));      

export default app