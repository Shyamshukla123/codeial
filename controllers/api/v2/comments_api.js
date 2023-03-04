module.exports.index= (req,res)=>{
    return res.json(200,{
        message:"List of Comments V2",
        comments:[],
    })
}