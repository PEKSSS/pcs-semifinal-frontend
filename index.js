const content=document.querySelector("#items-list");
const submit=document.querySelector("#add");
const update=document.querySelector("#update");

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}/${day}/${month} ${hours}:${minutes}:${seconds}`;
}

//POST API
submit.addEventListener('click',()=>{
    let title=document.querySelector("#title").value;
    let amount=document.querySelector("#amount").value;
    let category=document.querySelector("#category").value;
    let formData={title,amount,category};

    fetch("http://localhost:7000/api/item",{
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
    fetch('http://localhost:7000/api/item',{mode:'cors'})
    .then(response=>{
        console.log(response);
        return response.json();
    })
    .then(data=>{
        console.log(data);
        data.forEach(element=>{
            html+=`<li class="item-container">
            <ul class="item-details">
                <li><strong>ID:</strong> ${element.id}</li>
                <li><strong>Title:</strong> ${element.title}</li>
                <li><strong>Amount:</strong> ${element.amount}</li>
                <li><strong>Category:</strong> ${element.category}</li>
                <li><strong>Date:</strong> ${formatDate(element.date)}</li>
            </ul>
            <div class="button-container">
                <button class="deleteButton" onClick="deleteMember('${element.id}')">Delete</button>
                <button class="updateButton" onClick="updateMember('${element.id}')">Update</button>
            </div>
        </li>`
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
    fetch(`https://pcs-semifinal.onrender.com/api/item`,{
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

    fetch(`http://localhost:7000/api/item/${id}`)
    .then(response => response.json())
    .then(data => {
        document.querySelector("#title").value = data[0].title;
        document.querySelector("#amount").value = data[0].amount;
        document.querySelector("#category").value = data[0].category;
        document.querySelector("#ID").value = data[0].id;
    }).catch(error =>{
        console.error(error);
    })

}

update.addEventListener('click',()=>{
    let title=document.querySelector("#title").value;
    let amount=document.querySelector("#amount").value;
    let category=document.querySelector("#category").value;
    let id=document.querySelector("#ID").value;
    let formData={title,amount,category,id};

    fetch(`http://localhost:7000/api/item`,{
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
