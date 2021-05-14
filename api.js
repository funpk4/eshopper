const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const sha2=require('sha256');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//connecting mongodb 
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://eShopper:82949158Pk@api.zn02q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority/eShopper', {
  dbName: 'eShopper',
  user: 'eShopper',
  pass: '82949158Pk',
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
  console.log("Connect to Mongodb")
});
let categorymodal = require('./db/category');
let usermodal = require('./db/register');
const { ObjectId } = require('bson');
const date=require('date-and-time');
// let adminmodel=require('./db/adminlogin');
// let signinmodel=require('./db/adminlogin');
// let emailmodel=require('./db/emailapp');
// let emailappmodel=require('./db/emailapp');
// let emailpost=require('./db/emailpost');
let postModal=require('./db/post');

// api

// app.post('/api/adminlogin',(req,res)=>
// {   
//     let fname=req.body.fname;
//     let username=req.body.username;
//     let email=req.body.email;
//     let state=req.body.state;
//     let add=req.body.add;
//     let pass=req.body.pass;


//   let ins=new adminmodel({'fname':fname, 'username':username,'email':null, 'state':state, 'add':add,'pass':pass});
//    ins.save(err=>
//        {
//         if(err){
//             console.log('error')
//           }
//           else
//           {
//             console.log('success')
//           }
//        })

// })
// app.post('/api/signin',(req,res)=>
// {   
//     let email=req.body.email;
//     let pass=req.body.pass;
// signinmodel.findOne({'email':email,'pass':pass},(err,data)=>
// {
//     if(err){}
//     else if (data==null)
//     {
//       console.log('Email Or Password Not Correct')
//     }
//     else{
//       console.log('Login Successfully')
//     }
//   })
// })
// app.post('/api/emailapp',(req,res)=>
// {   
//     let email=req.body.email;
//     let ins=new emailmodel({'email':email});
//     ins.save(err=>
//         {
//          if(err){
//              console.log('error')
//            }
//            else
//            {
//              console.log('success')
//            }
//         })
// })
// app.get("/api/emailapp",(req,res)=>
// {
//       emailappmodel.find({}, (err, data) => {
//         if (err) {} else {
//           res.json({
//             err: 0,
//             fedata: data
//           });
//         }
//       });
// })
// app.get("/api/admindata",(req,res)=>
// {
//       adminmodel.find({}, (err, data) => {
//         if (err) {} else {
//           res.json({
//             err: 0,
//             fedata: data
//           });
//         }
//       });
// })


app.get("/api/fatchcat", (req, res) => {
  categorymodal.find({}, (err, data) => {
    if (err) { } else {
      res.json({
        err: 0,
        data: data
      });
    }
  });
})
// app.get("/api/fetchcategory/:cid?",(req,res)=>
// {
//   let cid=req.params.cid;
//   if(cid)
//   {
//     categorymodal.findOne({_id:cid},(err,data)=>
//     {
//       if(err)
//       {
//         console.log('went wrong');
//       }
//       else
//       {
//         res.json({'err':0,'cdata':data})
//       }
//     })
//   }
// //   else
// //   {
// //   catModel.find({},(err,data)=>
// //   {
// //     if(err){}
// //     else
// //     {
// //       res.json({'err':0,'cdata':data});
// //     }
// //   })
// // }
// })
app.get("/api/delcat/:id", (req, res) => {
  let id = req.params.id
  categorymodal.deleteOne({ _id: id }, (err) => {
    console.log(id)
    if (err) {
      console.log('not')
    }
    else {
      res.json({ 'err': 0, 'msg': 'Category Deleted' })
    }
  })
})
app.post("/api/editcat", (req, res) => {
  let category = req.body.category
  let id = req.body.id;
  categorymodal.updateOne({ _id: id }, { $set: { category: category } }, (err) => {
    if (err) {
      res.json({
        'err': 1,
        'msg': 'Already'
      })
    }
    else {
      res.json({
        'err': 0,
        'msg': 'Category Updated'
      })
    }
  })
})
app.post("/api/editsubcat", (req, res) => {
  let subcategory = req.body.subcategory;
  let id = req.body.id;
  let sid = subcategory.sid;
  console.log(sid)
  console.log(subcategory.subcategory)
  console.log(id)


  //   categorymodal.findOneAndUpdate({_id:id},{$set:{'subcategory':subcategory}}, (err) => {
  //     if (err) {
  //       res.json({
  //         'err': 1,
  //         'msg': 'Already'
  //       })
  //     }
  //     else {
  //       res.json({
  //         'err': 0,
  //         'msg': 'Category Updated'
  //       })
  //     }
  //   })
  // })
  let ins = new categorymodal([{ 'subcategory': subcategory }]);
  ins.save(err => {
    if (err) {
      console.log('error')
    }
    else {
      console.log('success')
    }
  })
})

app.post("/api/suspendCat", (req, res) => {
  let status = req.body.status;
  let id = req.body.id;
  console.log(id)
  categorymodal.updateOne({ _id: id }, { $set: { status: status } }, (err) => {
    if (err) { }
    else {
      res.json({ 'err': 0, 'msg': 'Category Updated' })
    }
  })
})
app.get('/api/fatchcatbyid/:id', (req, res) => {

  let id = req.params.id;
  categorymodal.findOne({ _id: id }, (err, data) => {
    if (err) {
      console.log('went wrong');
    }
    else {
      res.json({ 'err': 0, 'data': data })
    }
  })
})
app.post('/api/category', (req, res) => {
  let id = req.params.id;
  console.log(this.id)
  let category = req.body.category;
  let status = req.body.status;
  let ins = new categorymodal({ 'category': category, 'status': status });
  ins.save(err => {
    if (err) {
      console.log('error')
    }
    else {
      console.log('success')
    }
  })

  categorymodal.find({}, (err, data) => {
    if (err) { } else {
      res.json({
        err: 0,
        data: data
      });
    }
  });
})
app.post('/api/register', (req, res) => {
  let fname = req.body.fname;
  let lname = req.body.lname;
  let phone = req.body.phone;
  let email = req.body.email;
  let password =sha2(req.body.password);
  let gender = req.body.gender;
  let age = req.body.age;

  // let status='0'
  let ins = new usermodal({ name: { 'fname': fname, 'lname': lname }, 'phone': phone, 'age':age, 'email': email, 'password': password, 'gender': gender });
  ins.save(err => {
    if (err) {
      console.log('error');
    }
    else {
      console.log('success');

    }
  })
})
app.post("/api/profile", (req, res) => {
  let fname = req.body.fname;
  let lname = req.body.lname;
  let phone = req.body.phone;
  let age = req.body.age;
  let id = req.body.id;
  usermodal.updateOne({ _id: id }, { $set: { name: {fname:fname, lname:lname},phone:phone, age:age } }, (err) => {
    if (err) {
      res.json({
        'err': 1,
        'msg': 'Already'
      })
    }
    else {

      res.json({
        'err': 0,
        'msg': 'Updated'
      })
    }
  })
})
app.post('/api/login', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let uid=req.params.email;
  console.log(uid)
  usermodal.findOne({ 'email': email, 'password': password }, (err, data) => {
    if (err) { }
    else if (data == null) {
      res.json({ 'err': 1, 'msg': 'Email Or Password Not Correct' })
    }
    else {
      res.json({ 'err': 0, 'msg': 'Login Successful', 'uid': email });
    }
  })
})
app.get('/api/fatchuser/:uid', (req, res) => {

  let uid = req.params.uid;
  usermodal.findOne({ email: uid},{name:1, phone:1, email:1, gender:1, lastlogin_at:1}, (err, data) => {
    if (err) {
      console.log('went wrong');
    }
    else {
      res.json({ 'err': 0, 'data': data })

    }
  })
})

app.listen(8899, () => {

  console.log("project work on 8899")
})