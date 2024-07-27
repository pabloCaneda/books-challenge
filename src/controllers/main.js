const { Op }  = require('sequelize');
const bcryptjs = require('bcryptjs');

const db = require('../database/models');

const mainController = {

  home: (req, res) => {
    db.Book.findAll({
      include: [{ association: 'authors' }]
    })
      .then((books) => {
        res.render('home', { books });
      })
      .catch((error) => console.log(error));
  },
  bookDetail: (req, res) => {
    const { id } = req.params;
    
    db.Book.findByPk(id, {
      include: [{ association: 'authors' }]
  })
     .then((book) => { 
    res.render('bookDetail', { book });
  })
},
bookSearch:  (req, res) => {

 res.render('search', { books: [] });
 
},

 bookSearchResult:(req, res) => {

    const { title } = req.body;
   
    db.Book.findAll({
      where: {
        title: {
          [Op.like]: `%${title}%`
        }
      },
      include: [{ association: 'authors' }]
    })
    .then((books) => {
      res.render('search', { books });
    })
    .catch((error) => {
      console.error(error);
    });
  },
  deleteBook: (req, res) => {
    // Implement delete book
    res.render('home');
  },
  authors: (req, res) => {
    db.Author.findAll()
      .then((authors) => {
        res.render('authors', { authors });
      })
      .catch((error) => console.log(error));
  },
  authorBooks: async (req, res) => {
    try {
      const authorId = req.params.id;
      const author = await db.Author.findByPk(authorId, {
        include: {
          model: db.Book,
          as: 'books'
        }
      });

      if (!author) {
        return res.status(404).send('Author not found');
      }

      res.render('authorBooks', { author });
    } catch (error) {
      console.error('Error fetching author books:', error);
      res.status(500).send('Internal Server Error');
    }
  }
,
  register: (req, res) => {
    res.render('register');
  },
  processRegister: (req, res) => {
    
      db.User.create({
        nombre: req.body.name,
        Email: req.body.email,
        Country: req.body.country,
        Pass: bcryptjs.hashSync(req.body.password, 10),
        CategoryId: req.body.category
      })
        .then(() => {
          res.redirect('/');
        })
        .catch((error) => console.log(error)) 
        },
  login: (req, res) => {
    // Implement login process
    res.render('login');
  }
  /*  */,
  edit: (req, res) => {
    const { id } = req.params;
    db.Book.findByPk(id)
      .then((book) => {
        if (!book) {
          return res.status(404).send('Book not found');
        }
        res.render('editBook', { book });
      })
      .catch((err) => res.status(500).send(err.message));
  }
  ,
  processEdit: (req, res) => {
    
    const { id } = req.params;
    const { title, cover, description } = req.body;

   db.Book.update(
      {
        title: title,
        cover: cover,
        description: description,
 
      },
      {
        where: {
          id,
        },
      }
   )
      .then(() => {
        
        res.redirect("/");
      })
      .catch((err,) => {
        err && res.send(err.message);
    })
  },
  clearcookie: (req, res) => {
    
    req.session.destroy(() => {
   
      res.clearCookie("userLogin");

      res.redirect("/");
    });
  }
};
module.exports = mainController;
