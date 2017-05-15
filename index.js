const nodemailer = require('nodemailer');

module.exports = function(app, config, baseDir){
    if(!config){
        console.log("缺少email配置");
        return
    }
    if(!config.auth || !config.auth.user){
        console.log("email配置中缺少授权账号信息");
        return
    }
	const transporter = nodemailer.createTransport(config);

	return async(ctx, next) => {
        ctx.mail = mailOptions => {
            mailOptions.from = config.auth.user
            return new Promise((resolve, reject)=> {
                transporter.sendMail(mailOptions, function(error, info){
                    if(error){
                        reject({
                            isError : true,
                            message : error
                        }) 
                    }
                    resolve({
                        isError : false,
                        message : 'Message sent: ' + (info && info.response)?info.response:JSON.stringify(info)
                    })
                });
            })
        }
        // TODO
        // ctx.mailTemplate = () => {

        // }
		await next()
	}
}

// setup e-mail data with unicode symbols
// var mailOptions = {
//     from: 'NickName<username@userdomain>', // sender address mailfrom must be same with the user
//     to: 'x@x.com, xx@xx.com', // list of receivers
//     cc:'haha<xxx@xxx.com>', // copy for receivers
//     bcc:'haha<xxxx@xxxx.com>', // secret copy for receivers
//     subject: 'Hello', // Subject line
//     text: 'Hello world', // plaintext body
//     html: '<b>Hello world</b><img src="cid:01" style="width:200px;height:auto">', // html body
//     attachments: [
//         {
//             filename: 'text0.txt',
//             content: 'hello world!'
//         },
//         {
//             filename: 'text1.txt',
//             path: './app.js'
//         },{
//             filename:'test.JPG',
//             path:'./Desert.jpg',
//             cid:'01'
//        }
//     ],
// };

