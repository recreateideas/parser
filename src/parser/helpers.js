
export const matchObject = {},

isBasket = (target) => {
    if (target.match(/BasketPage/) || target.match(/MiniBasket/))
        return true;
    else return;
},

buildEmptyMatchObject = (object) => {
    Object.keys(object)
        .filter(field => Object.keys(matchObject).indexOf(field) === -1)
        .map(field => {
            return matchObject[field] = [];
        });
},

addToDDL = (ddl_mapping, key, value) => {
    let new_ddl_mapping = Object.assign({}, ddl_mapping);
    new_ddl_mapping[key] = value;
    return new_ddl_mapping;
},

excludeConfirmationPage = (targetList) => {
    let confirmationPageMatch = getPageMatchObject(targetList.ConfirmationPage);
    let invertedPageMatch = invertPageMatch(confirmationPageMatch);
    Object.keys(targetList)
        .filter(key => key !== 'default_page_load' && key !== 'ConfirmationPage' && key !== 'order_number_capture' && key !== 'MiniBasket')
        .map((key) => {
            return Object.keys(targetList[key])
                .filter(field => isMatchField(field))
                .map((field) => { //if it has a match field append the correspondent inverted page match
                    return invertedPageMatch[field] ?
                        (targetList[key][field] = stringify_array(targetList[key][field] + ',' + stringify_array(invertedPageMatch[field])),
                            targetList = assignObjectIfAbsent(invertedPageMatch, targetList, key)) :
                        targetList = assignObjectIfAbsent(invertedPageMatch, targetList, key);
                });
        });
    return targetList;
},

assignObjectIfAbsent = (invertedPageMatch, targetList, key) => {
    Object.keys(invertedPageMatch)
        .filter(matchValue => targetList[key][matchValue] = stringify_array(invertedPageMatch[matchValue]))
        .map((matchValue) => {
            return targetList[key][matchValue] = stringify_array(invertedPageMatch[matchValue]);
        });
    return targetList;
},

getPageMatchObject = (ConfirmationPage) => {
    let confirmationPageMatch = {};
    if(ConfirmationPage) {
        Object.keys(ConfirmationPage)
        .filter(key => isMatchField(key))
        .forEach((key) => {
            if (Object.keys(confirmationPageMatch).indexOf(key) === -1) {
                confirmationPageMatch[key] = [];
            }
            confirmationPageMatch[key].push(ConfirmationPage[key])

        });
    }
    return confirmationPageMatch;
},

isMatchField = (field) => {
    if (field.match('_match') || field.match('_exclude'))
        return true;
    else return false;
},

invertPageMatch = (pageMatch) => {
    let invertedObject = {};
    Object.keys(pageMatch).map((key) => {
        return invertedObject = appendToInvertedObject(key, pageMatch, invertedObject);
    });
    return invertedObject;
},


getDefaultPageMatch = (targetList) => {
    let defaultMatch = matchObject;
    Object.keys(targetList)
        .filter(target => targetList[target].hasOwnProperty('page_load'))
        .map((target) => {
            return Object.keys(targetList[target])
                .filter(key => Object.keys(defaultMatch).indexOf(key) !== -1  && !key.match(/exclude/))
                .map((key) => {
                    return defaultMatch = appendToInvertedObject(key, targetList[target], defaultMatch);
                });
        });
    return (defaultMatch);
},

appendToInvertedObject = (key, originalObject, invertedObject) => {
    let label = invertExclude(key);
    if (!invertedObject[label]) invertedObject[label] = [];
    if (invertedObject[label].indexOf(originalObject[key]) === -1) invertedObject[label].push(originalObject[key]);
    return invertedObject;
},

invertExclude = (key) => {
    let label, keyArr = [];
    keyArr = key.split('_');
    label = keyArr[0] + '_' + (keyArr[1] === 'match' ? 'exclude' : 'match');
    return label;
},

initializeJSON = (modules, app_id, tag_data) => {
    tag_data = JSON.stringify(tag_data);
    let element = {};
    element.modules = modules;
    element.tag_data = tag_data;
    element.targets = {};
    element.targets[app_id] = {};
    return element;
},

concatTarget = (ddl_mapping, element, label, map1, map2, map3, includeOnly) => {
    element[label] = {};
    element[label].name = label;
    element[label] = targetMapping(element[label], map1, map2, map3, includeOnly);
    if (ddl_mapping) element[label].ddl_component_mappings = ddl_mapping;
    return element;
},

targetMapping= (target, map1, map2, map3, includeOnly) => {
    if (map1) Object.keys(map1).map((input) => {
        return target[input] = (typeof (input) === 'object' ? stringify_array(map1[input]) : map1[input]);
    });
    if (map2) Object.keys(map2).forEach((input) => {
        if (includeOnly) {
            if (input.match(includeOnly)) {
                target[input] = map2[input];
            }
        } else target[input] = (typeof (map2[input]) === 'object' ? stringify_array(map2[input]) : map2[input]);
    });
    if (map3) Object.keys(map3).map((input) => {
        return target[input] = (typeof (input) === 'object' ? stringify_array(map3[input]) : map3[input]);
    });
    return target;
},

stringify_array = (array) => {
    let string = '';
    if (typeof (array) === 'object') {
        array.filter(value => value && value !== '')
            .map((value, i) => string += value + ',');
    } else string = array;
    string = string.replace(/,$/, '').replace(/^,/, '');
    return string;
},

sanitizeNameId = (string) => {
    string = string.replace(/^#/, '');
    string = string.replace(/^\[name=/, '').replace(/\]$/, '');
    return string;
},

sanitize_json = (string) => {
    return string.replace(/\\"/gm, '"').replace(/"{/gm, '{').replace(/}"/gm, '}');
};
