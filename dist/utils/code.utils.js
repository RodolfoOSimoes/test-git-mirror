"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCode = void 0;
const generateCode = (pwdLen = 10) => {
    const pwdChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    return Array(pwdLen)
        .fill(pwdChars)
        .map(function (x) {
        return x[Math.floor(Math.random() * x.length)];
    })
        .join('');
};
exports.generateCode = generateCode;
//# sourceMappingURL=code.utils.js.map