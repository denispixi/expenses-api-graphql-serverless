## API para app personal de gastos

Api GraphQL para aplicación móvil personal de gastos.

### Tecnologías usadas:

- Node.js
- Apollo Server (variante AWS Lambda)
- MongoDB - Mongoose
- AWS Cognito

La API estará alojada en una función Lambda en AWS y sera expuesta mediante API Gateway.
Los request a la API deberán estar firmados con AWS signature V4 y el signatario deberacontar con el permiso para acceder al recurso, caso contrario no pasará l validacion y no ejecutará el lambda.