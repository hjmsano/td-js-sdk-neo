import Polytrek from './polytrek';
const nameSpace = process.env.NAMESPACE || 'Polytrek';
window[nameSpace] = new Polytrek();