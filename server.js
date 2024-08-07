const app = require('./app/index')
const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`Server running at port: ${port}`)
})
