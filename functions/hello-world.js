exports.handler = async () => {
    console.log(process.env.TEST_VAR);
    return {
        statusCode: 200,
        body: "Hello Serverless function"
    }
}