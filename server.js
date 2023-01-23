const http = require('http')

const todos =[{id:1,text:'Todo one'},
              {id:2,text:'Todo two'},
              {id:3,text:'Todo three'}]

const server = http.createServer((req,res)=>{

    const {url,method} = req

    let body=[]

    req.on('data',chunk=>{
        body.push(chunk);
    }).on('end',()=>{
        body=Buffer.concat(body).toString()
        let status =404;
        const response ={
            success:false,
            data:null
        }
        if(method === 'GET' && url === '/todos'){
            status =200,
            response.success = true,
            response.data = todos 
        }else if(method=== 'POST' && url==='/todos'){
            let parsedBody  = JSON.parse(body);
             const {id,text} = parsedBody

            if(id && text){
                todos.push({id,text})
                status =201,
                response.success = true,
                response.data = todos 
            }else{
                status =400,
                response.success = false,
                response.error = "Please provide value of id and text",
                response.data = null
            }
            
        }
        res.writeHead(status,{
            'Content-Type':'application/json',
            'X-Powered-By':'Node JS',
        })
        res.end(JSON.stringify({
            success:response.success,
            data:response.data
        }))
    })
    

    
})

const PORT = 5000;

server.listen(PORT,()=>console.log(`Server Running on port ${PORT}`))
