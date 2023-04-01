const express = require('express')
const router = new express.Router()
const ExpressError = require("../expressError")
const items = require('../fakeDb')


router.get('/', (req, res) => {
  res.json({ response: items })
})

router.get('/:name', (req, res) => {
  const item = items.find(i => i.name === req.params.name)
  if (item === undefined) {
    throw new ExpressError("Name not found", 404)
  }
  res.json(item)
})


router.post('/', (req, res, next) => {
  try {
    if (!req.body.name) throw new ExpressError("Name is required", 400)
    const newItem = { name: req.body.name, price: req.body.price }
    items.push(newItem)
    res.status(201).json({ added: newItem })
  } catch (e) {
    return next(e)
  }

})

router.patch('/:name', (req, res) => {
  const item = items.find(i => i.name === req.params.name)
  if (item === undefined) {
    throw new ExpressError("Name not found", 404)
  }
  item.name = req.body.name
  res.json({ updated: item })

})

router.delete('/:name', (req, res) => {
  const idx = items.findIndex(i => i.name === req.params.name)
  if (idx === -1) {
    throw new ExpressError("Name not found", 404)
  }
  items.splice(idx, 1)
  res.json({ message: "Deleted" })
})

module.exports = router
