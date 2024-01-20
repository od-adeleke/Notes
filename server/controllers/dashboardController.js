const mongoose = require('mongoose')
const Note = require('../models/Notes')

exports.dashboard = async (req, res) => {
  /*
  async function insertDummyCategoryData () {
    try {
      await Note.insertMany([
        {
          user: '652f6f73638a95f0cef369da',
          title: 'NodeJS Tutorial',
          body: 'NodeJS is an open source server environment. NodeJS is cross platform and',
          createdAt: '1671634422539'
        },
        {
          user: '652f6f73638a95f0cef369da',
          title: 'NodeJS Tutorial',
          body: 'NodeJS is an open source server environment. NodeJS is cross platform and',
          createdAt: '1671634422539'
        },
        {
          user: '652f6f73638a95f0cef369da',
          title: 'NodeJS Tutorial',
          body: 'NodeJS is an open source server environment. NodeJS is cross platform and',
          createdAt: '1671634422539'
        },
        {
          user: '652f6f73638a95f0cef369da',
          title: 'NodeJS Tutorial',
          body: 'NodeJS is an open source server environment. NodeJS is cross platform and',
          createdAt: '1671634422539'
        },
        {
          user: '652f6f73638a95f0cef369da',
          title: 'NodeJS Tutorial',
          body: 'NodeJS is an open source server environment. NodeJS is cross platform and',
          createdAt: '1671634422539'
        }
      ])
    } catch (error) {
      console.log(error);
    }
  }

  insertDummyCategoryData()
  */

  let perPage = 12
  let page = req.query.page || 1
  const locals = {
    title: 'Dashboard',
    description: 'Free NodeJS Notes App.'
  }

  // pagination
  try {
    const notes = await Note.aggregate([
      { $sort: { updatedAt: -1 } },
      { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
      {
        $project: {
          title: { $substr: ["$title", 0, 30] },
          body: { $substr: ["$body", 0, 100] },
        },
      }
      ])
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec(); 

    const count = await Note.count();

    res.render('dashboard/index', {
      userName: req.user.firstName,
      locals,
      notes,
      layout: "../views/layouts/dashboard",
      current: page,
      pages: Math.ceil(count / perPage)
    });
  } catch (error) {
    console.log(error);
  }
}

// GET
exports.dashboardViewNote = async (req, res) => {
  const note = await Note.findById({_id: req.params.id}).where({user: req.user.id}).lean()

  if(note) {
    res.render('dashboard/viewNotes', {
      noteID: req.params.id,
      note,
      layout: '../views/layouts/dashboard'
    })
  } else {
    res.send('Something went wrong')
  }

}

// PUT
exports.dashboardUpdateNote = async (req, res) => {
  try {
    await Note.findOneAndUpdate(
      { _id: req.params.id },
      { title: req.body.title, body: req.body.body, updatedAt: Date.now() }
    ).where({ user: req.user.id })
    res.redirect('/dashboard')
  } catch (error) {
    console.log(error);
  }
}

// DELETE
exports.dashboardDeleteNote = async (req, res) => {
  try {
    await Note.deleteOne({_id: req.params.id}).where({user: req.user.id})
    res.redirect('/dashboard')
  } catch (error) {
    console.log(error);
  }
}

// GET
// ADD NOTES
exports.dashboardAddNote = async (req, res) => {
  res.render('dashboard/add', {
    layout: '../views/layouts/dashboard'
  })
}

exports.dashboardAddNoteSumit = async (req, res) => {
  try {
    req.body.user = req.user.id
    await Note.create(req.body)
    res.redirect('/dashboard')
  } catch (error) {
    console.log(error);
  }
}

// GET
// SEARCH
exports.dashboardSearch = async (req, res) => {
  try {
    res.render('dashboard/search', {
      searchResults: '',
      layout: '../views/layouts/dashboard'
    })
  } catch (error) {
    console.log(error);
  }
}

// POST
// SEARCH
exports.dashboardSearchSubmit = async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm
    const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")

    const searchResults = await Note.find({
      $or: [
        {title: { $regex: new RegExp(searchNoSpecialChars, 'i') }},
        {body: { $regex: new RegExp(searchNoSpecialChars, 'i') }}
      ]
    }).where({ user: req.user.id })

    res.render('dashboard/search', {
      searchResults,
      layout: '../views/layouts/dashboard'
    })
  } catch (error) {
    console.log(error);
  }
}