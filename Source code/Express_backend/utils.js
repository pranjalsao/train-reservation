function createResult(error,data){
    const result={}

    if(error){
        result['status']='error'
        result['error']=error
    }else{
        if(data.length==0){
        result['status']='error'
        result['data']=data
        }
        else{
            result['status']='success'
            result['data']=data
        }
       
    }

    return result
}

module.exports={
    createResult,
}