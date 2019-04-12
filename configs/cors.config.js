const originsAllowed = process.env.CORS_ORIGINS || [
  'http://localhost:3000'
];

module.exports = {
  origin: function (origin, cb) {
      const allowed = originsAllowed.indexOf(origin) !== -1;
      cb(null, allowed);
  },
  credentials: true,
}