const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json');
const { cards } = data;
console.log(cards);

router.get('/', (req, res) => {
  console.log('random router');
  const numberOfCards = cards.length;
  const flashcardId = Math.floor(Math.random() * numberOfCards);
  console.log(flashcardId);
  res.redirect(`/cards/${flashcardId}`);
});

router.get('/:id', (req, res) => {
  console.log('Im here tho');
  const { side } = req.query;
  const { id } = req.params;

  if (!side) {
    res.redirect(`/cards/${id}?side=question`);
    return;
  }

  const name = req.cookies.username;
  const text = cards[id][side];
  const { hint } = cards[id];

  const templateData = { id, text, name };

  if (side === 'question') {
    templateData.hint = hint;
    templateData.sideToShow = 'answer';
    templateData.sideToShowDisplay = 'Answer';
  } else if (side === 'answer') {
    templateData.sideToShow = 'question';
    templateData.sideToShowDisplay = 'Question'
  }

  res.render('card', templateData);
});

module.exports = router;