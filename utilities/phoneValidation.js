const validatePhoneNumber = (req) => {
    var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    return re.test(req);
}

module.exports = validatePhoneNumber;