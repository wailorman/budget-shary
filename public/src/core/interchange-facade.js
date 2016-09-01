import { proceedInterchange } from './interchange-utils'

export default function interchange(state) {
    const deferred = Q.defer();

    try{
        deferred.resolve(proceedInterchange(state).transactions);
    }catch(e){
        deferred.reject(e);
    }

    return deferred.promise;
};