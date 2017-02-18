import { OrderedMap, Map, List } from 'immutable';

export const nestedMap = (obj) => {
    return OrderedMap(Object.entries(obj).map(([key, value]) => {

        if (typeof(value) == 'object' && value instanceof Array){

            if (value[0].id){

                return [
                    key,
                    OrderedMap(
                        value.map((item) =>
                            [item.id, Map(item)]
                        )
                    )
                ];

            } else {

                return [
                    key,
                    List(value)
                ];

            }

        } else if (typeof value == 'object'){
            return [key, nestedMap(value)];
        } else {
            return [key, value];
        }

    }));
};