let express = require('express'),
    app = express(),
    multer = require('multer'),
    crypto = require('crypto'),
    xlsxtojson = require('xlsx-to-json')
    // xlstojson = require("xls-to-json");

let fileExtension = require('file-extension');

    app.use(express.json());  

    let storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './input/')
        },
        filename: function (req, file, cb) {
            crypto.pseudoRandomBytes(16, function (err, raw) {
                cb(null, raw.toString('hex') + Date.now() + '.' + fileExtension(file.mimetype));
                });
        }
    });

    let upload = multer({storage: storage}).single('file');

    /** Method to handle the form submit */
    app.post('/sendFile', function(req, res) {
        let excel2json;
        upload(req,res,function(err){
            if(err){
                 res.json({error_code:401,err_desc:err});
                 return;
            }
            if(!req.file){
                res.json({error_code:404,err_desc:"File not found!"});
                return;
            }

            if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
                excel2json = xlsxtojson;
            } else {
                excel2json = xlstojson;
            }

           //  code to convert excel data to json  format
            excel2json({
                input: req.file.path,  
                output: "output/"+Date.now()+".json", // output json 
                lowerCaseHeaders:true
            }, function(err, result) {
                if(err) {
                  res.json(err);
                } else {
                  res.json(result);
                }
            });

        })

    });
    // load index file to upload file on http://localhost:3000/
    app.get('/',function(req,res){
        res.sendFile(__dirname + "/index.html");
    });

    app.listen('3000', function(){
        console.log('Server running on port 3000');
    });