const app = require("./app");
const PORT = process.env.PORT || 4000;
require("dotenv").config();



app.listen(PORT,  () =>{
    console.log(`server is running at http://localhost:${PORT}`)
})