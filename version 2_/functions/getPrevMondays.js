// Totally not stolen from stack overflow

module.exports = () => {
    var date = new Date();
    var day = date.getDay();
    var prevMonday = new Date();
    if (date.getDay() == 0) {
        prevMonday.setDate(date.getDate() - 7);
    }
    else {
        prevMonday.setDate(date.getDate() - (day - 1));
    }

    return prevMonday;
}