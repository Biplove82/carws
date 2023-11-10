const contactus=require("../Modells/ContactUSModels");
const cctus= async function(req,res){
    try {
        let data=req.body;
        let contact=await contactus.create(data);
        res.status(200).json({contact});
    } catch (error) {
        res.status(500).json(error);
    }
};

const getcontactus=async function(req,res){
    try{
       let contacts = await contactus.find().select('-_id');
       let contactsObject = {};
       contacts.forEach(contact => {
        // Assuming each contact has a unique identifier, replace 'uniqueId' with the actual identifier
        contactsObject[contact.uniqueId] = contact;
    });


       res.status(200).json({contacts: contactsObject})
      
}catch(error){
    res.status(500).json(error);
}
};

module.exports={
    cctus,getcontactus
}