function GenerateEquipment(event){
    event.preventDefault();
    const restURL=urlEquipment;
    fetch(restURL).then(onResponse).then(onJsonEquipment);
}

function onResponse(response){
    return response.json();
}

function onJsonEquipment(json){
    const view=document.querySelector('#view');
    view.innerHTML='';
    const random_number= Math.floor( Math.random()*10);
    //const result=json.results[random_number].id;
    const text=document.createElement('h1');
    text.textContent="|" + json.results[random_number].name + "|";
    text.classList.add('equipment_text');
    view.appendChild(text);
}

const button=document.querySelector('#Equipment');
button.addEventListener('click',GenerateEquipment);

const urlEquipment="https://wger.de/api/v2/equipment/";
