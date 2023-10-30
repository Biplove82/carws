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

const {
  userRegister,
  resbymobnum,
  login,
  sendotp,
  forgetpass,
} = require("../Controller/AuthController"); //controller
const {
  create_admin,
  allservicerequest,
  create_supervisior,
  editservice,
  deleterequest,
  approveservice,
  notapproveservice,
} = require("../Controller/AdminController");
const {
  getAllserviceAdded,
  getallsrvcDetail,
  serviceSubCategory,
  createsubact,
  createservice,
  getservice,
  cartype,
  getcartype,
} = require("../Controller/ServiceController");


const{ transactionData, getTransdetail, getunsucesspay }=require("../Controller/TransactionController");
const { create } = require("../Modells/TransactionModels");
//user api
router.post("/CreateData", CreateData); //to create DataBase
router.get("/get-user-Data/:_id", getUserData); //get user by id
router.put("/update-user/:_id", updateUser); // Edit user by id
router.post("/service-request", serviceRqst); //bd is not saving in mongdb
router.get("/get-service-request/:_id", getReqbyId); //req for service
router.delete("/Delete/:_id", Delete); //delete  user by id
router.post("/feedback", fedBack);
router.post("/complaint", compalint);

//Service api

router.get("/select-sub-category", serviceSubCategory);
router.post("/create-sub-category", createsubact);
router.post("/create-data", createservice);
router.get("/get-all-service", getservice);
router.post("/car-create",cartype);
router.get("/get-cartype",getcartype);



//supervisor api

router.post("/data", data);
router.get("/get-all-user", getalluser);
router.get("/service-request/:_id", servicerequest);
router.put("/edit-service-request/:_id", editservicerequest);
router.get("/approve-service", approve_service);

router.delete("/delete-request/:_id", delete_request);
router.put("/assigne-service/:_id", assigne_service);

//Admin Api
router.post("/create-admin", create_admin);
router.get("/all-service-request/:_id", allservicerequest);
router.post("/create-supervisior", create_supervisior);
router.put("/edit-supervisior/:_id", editservice);
router.delete("/delete-request/:_id", deleterequest);
router.get("/approve-service", approveservice);
router.get("/not-approve-service", notapproveservice);

//auth api
router.post("/user-register", userRegister);
router.post("/res-by-mobile-num", resbymobnum);
router.post("/login", login);

router.post("/sendotp", sendotp);





//transcation api
// router.post("create-trans", transactionData);
router.post("/createTrans", transactionData );
router.get("/get-sucessfuly-payment",getTransdetail);
router.get("/get-unsucessful-payment",getunsucesspay)
module.exports = router;
