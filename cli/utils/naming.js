exports.name=(name)=>{
    const lower = name.toLowerCase()
    const capitalized = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    return { lower, capitalized };
}