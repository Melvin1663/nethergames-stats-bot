module.exports = (ping) => {
    let ping1 = `<:ping1:912553805986541618>`;
    let ping2 = `<:ping2:912553806095597568>`;
    let ping3 = `<:ping3:912553806032670732>`;
    let ping4 = `<:ping4:912553806561169410>`;
    let ping5 = `<:ping5:912553806875738143>`;
    let ping6 = `<:ping6:912553807093825546>`;
    let ping7 = `<:ping7:912585369579561000>`;

    let rate = ping7
    if (ping == 0) rate = ping1;
    else if (ping >= 1 && ping <= 100) rate = ping2;
    else if (ping >= 101 && ping <= 200) rate = ping3;
    else if (ping >= 201 && ping <= 300) rate = ping4;
    else if (ping >= 301 && ping <= 400) rate = ping5;
    else if (ping >= 401) rate = ping6;
    return rate
}