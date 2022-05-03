function renderData(){
    // Render regulatory section when no collection marked
    if (data.length==0){
        $("#content").append(
            `<div class="text-center mt-3"><p class="text-light lead" id="no-result">You havn't marked any road sign yet</p></div>`+
            `<div class="text-center"><button class="btn btn-outline-light my-4" style="width:auto; align-text:center;" onclick="location.href='../selectChapter'">Mode Selection</button></div>`
        );
        return false;
    }

    for(let i=0; i<data.length;i++){
        let id = data[i]["id"];
        let name = data[i]["name"]

        $("#content").append(
            `<div class="row sign-segment" id=${id}>` +
                `<div class="col-8">` + 
                    `<div class="sign-name-box"><a class="sign-name" href="../learn/${id}">${i+1}.${name}</a></div>` + 
                `</div>` +
                `<div class="col-4">` + 
                    `<a  href="../learn/${id}"><img src="/static/images/road_sign_img/${id}.png" width="100" height="100"></a>` + 
                `</div>` + 
            `</div>`
        );
    }
    
    $("#content").append(
        `<div class="text-center"><button class="btn btn-outline-light my-4" style="width:auto; align-text:center;" onclick="location.href='../selectChapter'">Mode Selection</button></div>`
    )


};


$(document).ready(function (){
    renderData();
});