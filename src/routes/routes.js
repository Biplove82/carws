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
} = require("../Controller/SupervisiorController");

const { userRegister, resbymobnum } = require("../Controller/AuthController"); //controller

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
router.get("/approve_service",approve_service);

//auth api

router.post("/userRegister", userRegister);
router.post("/resbymobnum", resbymobnum);

module.exports = router;
