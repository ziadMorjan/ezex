const path = require("path")
const fs = require("fs")
exports.server=async(projectDir,db)=>{
    const txt=
`require('dotenv').config();
const {app} = require('./app');

const port = process.env.PORT || 3000;
const environment =process.env.NODE_ENV || 'development'
${db ?
`dbconnect()

.then(()=>{
    app.listen(port,() => console.log("🚀 Server running on port "+port))
    console.log("Environment: "+environment);
})
    
`
:
`app.listen(port, () => {
    console.log("Environment: "+environment);
    console.log("🚀 Server running on port "+port);
});
`
}
`
fs.writeFileSync(path.join(projectDir,"server.js"),txt)
}