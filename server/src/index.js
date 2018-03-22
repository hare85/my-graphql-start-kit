import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import cors from 'cors';
import config from 'config';
import logger from './utils/logger';
import formatError from './errors/formatError';

import schema from './schema';

// Initialize the app
const app = express();

if (process.env.NODE_ENV !== 'production') {
  app.use(cors());
} else {
  const corsOptions = {
    origin: [/^https?:\/\/localhost(:[0-9]+)?\/?$/, /^https?:\/\/127.0.0.1(:[0-9]+)?\/?$/],
  };
  logger.info('Cors option is required');
  app.use(cors(corsOptions));
}

app.set('port', config.get('port'));

const buildOptions = {
  schema,
  formatError,
  logger: { log: e => logger.debug(e) },
};

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress(buildOptions));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Start the server
app.listen(app.get('port'), () => {
  logger.info('Go to http://localhost:3002/graphiql to run queries!');
});
