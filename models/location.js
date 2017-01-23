const mongoose = require('mongoose')
const locationSchema = new mongoose.Schema({
  districts: [
    'D1. City - Marina Area', 'D2. City - CBD', 'D3. Central South', 'D4. South - Keppel', 'D5. South West', 'D6. City - City Hall', 'D7. City- Beach Road', 'D8. Central - Little India', 'D9. Central - Orchard', 'D10. Central - Tanglin', 'D11. Central - Newton', 'D12. Central - Toa Payoh', 'D13. Central East', 'D14. Central East - Eunos', 'D15. East Coast - Katong', 'D16. Upper East Coast', 'D17. Far East - Changi', 'D18. Far East - Tampines', 'D19. North East - Hougang', 'D20. Central North - AMK', 'D21. Central West', 'D22. Far West - Jurong', 'D23. North West', 'D24. Far North West', 'D25. Far North', 'D26. North', 'D27. Far North- Yishun', 'D28. North East - Seletar']
})
const Location = mongoose.model('Location', locationSchema)
module.exports = Location
