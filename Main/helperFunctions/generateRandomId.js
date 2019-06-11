// Helper Function to generate random id:
function generateRandomID(){
    return ((Math.random()*100).toString(36).substring(3)) + (new Date().getTime().toString(36))
}

export default generateRandomID