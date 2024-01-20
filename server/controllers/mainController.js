// GET
// HOMEPAGE
exports.home = async (req, res) => {
  const locals = {
    title: 'Notes | Home',
    description: 'Free notes'
  }
  res.render('../views/pages/index', { locals, layout: '../views/layouts/frontpage' })
}

exports.about = async (req, res) => {
  const locals = {
    title: 'Notes | About',
    description: 'Free notes'
  }
  res.render('../views/pages/about', locals)
}

exports.features = async (req, res) => {
  const locals = {
    title: 'Notes | Features',
    description: 'Free notes'
  }
  res.render('../views/pages/features', locals)
}

exports.faqs = async (req, res) => {
  const locals = {
    title: 'Notes | FAQs',
    description: 'Free notes'
  }
  res.render('../views/pages/faqs', locals)
}