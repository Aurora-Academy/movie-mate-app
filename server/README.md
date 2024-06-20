# express

1. npm init -y
2. npm i express --save
3. create .gitignore file > Add node_modules folder
4. create index.js file
5. update the script as "dev": "node index.js" in the package.json
6. in index.js,
   const express = require('express');
   const app =express();

   app.get("/",(req,res)=>{
   res.json({msg: "hello world"})
   })

   app.listen(8000, ()=>{
   console.log("App is running")
   })

7. npm i --save-dev nodemon

8. In package.json, scripts:{
   "dev": "nodemon index.js",
   "start": "node index.js"
   }

9. npm run dev

10. npm i --save dotenv

11. in index.js, require("dotenv").config()

12. create .env file

13. Add PORT=8000 in .env file

14. In index.js, replace
    const PORT=8000 => const PORT=Number(process.env.PORT)

15. Add .env file in gitignore file

// Typical Application

1. Application run
2. Environment Variables
3. Api versioning
4. Error handling
5. Utils
6. Services (gmail, google recaptcha)
7. Validation
8. logging
9. Static Files
10. File upload
11. data base connection

// Advanced Concept

1. Aggregation
2. Pagination
3. Rate Limiting
4. Advanced Logging (mid level developer)

metronir.com/pdf/sinhas-vol27-no1-book-review-niranjan-kunwar.pdf
