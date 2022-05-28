/* Global Variables */
const apiKey = '&appid=facdd742270aa8d781c6343ec5065000&units=metric'
const apiUrl = 'http://localhost:3000/'
const zipCode = document.getElementById('zip');
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');
const feelings = document.getElementById('feelings');
// function to get all the errors
const catchErrors = (error) => console.log('Error has been done ' + err);
// Event listener to add function to exist HTML DOM element
document.getElementById('generate').addEventListener('click', postData);
// Get ZipCode Information from API
async function getZipCodeInformation(zipCode) {
    return await (await fetch(`http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}${apiKey}`)).json();
}
// Post Data to API
function postData() {
    let data = {
            zipCode: zipCode.value,
            content: feelings.value,
            date: new Date()
        }
        //Post data to API to get zipCode information
    getZipCodeInformation(data.zipCode).then(zipInfo => {
        // Check if city found or not
        if (zipInfo.cod != 200) {
            return alert(zipInfo.message);
        };
        //Post data to the server
        data.temp = zipInfo.list[0].main.temp;
        postDataToServer(data);
    }).catch(catchErrors);
};
// Post data to the server to save it
async function postDataToServer(data) {
    let response = await fetch(`${apiUrl}postData`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    try {
        response.json().then(data => {
            if (response.ok) updateUI();
            else alert('Error Ocurred');
        }).catch(catchErrors);
    } catch (error) {
        catchErrors(error); // function to get all the errors
    }
}
// function to update the user interface
async function updateUI() {
    let response = await fetch(`${apiUrl}getData`);
    try {
        response.json().then(data => {
            date.innerHTML = `Date Is: ${data.date}`;
            temp.innerHTML = `Temp Is: ${data.temp}`;
            content.innerHTML = `My Feeling Is:${data.content}`;
        }).catch(catchErrors);
    } catch (error) {
        catchErrors(error); // function to get all the errors
    }
}