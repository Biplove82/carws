var router = require("express").Router();

const {
  CreateData,
  updateUser,
  serviceRqst,
  getReqbyId,
  Delete,
  getUserData,
  fedBack,
  compalint,
} = require("../Controller/UserController");

const {
  data,
  getalluser,
  servicerequest,
  editservicerequest,
  approve_service,
  not_approved_service,
  delete_request,
  assigne_service,
} = require("../Controller/SupervisiorController");

const { userRegister, resbymobnum, login, sendotp } = require("../Controller/AuthController"); //controller
const { create_admin, allservicerequest, create_supervisior, editservice, deleterequest, approveservice, notapproveservice } = require("../Controller/AdminController");

//user api
router.post("/CreateData", CreateData); //to create DataBase
router.get("/getUserData/:_id", getUserData); //get user by id
router.put("/updateUser/:_id", updateUser); // Edit user by id
router.post("/serviceRqst", serviceRqst); //bd is not saving in mongdb
router.get("/getReqbyId/:_id", getReqbyId); //req for service
router.delete("/Delete/:_id", Delete); //delete  user by id
router.post("/fedBack", fedBack);
router.post("/compalint", compalint);

//supervisor api

router.post("/data", data);
router.get("/getalluser", getalluser);
router.get("/servicerequest/:_id", servicerequest);
router.put("/editservicerequest/:_id", editservicerequest);
router.get("/approve_service", approve_service);
router.get("/not_approved_service", not_approved_service);
router.delete("/delete_request/:_id", delete_request);
router.put("/assigne_service/:_id", assigne_service);


//Admin Api
router.post("/create_admin",create_admin);
router.get("/allservicerequest/:_id",allservicerequest);
router.post("/create_supervisior",create_supervisior);
router.put("/editservice/:_id",editservice);
router.delete("/deleterequest/:_id",deleterequest);
router.get("/approveservice",approveservice);
router.get("/notapproveservice",notapproveservice);
//auth api



router.post("/userRegister", userRegister);
router.post("/resbymobnum", resbymobnum);
router.post("/login",login);
//router.post("/sendotp",sendotp)
router.post("/sendotp",sendotp);
// router.post("/userregister",userregister);

module.exports = router;
