// ====== models/Admin.js ======
class Admin {
  static validate(username, password) {
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    
    return username === adminUsername && password === adminPassword;
  }

  static isConfigured() {
    return process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD;
  }
}

module.exports = Admin;