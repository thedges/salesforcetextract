let AWS = require('aws-sdk');
const textract = new AWS.Textract();
 
exports.handler = async (event,context,callback)  => {
        var inputVal = event.key;
        var params = {
                //ClientRequestToken: '1',
                DocumentLocation: { /* required */
                    S3Object: {
                    Bucket: 'sfdc-ocr',
                    Name: inputVal
                    //Version: 'STRING_VALUE'
                    }
                },
                JobTag: 'SFDC',
                NotificationChannel: {
                    RoleArn: 'arn:aws:iam::345422727494:role/CustomLambaTextract', 
                    SNSTopicArn: 'SFDC_TEXT_SCAN'
                }
        };
 
    textract.startDocumentTextDetection(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
    });
 
    callback(null, {"message": "Successfully executed"});
}
