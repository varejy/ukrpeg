import env from './getEnv';
import Promise from 'core-js/fn/promise';

env.Promise = Promise; // core-js promise supports finally, so replace anyway

export default env.Promise;
