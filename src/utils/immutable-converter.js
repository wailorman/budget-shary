import { OrderedMap, Map, List } from 'immutable';

export const nestedMap = (arg) => {

    const isObject = val => typeof(val) == 'object';
    const isArray = val => typeof(val) == 'object' && val instanceof Array;
    const isArrayOfObjects = val => val.map( elem => typeof elem == 'object' ).some(x=>x);
    const isJustObject = val => Object.entries(val).map((pair) => !typeof pair[1] == 'object').some(x => x);

    const isCollection = val => (isArray(val) || isObject(val)) && val[Object.keys(val)[0]] && val[Object.keys(val)[0]].id;

    if (isObject(arg)){

        if (isJustObject(arg)){

            return Map(arg);

        } else {

            if (isArray(arg) || isCollection(arg)){

                if (isCollection(arg)){

                    return OrderedMap(
                        Object
                            .entries(arg)
                            .map((pair) => ([pair[1].id, nestedMap(pair[1])]))
                    );

                }else{

                    if (isArrayOfObjects(arg)){

                        return List(
                            arg.map((val) => Map(val))
                        );

                    }else{

                        return List(arg);

                    }
                }

            }else{

                return Map(
                    Object.entries(arg).map(([key, val])=>[key, nestedMap(val)])
                );

            }
        }

    }else{

        return arg;

    }

};

export const toObject = (arg) => {
    if (arg && arg.toJS){
        return arg.toJS();
    } else if (arg && typeof arg == 'object') {
        return Object.keys(arg).reduce((prev, key) => {
            prev[key] = toObject(arg[key]);
            return prev;
        }, {});
    } else {
        return arg;
    }
};
