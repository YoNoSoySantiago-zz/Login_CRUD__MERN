
import app from './app.js';
//Server listening
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
});