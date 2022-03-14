import { config } from 'dotenv';

config({ path: '.env' });

export default ({ config }) => {
  return {
    ...config,
    hooks: {
      postPublish: [
        {
          file: 'sentry-expo/upload-sourcemaps',
          config: {
            organization: 'poteboy',
            project: 'expo-boilerplate',
            authToken: process.env.SENTRY_AUTH_TOKEN,
          },
        },
      ],
    },
  };
};
