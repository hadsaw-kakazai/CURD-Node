// console.log(module)
//modules
//1. built-in modules // the one which we get with node like fs path http
//2. custom modules // the one we will create
//3. third party modules // which we install using npm express , mongoose


//importing bult-in modules -> FS module
// const fs = require('fs')

// // console.log(fs)


// fs.writeFileSync("test.txt", "Hello World");

// const data = fs.readFileSync('test.txt')
// console.log(data)
// console.log(data.toString())

///////////////////////////////////////////////////////

//importing bult-in modules -> query string module

// const queryString = require("querystring")
// const obj = {
//     name : "hadsaw",
//     age : 23
// }

// console.log("orignal object " + JSON.stringify(obj))
// const str = queryString.stringify(obj)
// console.log("object with query string " + str)
// const res = queryString.parse(str)
// console.log("object with query string parse " + JSON.stringify(res))

//////////////////////////////////////////////////////////////////

//importing bult-in modules -> path module
//  const path = require('path')

//  const pathObject = path.parse(__filename)
//  console.log(pathObject.dir)//return object which contain
// // {
// //   root: '/',
// //   dir: '/home/hadsaw/Documents/Node practice',
// //   base: 'index.js',
// //   ext: '.js',
// //   name: 'index'
// // }

// const str = ["hadsaw","kakazai"]
// const pathObject1 = path.join(__dirname,"api",str[0],str[1])
// console.log(pathObject1)

//////////////////////////////////////////////////////////////

//importing bult-in modules -> process module

// const process = require("process");

// console.log(process.pid);
// console.log(process.versions.node);
// console.log(process.argv);

// const num = process.argv[2];
// console.log(typeof num)
// switch (num) {
//   case "1":
//     console.log("One");
//     break;
//   case "2":
//     console.log("Two");
// }

// process.kill(process.pid);

/////////////////////////////////////////////////////////////

// const child_process = require("child_process");
// const res = child_process.spawn("notepad", ["processMod.js"]);

/////////////////////////////////////////////////////////////

//HTTP module in node
// const http = require('http')
// const fs = require('fs')
// const path = require('path')


// const server = http.createServer((req,res)=>{
//   console.log(req.url)
//   switch(req.url){
//     case '/':
//       sendResponse(res,"Home.html")
//       break;

//       case '/about':
//         res.write("About Page")
//         break;
  
        
//   }
//   res.end()
// })

// function sendResponse(response, filename){
//   const joinedPath = path.join(__dirname,filename)
//   const data = fs.readFileSync(joinedPath).toString()
//   response.end(data)
// }

// server.listen(3000,()=>{
//   console.log("server runing...")
// })


// working with express

const express = require('express')
const app = express()
const path = require("path")
const methodOverride = require("method-override")
app.use(methodOverride('_method'));
app.use(express.json());
// const bodyParser = require('body-parser')

//import mongoose
const mongoose = require('mongoose')
const product = require('./model/product')

mongoose.connect("mongodb://127.0.0.1:27017/products")
//connection created


app.set("view engine","ejs")
// app.use(bodyParser.urlencoded({extended:true})) now we use express.urlencoded
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
  res.render('Home',{title:"Hadsaw"})
})

app.get("/student", (req, res) => {
  res.json({ name: "John", age: 23, city: "New York" });
});

app.get('/addproducts',(req,res)=>{
  res.render('addproducts',{title:"Hadsaw"})
})


//adding product
app.post('/addproducts',(req,res)=>{
  console.log(req.body)
  const newProduct = new product(req.body)
  newProduct.save().then(()=>{
    res.redirect('/products');
  }).catch(()=>{
    console.log(err)
  })
  
  
})


//reading product
app.get("/products", async (req, res) => {
  const products = await product.find()
  res.render("products",{title:"products lists",products:products});
});
app.listen(3002,()=>{
  console.log("server running")
})


// Deleting product
// app.delete('/products/:id', async (req, res) => {
//   console.log("in delete method");
//   try {
//     const productId = req.params.id;
//     await product.findByIdAndRemove(productId);
//     console.log(productId);
//     res.redirect('/products');
//   } catch (error) {
//     console.log(error);
//   }
// });

app.delete('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    await product.findByIdAndRemove(productId);
    res.redirect('/products');
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});
// const productRouter = require("./routes/productroutes")
// app.use("/",productRouter)