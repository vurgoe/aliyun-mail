const nodemailer = require('nodemailer');

module.exports = function(app, config, baseDir){
    console.log(config);
	const transporter = nodemailer.createTransport(config);

	return async(ctx, next) => {
        ctx.mail = mailOptions => transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return {
                    isError : true,
                    message : error
                }
            }
            return {
                isError : false,
                message : 'Message sent: ' + info.response
            };
        });
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

