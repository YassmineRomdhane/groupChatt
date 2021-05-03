const Members=require('../models/members.js')

module.exports = {
   
  
    getMembers: async (req, res) => {
    
      Members.findOne({roomId:req.body.roomId,userName:req.body.userName,imageUrl: req.body.imageUrl,groupName:req.body.groupName},function(err,result){
      if(err){
          console.log(err)
      }
         if(result){
           var member= Members.find({roomId:req.body.roomId},function(err,data){
                if(err){
                    console.log(err)
                }
              res.send(data)
                })
         } else {
             var obj = {
                
                 userName : req.body.userName , 
                 roomId : req.body.roomId,
                 imageUrl: req.body.imageUrl,
                 groupName:req.body.groupName
             }
            var savedMember=new Members(obj)
            savedMember.save((err,data)=>{
                var member= Members.find({roomId:req.body.roomId},function(err,d){
                    if(err){
                        console.log(err)
                    }
                  res.send(d)
                    })
            })
         }
      })
        
   
    },
 
  };