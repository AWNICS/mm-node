class UtilsObject {
    compare(obj1, obj2) {
        var bool = Object.is(obj1, obj2);
        if (bool) {
            console.log('true');
        } else {
            console.log('false');
        }
    }
}

export default UtilsObject;