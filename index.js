const content=document.querySelector("#content");
const submit=document.querySelector("#add");
const update=document.querySelector("#update");

//POST API
submit.addEventListener('click',()=>{
    let fname=document.querySelector("#fname").value;
    let lname=document.querySelector("#lname").value;
    let email=document.querySelector("#email").value;
    let gender=document.querySelector("#gender").value;
    let formData={fname,lname,email,gender};

    fetch("https://pcs-semifinal.onrender.com/api/item",{
        method:'POST',
        body: JSON.stringify(formData),
        headers:{
            "Content-Type":"application/json",
        },
    }).catch((error)=>{
        console.log(error);
    })
    alert("User Added Successfully");
    location.reload();
});


window.addEventListener('load', ()=>{
    getUsers();
})

function getUsers(){
    let html=""
    //FETCH API
    fetch('https://pcs-semifinal.onrender.com/api/item',{mode:'cors'})
    .then(response=>{
        console.log(response);
        return response.json();
    })
    .then(data=>{
        console.log(data);
        data.forEach(element=>{
            html+=`<div id="li-container">
            <li> ${element.first_name} <br> ${element.last_name} <br> ${element.email} <br> ${element.gender} <br> ${element.ip_address}
            <div id="button-container">
            <button class="deleteButton" onClick="deleteMember('${element.id}')">Delete</button>
            <button class="updateButton" onClick="updateMember('${element.id}')">Update</button>
            </div>
            </li>
            </div>`
        })

        content.innerHTML=html;
    })
    .catch(error=>{
        console.log(error);
    })
}

//DELETE

function deleteMember(id){
    if(confirm("Are you sure you want to delete this user?")){
    fetch(`https://pcs-semifinal.onrender.com/api/item/`,{
        method:'DELETE',
        body: JSON.stringify({id}),
        headers:{
            "Content-Type":"application/json",
        },
    }).then(response => {response.text()})
    .then(response => console.log(response))
    .catch((error)=>{
        console.log(error);
    });
    alert("User Deleted Successfully");
    location.reload();
    }
}

//UPDATE

function updateMember(id){

    fetch(`https://pcs-semifinal.onrender.com/api/item/${id}`)
    .then(response => response.json())
    .then(data => {
        document.querySelector("#fname").value = data[0].first_name;
        document.querySelector("#lname").value = data[0].last_name;
        document.querySelector("#email").value = data[0].email;
        document.querySelector("#gender").value = data[0].gender;
        document.querySelector("#ip-address").value = data[0].ip_address;
        document.querySelector("#ID").value = data[0].id;
    }).catch(error =>{
        console.error(error);
    })

}

update.addEventListener('click',()=>{
    let fname=document.querySelector("#fname").value;
    let lname=document.querySelector("#lname").value;
    let email=document.querySelector("#email").value;
    let gender=document.querySelector("#gender").value;
    let ip_address=document.querySelector("#ip-address").value;
    let id=document.querySelector("#ID").value;
    let formData={fname,lname,email,gender,ip_address,id};

    fetch(`https://pcs-semifinal.onrender.com/api/item`,{
        method:'PUT',
        body: JSON.stringify(formData),
        headers:{
            "Content-Type":"application/json",
        },
    }).catch((error)=>{
        console.log(error);
    })
    alert("User Updated Successfully");
    location.reload();
})
