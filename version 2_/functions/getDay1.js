let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

module.exports = (month, year) => {
    let now = new Date()
    if (!month) month = months[now.getMonth()];
    if (!year) year = now.getFullYear();

    return new Date(`${month} 1, ${year}`);
}