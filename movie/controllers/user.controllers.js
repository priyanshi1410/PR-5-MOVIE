const { movies } = require("../Models/movie.schema")
const { user } = require("../Models/user.schema")

// signup
const signup = async (req, res) => {
    try {
        let data =await user.findOne({email : req.body.email});
        if(data){
            return res.send("user already exist")
        }
        else{
            data = await user.create(req.body);
            return res.status(201).send(data);
        }
    } catch (error) {
        return res.send(error.message)
    }
}
// login
const login = async (req, res) => {
    try {
        let data = await user.findOne({username : req.body.username});
        if (!data){
            return  res.status(401).send({error:"Invalid username or password"})
        }
        if(data.password != req.body.password){
            return res.status(401).send({error:"Invalid username or password"})
        }
        return res.send({message : 'Logged in successfully'})
    } catch (error) {
        return res.send(error.message)
    }
}
// delete
const userdelete = async (req, res) => {
    let { id } = req.params
    let data = await user.findByIdAndDelete(id)
    res.json({ message: "User deleted successfully" })
}

// movie

// create
const createmovie = async (req, res) => {
    let addmovie = await movies.create(req.body)
    res.status(201).send(addmovie)
}
// update
const movieupdate = async (req, res) => {
    let { id } = req.params
    let data = await movies.findByIdAndUpdate(id, req.body)
    data = await movies.findById(id)
    res.status(200).send(data)
}
// delete
const moviedelete = async (req, res) => {
    let { id } = req.params;
    console.log(id);
    let data = await movies.findByIdAndDelete(id);
    res.send({ "message": "Movie deleted" });
};

// rating
const movierating = async (req, res) => {
    let { id } = req.params;
    console.log(id)
    if (id) {
        let data = await movies.findById(id)
        data.ratings.push({ value: req.body.rating });
        await data.save();
        console.log(data)
        res.send(data)
    }
    else {
        res.send({ error: "movie not found" })
    }
}
// comment
const moviecomment = async (req, res) => {
    let { id } = req.params;
    if (id) {
        let data = await movies.findById(id);
        data.comments.push(req.body)
        await data.save();
        res.send(data)
    }
    else {
        res.send({ error: "movie not found" })
    }
}
// filter
const moviefilter = async (req, res) => {
    let data = await movies.find(req.query)
    res.send(data);
}


module.exports = { signup, login, userdelete, createmovie, movieupdate, moviedelete, movierating, moviecomment, moviefilter}