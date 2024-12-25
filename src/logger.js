function errorLog(message) {
    // Get the name of the calling function
    const functionName = arguments.callee.caller.name || "Anonymous function";
    console.error(`Error from [${functionName}]: ${message}`);
}

module.exports = {errorLog};