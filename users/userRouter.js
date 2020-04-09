const express = require('express');
const Users = require('../users/userDb');
const Posts = require('../posts/postDb');
const router = express.Router();

router.post("/", validateUser, (req, res) => {
  Users.insert(req.body)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: "Could not add user" });
    });
});

router.post("/:id/posts", validatePost, validateUserId, (req, res) => {
  Posts.insert(req.body)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "error creating post" });
    });
});

router.get('/', (req, res) => {
 Users.get()
 .then(users => {
   res.status(200).json(users);
 })
 .catch(err => {
  res.status(500).json({ message: "Sorry error occurred" });
 })
});

router.get("/:id", validateUserId, (req, res) => {
  const { id } = req.params;
  Users
    .getById(id)
    .then(data => {
      res.status(200).json({ data });
    })
    .catch(err => {
      res.status(500).json({ error: "There was an error" });
    });
});

router.get('/:id/posts', (req, res) => {
  Users.getUserPosts(req.params.id)
  .then(posts => {
    res.status(200).json(posts);
  })
  .catch(err => {
    res.status(500).json({ errorMessage: 'Error retrieving posts'})
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  Users.remove(req.params.id)
  .then(user => {
    res.status(200).json(user);
  })
  .catch(err => {
    res.status(500).json({ errorMessage: 'Error deleting user'});
  })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  Users.update(req.params.id, req.body)
  .then(updated => {
    res.status(200).json(updated)
  })
  .catch(err => {
    res.status(500).json({ errorMessage: 'Error updating user'})
  })
});

//custom middleware

function validateUserId(req, res, next) {
  Users.getById(req.params.id)
  .then(user => {
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(400).json({ message: 'Invalid user id'});
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Error'})
  })
}

function validateUser(req, res, next) {
  const body = req.body;
  if (body === {}) {
    res.status(404).json({ message: "missing user data" });
  } else if (!body.name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  const body = req.body;
  body.user_id = req.params.id;

  if (body === {}) {
    res.status(400).json({ message: "missing post data" });
  } else if (!body.text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

module.exports = router;