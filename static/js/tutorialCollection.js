function renderData(){
    // Render regulatory section when no collection marked
    if (data.length==0){
        $("#content").append(
            `<div class="row"><p id="no-result">You havn't marked any road sign yet</p></div>`+
            `<button class="btn btn-outline-light my-4" style="width:auto" onclick="location.href='../selectChapter'">Back to Mode Selection</button>`
        );
        return false;
    }

    for(let i=0; i<data.length;i++){
        let id = data[i]["id"];
        let name = data[i]["name"]

        $("#content").append(
            `<div class="row sign-segment" id=${id}>` +
                `<div class="col-6">` + 
                    `<div class="sign-name-box"><a class="sign-name" href="../learn/${id}">${i+1}.${name}</a></div>` + 
                `</div>` +
                `<div class="col-6">` + 
                    `<a  href="../learn/${id}"><img src="/static/images/road_sign_img/${id}.png" width="100" height="100"></a>` + 
                `</div>` + 
            `</div>`
        );
    }
    
    $("#content").append(
        `<button class="btn btn-outline-light my-4" style="width:auto; align-text:center;" onclick="location.href='../selectChapter'">Mode Selection</button>`
    )


};


$(document).ready(function (){
    console.log(data);
    renderData();
});