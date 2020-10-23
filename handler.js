const db = require('monk')('.....');
db.then(() => {
    console.log('Connected correctly to server')
}).catch(err => {
    console.log(err)
})


const customers = db.get('customers')

const createCustomer = (event) => {

    const data = JSON.parse(event.body);
    let name = data.name
    let email = data.email
    return new Promise((resolve, reject) => {
        customers.insert({
            name: name,
            email: email
        }).then(res => {
            resolve({
                "statusCode": 200,
                "body": JSON.stringify({
                    message: "Succesfully Inserted"
                })
            })
        }).catch(err => {
            console.log(err)
            resolve({
                "statusCode": 2,
                "body": JSON.stringify({
                    message: "Succesfully Inserted"
                })
            })
        })

    })
}

const updateCustomer = (event) => {
    const id = event.pathParameters.id
    let data = JSON.parse(event.body);
    let name = data.name
    let email = data.email
    return new Promise((resolve, reject) => {

        customers.findOneAndUpdate({
            _id: id
        }, {
            $set: {
                name: name,
                email: email
            }
        }).then(res => {
            resolve({
                "statusCode": 200,
                "body": JSON.stringify({
                    message: "Updated Successfully...!"
                })
            })
        }).catch(err => {
            console.log(err)
            resolve({
                "statusCode": 2,
                "body": JSON.stringify({
                    message: "Somthing went Wrong Try again!"
                })
            })
        })

    })
}

const deleteCustomer = (event) => {
    const id = event.pathParameters.id
    console.log(id)
    return new Promise((resolve, reject) => {

        customers.remove({
            _id: id
        }).then(res => {
            console.log(res)
            resolve({
                "statusCode": 200,
                "body": JSON.stringify({
                    message: "Customer Deleted Succesfully"
                })
            })
        }).catch(err => {
            console.log(err)
            reject({
                "statusCode": 400,
                "body": JSON.stringify({
                    Errors: err
                })
            })
        })

    })
}

const FindAllCustomers = (event) => {
    return new Promise((resolve, reject) => {
        customers.find({}).then(res => {
            console.log(res)
            resolve({
                "statusCode": 200,
                "body": JSON.stringify({
                    results: res
                })
            })
        }).catch(err => {
            console.log(err);
            reject({
                "statusCode": 400,
                "body": JSON.stringify({
                    Errors: err
                })
            })
        })
    })
}

const FindCustomer = (event) => {
    const id = event.pathParameters.id
    console.log(id)
    return new Promise((resolve, reject) => {

        customers.findOne({
            _id: id
        }).then(res => {
            console.log(res)
            resolve({
                "statusCode": 200,
                "body": JSON.stringify({
                    results: res
                })
            })
        }).catch(err => {
            console.log(err)
            reject({
                "statusCode": 400,
                "body": JSON.stringify({
                    Errors: err
                })
            })
        })

    })
}


module.exports = {
    createCustomer,
    updateCustomer,
    deleteCustomer,
    FindAllCustomers,
    FindCustomer,
}
