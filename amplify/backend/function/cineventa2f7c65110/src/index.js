const aws = require('aws-sdk')
const ses = new aws.SES()

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async event => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  for (const streamedItem of event.Records) {
    console.log(streamedItem.eventID);
    console.log(streamedItem.eventName);
    console.log('DynamoDB Record: %j', streamedItem.dynamodb);

    if (streamedItem.eventName === 'INSERT') {
      const data = streamedItem.dynamodb.NewImage;
      const email = data.email.S;
      const fecha = data.fecha.S;
      const asientos = data.asientos.N;
      const titulo = data.titulo.S;
      const url = data.url.S;
      const valor = data.valor.N;  
      const asientoslista = data.asientoslista.L;

      const asientosEmail = asientoslista.map( asiento => {
         return asiento.S;
      });

      await ses.sendEmail({
        Destination: {
          ToAddresses: [ email ],
        },
        Source: "cinematicketboletos@gmail.com",
        Message: {
          Subject: { Data: 'Confirmación - Compra de Boletos' },
          Body: {
            Html: {
              Data:   `<body>
                        <h3>Tu reservacion de ${asientos} asientos, ${asientosEmail.toString()} ,para la pelicula ${titulo}, el dia ${fecha} por el valor de Q.${valor}, fue realizada exitosamente</h3>
                        <br/>
                        <img src="https://image.tmdb.org/t/p/w500${url}"/> 
                      </body>`
            }
          },
        },
      }).promise();
    }
  }

  return { status: 'done' };
};
