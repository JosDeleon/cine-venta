import { SES } from '@aws-sdk/client-ses';
import config from '../aws-exports';
import AWS from 'aws-sdk'; 

AWS.config.update({
    accessKeyId: "AKIAWG2KH5SKMELYUD6W",
    secretAccessKey: "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"
});

const ses = new SES({ region: config.aws_project_region });
async function SendEmail(props) {
    const { destinatario, titulo, imagen } = props;
    console.log("DESTINATARIO EN ENVIO")
    console.log(destinatario)
    
    let params = {
        Destination : {
            ToAddresses : [
                destinatario
            ]
        },
        Message : {
            Body : {
                Text : {
                    Charset: "UTF-8",
                    Data: `Asientos confirmados`
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Confirmación de Reserva - Cinema Ticket'
            }
        },
        Source: 'cinematicketboletos@gmail.com',   
    }

    await ses.sendEmail(params)
    .then( res => {
        console.log("CORREO ENVIADO")
        console.log(res)
    })
    .catch( err => {
        console.log("ERROR ENVIO")
        console.log(err)
    });
}

export default SendEmail;