import app from "../config/app"

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server is working Port: ${port}`)
})