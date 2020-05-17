module.exports = {
    newPath: (req, res) => {
        quotesCollection.insertOne(req.body.path)
          .then(result => {
            console.log(result)
          })
          .catch(error => console.error(error))
      }
}