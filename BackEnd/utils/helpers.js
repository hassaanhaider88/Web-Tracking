const crypto = require('crypto');
const geoip = require('geoip-lite');
const UAParser = require('ua-parser-js');

const generateApiKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

const sanitizeIP = (req) => {
  const forwarded = req.headers['x-forwarded-for'];

  if (forwarded) {
    const ips = forwarded.split(',').map(ip => ip.trim());
    return ips[0];
  }

  return req.socket.remoteAddress || req.connection.remoteAddress || req.ip;
};

const getGeoData = (ip) => {
  console.log(ip)
  const cleanIp = ip.replace(/^::ffff:/, '');

  if (cleanIp === '127.0.0.1' || cleanIp === 'localhost' || cleanIp.startsWith('192.168.') || cleanIp.startsWith('10.')) {
    return {
      country: 'Local',
      region: 'Local',
      city: 'Local',
      lat: null,
      lon: null
    };
  }

  const geo = geoip.lookup(cleanIp);

  if (!geo) {
    return {
      country: 'Unknown',
      region: 'Unknown',
      city: 'Unknown',
      lat: null,
      lon: null
    };
  }

  return {
    country: geo.country || 'Unknown',
    region: geo.region || 'Unknown',
    city: geo.city || 'Unknown',
    lat: geo.ll ? geo.ll[0] : null,
    lon: geo.ll ? geo.ll[1] : null
  };
};

const parseUserAgent = (userAgent) => {
  const parser = new UAParser(userAgent);
  const result = parser.getResult();

  return {
    browser: result.browser.name || 'Unknown',
    os: result.os.name || 'Unknown',
    device: result.device.type || 'desktop'
  };
};

const validateUrl = (url) => {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

module.exports = {
  generateApiKey,
  sanitizeIP,
  getGeoData,
  parseUserAgent,
  validateUrl
};
