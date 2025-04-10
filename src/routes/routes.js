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
  getfedback,
} = require("../Controller/UserController");

const {
  data,
  getalluser,
  servicerequest,
  editservicerequest,
  approve_service,
  delete_request,
  assigne_service,
  getsinglesupervisorbyid,
} = require("../Controller/SupervisiorController");

const {
  userRegister,
  resbymobnum,
  login,
  sendotp,
  forgetpasswprd,
  resetpass,
  resendOtp,
  getlogindata,
} = require("../Controller/AuthController"); //controller
const {
  create_admin,
  allservicerequest,
  create_supervisior,
  editservice,
  deleterequest,
  approveservice,
  notapproveservice,
  getsupevisior,
} = require("../Controller/AdminController");
const {
  serviceSubCategory,
  createsubact,
  createservice,
  getservice,
  cartype,
  getcartype,
} = require("../Controller/ServiceController");

const {
  transactionData,
  getTransdetail,
  getunsucesspay,
  getTrans,
  countsucessfulypay,

} = require("../Controller/TransactionController");



const { } = require("../Modells/TransactionModels");

const { cctus, getcontactus } = require("../Controller/ContactUsController");


const { } = require("../Modells/ServiceplanModells");


const { serviceplan, getserviceplan, getmemeberpaln } = require("../Controller/ServicetypeController");
const { uploadFile, getFile } = require("../Controller/uploads");




//user api
router.post("/CreateData", CreateData); //to create DataBase
router.get("/get-user-Data/:_id", getUserData); //get user by id
router.put("/update-user/:_id", updateUser); // Edit user by id
router.post("/service-request", serviceRqst);
router.get("/get-service-request/:_id", getReqbyId); //req for service
router.delete("/Delete/:_id", Delete); //delete  user by id
router.post("/feedback", fedBack);
router.post("/complaint", compalint);
router.get("/get-feedback", getfedback);



//Service api
router.get("/select-sub-category", serviceSubCategory); // not define
router.post("/create-sub-category", createsubact);
router.post("/create-data", createservice);
router.get("/get-all-service", getservice);
router.post("/car-create", cartype);
router.get("/get-cartype", getcartype);




//supervisor api
router.post("/data", data);
router.get("/get-all-user", getalluser);
router.get("/service-request/:_id", servicerequest);
router.put("/edit-service-request/:_id", editservicerequest);
router.get("/approve-service", approve_service);
router.get("/get-all-pay/:_id", getTrans);
router.get("/get-supervisior-byid/:_id", getsinglesupervisorbyid);
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
router.get("/get-all-supervisior", getsupevisior);



//auth api
router.post("/user-register", userRegister);
router.post("/res-by-mobile-num", resbymobnum);
router.post("/login", login);
router.post("/send-otp", sendotp);
router.post("/forget-password", forgetpasswprd);
router.post("/reset-password", resetpass);
router.post("/resend-otp", resendOtp)
router.get("/get-login-data/:_id", getlogindata);




//transcation api
router.post("/createTrans", transactionData);
router.get("/get-sucessfuly-payment", getTransdetail);
router.get("/get-unsucessful-payment", getunsucesspay);
router.get("/count", countsucessfulypay);



//conctasus api
router.post("/create-contactus", cctus);
router.get("/get-contactsus", getcontactus);



//serviceplan
router.post("/create-service-plan", serviceplan);
router.get("/get-service-plan", getserviceplan);
router.get("/get-membership-paln", getmemeberpaln);



router.post("/upload", uploadFile);
router.get("/file/:filename", getFile);


module.exports = router;