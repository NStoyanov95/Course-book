exports.isMatch = (course, userId) => {
    const isMatch = course.signUpList.find(list => list._id == userId);
    return isMatch
}

exports.listUsers = (course) =>{
    const list = course.signUpList.map(x => x.username);
    return list.join(', ')
}