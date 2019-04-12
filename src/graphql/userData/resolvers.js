import { timeout } from '../../utils/helpers';
import { persistor } from '../../utils/apolloClient';

const resolvers = {
  Mutation: {
    logout: async (_, variables, { cache }) => {
      // update cache
      await cache.writeData({ data: { user: null, isLoggedIn: false } });
      await timeout(600);

      await persistor.purge();
      await timeout(600);

      window.localStorage.clear();
      await timeout(600);

      return true;
    },
  },
};

export default resolvers;
